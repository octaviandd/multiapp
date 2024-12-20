/** @format */

import uniqid from "uniqid";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal, unstable_batchedUpdates } from "react-dom";
import {
  CancelDrop,
  closestCenter,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  getFirstCollision,
  MouseSensor,
  TouchSensor,
  Modifiers,
  UniqueIdentifier,
  useSensors,
  useSensor,
  MeasuringStrategy,
  KeyboardCoordinateGetter,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  SortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItemBoard } from "./SortableItemBoard";
import DroppableContainer from "./DroppableContainer";
import renderSortableItemDragOverlay from "./SortableItemDragOverlay";
import renderContainerDragOverlay from "./DroppableContainerDragOverlay";
import BoardTaskAdder from "./BoardTaskAdder";
import { StoreContext } from "@/store";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

export type User = {
  id: UniqueIdentifier;
  firstName: string;
  lastName: string;
  taskLikes: Like[];
  tasks: Task[];
  email: string;
  role: string;
  profileImage: string;
};

export type Comment = {
  id: UniqueIdentifier;
  content: string;
  createdAt: Date;
  author: User;
};

export type TaskFile = {
  file: File;
  fileId: number;
  id: number;
  taskId: number;
};

export type Task = {
  id: UniqueIdentifier;
  title: string;
  recentlyAdded?: boolean;
  body?: string;
  files?: TaskFile[];
  comments?: Comment[];
  dueDate?: Date;
  asignee?: string;
  completed?: boolean;
  author?: User;
  taskLikes?: Like[];
  createdAt?: Date;
};

export type Like = {
  id: string | number;
  authorId: string | number;
  taskId: string | number;
  createdAt: Date;
  updatedAt: Date;
};

export type Board = {
  id: UniqueIdentifier;
  title: string;
  tasks: Task[];
  recentlyAdded?: boolean;
};

export type File = {
  type: any;
  id: string | number;
  name: string;
  title: string;
  url: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
};

