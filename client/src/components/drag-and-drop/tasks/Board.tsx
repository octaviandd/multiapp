/** @format */

import uniqid from "uniqid";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

import { BoardContainer } from "./BoardContainer/index";
import { Item } from "./BoardItem/index";
import { Plus } from "lucide-react";
import { SortableItemBoard } from "./SortableItemBoard";
import DroppableContainer from "./DroppableContainer";

const defaultInitializer = (index: number) => index;

export function createRange<T = number>(
  length: number,
  initializer: (index: number) => any = defaultInitializer
): T[] {
  return [...new Array(length)].map((_, index) => initializer(index));
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

type Task = {
  id: UniqueIdentifier;
  title: string;
  recentlyAdded?: boolean;
};

type Board = {
  id: UniqueIdentifier;
  title: string;
  tasks: Task[];
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
  itemCount?: number;
  items?: Board;
  handle?: boolean;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  trashable?: boolean;
  scrollable?: boolean;
  vertical?: boolean;
}

const PLACEHOLDER_ID = "placeholder";
const empty: UniqueIdentifier[] = [];

export default function MultipleContainers({
  adjustScale = false,
  cancelDrop,
  columns,
  handle = false,
  items: initialItems,
  containerStyle,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  modifiers,
  strategy = verticalListSortingStrategy,
  vertical = false,
  scrollable,
}: Props) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewBoard = useRef(false);
  const isSortingBoard = activeId
    ? boards.some((board) => board.id === activeId)
    : false;

  const measuring = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

  const onChangeBoardTitle = (boardId: UniqueIdentifier, title: string) => {
    setBoards((boards) => {
      const newItems = [...boards];
      const board = newItems.find((item) => item.id === boardId);

      if (board) {
        board.title = title;
      }

      return newItems;
    });
  };

  useEffect(() => {
    fetch("/api/boards", {
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
        console.log(data);
        unstable_batchedUpdates(() => {
          setBoards(data);
        });
      });
  }, []);

  const [clonedItems, setClonedItems] = useState<Board[] | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor)
  );
  const findBoard = (id: UniqueIdentifier): Board => {
    return boards.find((board) => board.id === id) as Board;
  };

  const findBoardByItemId = (id: UniqueIdentifier): Board => {
    return boards.find((board) =>
      board.tasks.find((item) => item.id === id)
    ) as Board;
  };

  const findItem = (id: UniqueIdentifier): Task => {
    return findBoardByItemId(id).tasks.find((item) => item.id === id) as Task;
  };

  const getIndex = (id: UniqueIdentifier) => {
    const board = findBoard(id);
    return !board ? -1 : board.tasks.findIndex((item) => item.id === id);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewBoard.current = false;
    });
  }, [boards]);

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

      if (overId != null && overId != undefined) {
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

  const onDragCancel = () => {
    if (clonedItems) {
      setBoards(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  function renderSortableItemDragOverlay(id: UniqueIdentifier) {
    // return getSortableItemDragOverlay(
    //   id,
    //   board,
    //   handle,
    //   (getItemStyles = () => ({})),
    //   getIndex,
    //   wrapperStyle,
    // );

    const board = findBoard(id) as Board;
    const item = findItem(id) as Task;
    return (
      <Item
        value={item.title}
        handle={handle}
        style={getItemStyles({
          boardId: board?.id as UniqueIdentifier,
          overIndex: -1,
          index: getIndex(id),
          value: id,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true,
        })}
        removeTemporaryTask={() => handleRemoveRow(board.id, item.id)}
        id={id}
        color="#fff"
        wrapperStyle={wrapperStyle({ index: 0 })}
        dragOverlay
      />
    );
  }

  function renderContainerDragOverlay(boardId: UniqueIdentifier) {
    const board = findBoard(boardId) as Board;
    return (
      <BoardContainer
        label={`${board.title}`}
        columns={columns}
        style={{
          height: "100%",
          border: "1px solid #424244",
        }}
        id={boardId}
        shadow
        unstyled={false}
      >
        {board.tasks.map((item, index) => (
          <Item
            key={item.id}
            value={item.title}
            handle={handle}
            removeTemporaryTask={() => handleRemoveRow(boardId, item.id)}
            style={getItemStyles({
              boardId,
              overIndex: -1,
              index: getIndex(item.id),
              value: item.id,
              isDragging: false,
              isSorting: false,
              isDragOverlay: false,
            })}
            id={boardId}
            color="#fff"
            wrapperStyle={wrapperStyle({ index })}
          />
        ))}
      </BoardContainer>
    );
  }

  function handleRemove(boardId: UniqueIdentifier) {
    setBoards((boards) => boards.filter((board) => board.id !== boardId));
  }

  async function handleAddColumn(boardsLength: number) {
    const newBoardId = getNextBoardId();
    const newBoard = {
      id: newBoardId,
      title: `Board ${newBoardId}`,
      displayOrder: boardsLength + 1,
      tasks: [],
    };

    await fetch("/api/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newBoard),
    }).then((res) => {
      if (res.ok) {
        unstable_batchedUpdates(() => {
          setBoards((boards) => [...boards, newBoard]);
        });
      }
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
        title,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log("Task updated");
      }
    });
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
      await fetch(`/api/boards/${boardId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          boardId,
          displayOrder: boards.find((board) => board.id === boardId)?.tasks
            .length,
        }),
      }).then((res) => {
        if (res.ok) {
          console.log("Task saved");
        }
      });
    }
  }

  async function moveBoard(
    movingBoardId: UniqueIdentifier,
    replacedBoardId: UniqueIdentifier,
    newIndex: number,
    replacedBoardIndex: number
  ) {
    await fetch(`/api/boards/${movingBoardId}/move-board`, {
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
    await fetch(`/api/boards/${boardId}/tasks/move-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        taskId: Number(String(taskId).replace("T", "")),
        boardId,
        displayOrder: newIndex,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log("Task saved");
      }
    });
  }

  function handleAddRow(boardID: UniqueIdentifier) {
    const newRowId = getNextRowId();

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

    // const isDraggingContainers = boards.some(
    //   (board) => board.id === overId || board.id === activeId
    // );

    const onBoardLevel = () => {
      return boards.some((board) => board.id === activeId);
    };

    // If it outside the boards or we are on moving boards.
    if (overId == null || onBoardLevel()) {
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
          (item) => item.id == activeId
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

    if (overId == null) {
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

  function getNextBoardId() {
    return uniqid();
  }

  function getNextRowId() {
    return uniqid();
  }

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
      <div
        className={`inline-grid p-5 h-full overflow-y-hidden overflow-x-scroll w-full ${
          vertical ? "grid-flow-row" : "grid-flow-col"
        }`}
      >
        <SortableContext
          items={[...boards.map((board) => board.id), PLACEHOLDER_ID]}
          strategy={
            vertical
              ? verticalListSortingStrategy
              : horizontalListSortingStrategy
          }
        >
          {boards &&
            boards.map((board, index) => (
              <DroppableContainer
                key={board.id}
                id={board.id}
                label={`${board.title}`}
                columns={columns}
                items={board?.tasks.map((item) => item.id)}
                scrollable={scrollable}
                style={containerStyle}
                unstyled={false}
                onChangeBoardTitle={(title: string) =>
                  onChangeBoardTitle(board.id, title)
                }
                onRemove={() => handleRemove(board.id)}
              >
                <SortableContext items={board.tasks} strategy={strategy}>
                  {board.tasks.map((value, index) => {
                    return (
                      <SortableItemBoard
                        disabled={isSortingBoard}
                        recentlyAdded={value.recentlyAdded}
                        key={value.id}
                        id={value.id}
                        value={value.title}
                        index={index}
                        handle={handle}
                        style={getItemStyles}
                        onChangeTaskTitle={(title, taskId) =>
                          saveTask(board.id, title, taskId, false)
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
                  <div
                    className="py-1 flex justify-center items-center cursor-pointer rounded-lg bg-transparent hover:bg-[#3D3E40] transition-all ease-in-out duration-200"
                    onClick={() => handleAddRow(board.id)}
                  >
                    <span className="w-[12px] h-[12px] mr-2">
                      <Plus
                        width={13}
                        height={13}
                        stroke="#A2A0A2"
                        strokeWidth={3}
                      />
                    </span>
                    <span className="text-[14px] leading-10 text-[#A2A0A2]">
                      Add task
                    </span>
                  </div>
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
            <span className="text-white">+ Add Board</span>
          </DroppableContainer>
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
          {activeId
            ? boards.find((board) => board.id == activeId)
              ? renderContainerDragOverlay(activeId)
              : renderSortableItemDragOverlay(activeId)
            : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