interface Props {
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  columns?: number;
  containerStyle?: React.CSSProperties;
  coordinateGetter?: KeyboardCoordinateGetter;
  getItemStyles?(args: {
    value: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    boardId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: { index: number }): React.CSSProperties;
  handle?: boolean;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  trashable?: boolean;
  scrollable?: boolean;
  vertical?: boolean;
}

const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const PLACEHOLDER_ID = "placeholder";
const empty: UniqueIdentifier[] = [];

export default function MultipleContainers({
  adjustScale = false,
  cancelDrop,
  columns,
  handle = false,
  containerStyle,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  modifiers,
  strategy = verticalListSortingStrategy,
  scrollable,
}: Props) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewBoard = useRef(false);
  const [clonedItems, setClonedItems] = useState<Board[] | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor)
  );
  const { store, setStore } = useContext(StoreContext);

  const isSortingBoard = activeId
    ? boards.some((board) => board.id === activeId)
    : false;

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewBoard.current = false;
    });
  }, [boards]);

  useEffect(() => {
    if (!store.removedItem) return;
    setBoards((boards) => {
      return boards.map((board) => {
        return {
          ...board,
          tasks: board.tasks.filter(
            (task) => task.id !== "T" + store.removedItem
          ),
        };
      });
    });
    setStore((store) => {
      return {
        ...store,
        removedItem: null,
      };
    });
  }, [store.removedItem]);

  useEffect(() => {
    if (store.recentlyRemovedTaskFileId) {
      setBoards((boards) => {
        return boards.map((board) => {
          return {
            ...board,
            tasks: board.tasks.map((task) => {
              return {
                ...task,
                files: task.files?.filter(
                  (file) => file.id !== store.recentlyRemovedTaskFileId
                ),
              };
            }),
          };
        });
      });
    }
  }, [store.recentlyRemovedTaskFileId]);

  useEffect(() => {
    if (store.recentlyAddedTaskFile) {
      setBoards((boards) => {
        return boards.map((board) => {
          return {
            ...board,
            tasks: board.tasks.map((task) => {
              if (task.id === "T" + store.recentlyAddedTaskFile?.taskId) {
                return {
                  ...task,
                  files: [
                    ...(task.files || []),
                    (store.recentlyAddedTaskFile || {}) as TaskFile,
                  ],
                };
              }
              return task;
            }),
          };
        });
      });
    }
  }, [store.recentlyAddedTaskFile]);

  useEffect(() => {
    setBoards((boards) => {
      return boards.map((board) => {
        return {
          ...board,
          tasks: board.tasks.map((task) => {
            if (
              task.id === "T" + store.completedItem?.id ||
              task.id === store.completedItem?.id
            ) {
              return {
                ...task,
                completed: store.completedItem?.completed,
              };
            }
            return task;
          }),
        };
      });
    });
  }, [store.completedItem]);

  useEffect(() => {
    fetch("/api/boards/get-boards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data: Board[]) => {
        data.map((board) =>
          board.tasks.map((task) => (task.id = "T" + task.id))
        );
        unstable_batchedUpdates(() => {
          setBoards(data);
        });
      });
  }, []);

  const findBoard = (id: UniqueIdentifier): Board => {
    return boards.find((board) => board.id === id) as Board;
  };

  const findBoardByItemId = (id: UniqueIdentifier): Board => {
    return boards.find((board) =>
      board.tasks.find((item) => item.id === id)
    ) as Board;
  };

  const getIndex = (id: UniqueIdentifier) => {
    const board = findBoard(id);
    return !board ? -1 : board.tasks.findIndex((item) => item.id === id);
  };

  /**
   * Custom collision detection strategy optimized for multiple containers
   *
   * - First, find any droppable containers intersecting with the pointer.
   * - If there are none, find intersecting containers with the active draggable.
   * - If there are no intersecting containers, return the last matched intersection
   *
   */
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      const isActiveItemInItems = () =>
        boards.some((board) => board.id === activeId);

      const hasArrayObjectWithIndex = (id: UniqueIdentifier) =>
        boards.some((board) => board.id === id);

      if (activeId && isActiveItemInItems()) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter((container) =>
            hasArrayObjectWithIndex(container.id)
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, "id");

      if (overId !== null && overId !== undefined) {
        if (hasArrayObjectWithIndex(overId)) {
          //err
          const containerItems = findBoard(overId)?.tasks;

          if (containerItems && containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.find((item) => item.id === container.id) //err
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewBoard.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, boards]
  );

  const handleRemove = (boardId: UniqueIdentifier) =>
    setBoards((boards) => boards.filter((board) => board.id !== boardId));

  async function removeBoard(boardId: UniqueIdentifier) {
    await fetch(`/api/boards/delete-board/${boardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setBoards((boards) => boards.filter((board) => board.id !== boardId));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function updateTaskTitle(taskId: UniqueIdentifier, title: string) {
    await fetch(`/api/boards/tasks/${taskId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        data: {
          title,
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const updateBoardTitle = (boardId: UniqueIdentifier, title: string) => {
    fetch(`/api/boards/update-board/${boardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  async function saveBoard(
    boardId: UniqueIdentifier,
    title: string,
    newBoard: boolean = false
  ) {
    if (!newBoard) {
      updateBoardTitle(boardId, title);
    } else {
      await fetch(`/api/boards/create-board`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          displayOrder: boards.length,
          temporaryId: boardId,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setBoards((boards) => {
            return boards.map((board) => {
              if (board.id === boardId) {
                return {
                  ...board,
                  id: data.id,
                  title: data.title,
                  tasks: [],
                  recentlyAdded: false,
                };
              }

              return board;
            });
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  async function saveTask(
    boardId: UniqueIdentifier,
    title: string,
    taskId: UniqueIdentifier,
    newTask: boolean = false
  ) {
    if (!newTask) {
      updateTaskTitle(String(taskId).replace("T", ""), title);
    } else {
      console.log(boardId);
      await fetch(`/api/boards/${boardId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          data: {
            title,
            boardId,
            displayOrder: boards.find((board) => board.id === boardId)?.tasks
              .length,
            temporaryId: taskId,
          },
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setBoards((boards) => {
            return boards.map((board) => {
              if (board.id === boardId) {
                return {
                  ...board,
                  tasks: [
                    ...board.tasks.filter((task) => task.id !== taskId),
                    data,
                  ],
                };
              }
              return board;
            });
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  async function moveBoard(
    movingBoardId: UniqueIdentifier,
    replacedBoardId: UniqueIdentifier,
    newIndex: number,
    replacedBoardIndex: number
  ) {
    await fetch(`/api/boards/move-board/${movingBoardId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        boardId: movingBoardId,
        replacedBoardId,
        displayOrder: newIndex,
        replacedBoardIndex,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log("Board saved");
      }
    });
  }

  async function moveTask(
    boardId: UniqueIdentifier,
    taskId: UniqueIdentifier,
    newIndex: number
  ) {
    await fetch(
      `/api/boards/${boardId}/tasks/move-task/${Number(
        String(taskId).replace("T", "")
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          data: {
            boardId,
            displayOrder: newIndex,
          },
        }),
      }
    ).then((res) => {
      if (res.ok) {
        console.log("Task saved");
      }
    });
  }

  async function handleAddColumn(boardsLength: number) {
    const newBoardId = uniqid();
    const newBoard = {
      id: newBoardId,
      title: ``,
      displayOrder: boardsLength + 1,
      tasks: [],
      recentlyAdded: true,
    };

    unstable_batchedUpdates(() => {
      setBoards((boards) => [...boards, newBoard]);
    });
  }

  function handleAddRow(boardID: UniqueIdentifier) {
    const newRowId = uniqid();

    unstable_batchedUpdates(() => {
      setBoards((boards) => {
        const newItems = boards.map((board) => {
          if (board.id === boardID) {
            return {
              ...board,
              tasks: [
                ...board.tasks,
                {
                  id: newRowId,
                  title: ``,
                  recentlyAdded: true,
                },
              ],
            };
          }

          return board;
        });

        return newItems;
      });
    });
  }

  function handleRemoveRow(boardID: UniqueIdentifier, rowID: UniqueIdentifier) {
    setBoards((boards) => {
      const newItems = boards.map((board) => {
        if (board.id === boardID) {
          return {
            ...board,
            tasks: board.tasks.filter((task) => task.id !== rowID),
          };
        }

        return board;
      });

      return newItems;
    });
  }

  function onDragStart({ active }: { active: any }) {
    setActiveId(active.id);
    setClonedItems(boards);
  }

  function onDragOver({ active, over }: { active: any; over: any }) {
    const overId = over?.id;
    const activeId = active.id;

    const onBoardLevel = () => {
      return boards.some((board) => board.id === activeId);
    };

    // If it outside the boards or we are on moving boards.
    if (overId === null || onBoardLevel()) {
      return;
    }

    // Working with items inside Boards; overId and activeId become board items ids.
    const overContainer = findBoardByItemId(overId) || findBoard(overId);
    const activeContainer = findBoardByItemId(activeId) || findBoard(activeId);

    if (!overContainer || !activeContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setBoards((boards) => {
        const activeItems = activeContainer.tasks;
        const overItems = overContainer.tasks;
        const overIndex = overItems.findIndex((item) => item.id === overId);
        const activeIndex = activeItems.findIndex(
          (item) => item.id === activeId
        );

        let newIndex: number;

        const isOverPositionInAnotherBoard = () => {
          return boards.some((board) => board.id === overId);
        };

        if (isOverPositionInAnotherBoard()) {
          newIndex = overItems.length + 1;
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;

          const modifier = isBelowOverItem ? 1 : 0;

          newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        recentlyMovedToNewBoard.current = true;

        let newItems = [...boards];
        let newActiveContainerIndex = newItems.findIndex(
          (item) => item.id === activeContainer.id
        );
        let newOverContainerIndex = newItems.findIndex(
          (item) => item.id === overContainer.id
        );
        newItems[newActiveContainerIndex].tasks = activeItems.filter(
          (item) => item.id !== activeId
        );

        newItems[newOverContainerIndex].tasks = [
          ...overItems.slice(0, newIndex),
          activeItems[activeIndex],
          ...overItems.slice(newIndex, overItems.length),
        ];

        return newItems;
      });
    }
  }

  function onDragEnd({ active, over }: any) {
    let activeId = active.id;
    let overId = over?.id;

    const onBoardLevel = () => boards.some((board) => board.id === activeId);

    if (onBoardLevel() && overId) {
      setBoards((boards) => {
        const activeIndex = boards.findIndex((item) => item.id === activeId);
        const overIndex = boards.findIndex((item) => item.id === overId);

        moveBoard(activeId, overId, overIndex, activeIndex);
        return arrayMove(boards, activeIndex, overIndex);
      });
    }

    const activeBoard = findBoardByItemId(activeId);

    if (!activeBoard) {
      setActiveId(null);
      return;
    }

    if (overId === null) {
      setActiveId(null);
      return;
    }

    const overBoardByItemId = findBoardByItemId(overId);

    if (overBoardByItemId) {
      const activeIndex = activeBoard.tasks.findIndex(
        (item) => item.id === activeId
      );

      const overIndex = overBoardByItemId.tasks.findIndex(
        (item) => item.id === overId
      );

      if (activeIndex !== overIndex) {
        setBoards((items) => {
          let newItems = [...items];
          let targetItem =
            newItems[items.findIndex((item) => item.id === activeBoard.id)];
          let modifiedNestedItems = arrayMove(
            targetItem.tasks,
            activeIndex,
            overIndex
          );
          targetItem.tasks = modifiedNestedItems;
          return newItems;
        });
      }
      moveTask(overBoardByItemId.id, active.id, overIndex);
    }
    setActiveId(null);
  }

  const onDragCancel = () => {
    if (clonedItems) {
      setBoards(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  const sortableItemDragOverlay = (id: UniqueIdentifier) =>
    renderSortableItemDragOverlay({
      id,
      findBoardByItemId,
      handleRemoveRow,
      getIndex,
      getItemStyles,
      wrapperStyle,
      handle: false,
    });

  const containerDragOverlay = (boardId: UniqueIdentifier) =>
    renderContainerDragOverlay({
      boardId,
      findBoard,
      handleRemoveRow,
      getIndex,
      getItemStyles,
      wrapperStyle,
      handle,
    });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={measuring}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      modifiers={modifiers}
    >
      <div className="inline-grid p-5 h-full overflow-y-hidden overflow-x-scroll w-full grid-flow-col bg-[#282a2c]">
        <SortableContext
          items={[...boards.map((board) => board.id), PLACEHOLDER_ID]}
          strategy={horizontalListSortingStrategy}
        >
          {boards &&
            boards.map((board, index) => (
              <DroppableContainer
                key={board.id}
                id={board.id}
                label={board.title}
                columns={columns}
                items={board.tasks.map((item) => item.id)}
                scrollable={scrollable}
                style={containerStyle}
                recentlyAdded={board.recentlyAdded}
                removeBoard={() => removeBoard(board.id)}
                createTask={() => handleAddRow(board.id)}
                onChangeBoardTitle={(title: string) =>
                  saveBoard(board.id, title, board.recentlyAdded)
                }
                removeTemporaryBoard={() => handleRemove(board.id)}
                onRemove={() => handleRemove(board.id)}
              >
                <SortableContext items={board.tasks} strategy={strategy}>
                  {board.tasks.map((value, index) => {
                    return (
                      <SortableItemBoard
                        disabled={isSortingBoard}
                        item={value}
                        index={index}
                        key={value.id}
                        handle={handle}
                        style={getItemStyles}
                        saveTask={(title, taskId) =>
                          saveTask(board.id, title, taskId, value.recentlyAdded)
                        }
                        wrapperStyle={wrapperStyle}
                        removeTemporaryTask={() =>
                          handleRemoveRow(board.id, value.id)
                        }
                        containerId={board.id}
                        getIndex={getIndex}
                      />
                    );
                  })}
                  <BoardTaskAdder
                    board={board}
                    handleAddRow={handleAddRow}
                  ></BoardTaskAdder>
                </SortableContext>
              </DroppableContainer>
            ))}
          <DroppableContainer
            id={PLACEHOLDER_ID}
            disabled={isSortingBoard}
            items={empty}
            onClick={() => handleAddColumn(boards.length)}
            placeholder
          >
            <span className="text-white bg-neutral-700 rounded-md px-2 py-1">
              + Add Board
            </span>
          </DroppableContainer>
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
          {activeId
            ? boards.find((board) => board.id == activeId)
              ? containerDragOverlay(activeId)
              : sortableItemDragOverlay(activeId)
            : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
