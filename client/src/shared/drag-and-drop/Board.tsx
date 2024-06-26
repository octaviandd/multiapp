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

type Item = {
  id: UniqueIdentifier;
  title: string;
};

type Board = {
  id: UniqueIdentifier;
  title: string;
  items: Item[];
  type: string;
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
  renderItem?: any;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  trashable?: boolean;
  scrollable?: boolean;
  vertical?: boolean;
}

const PLACEHOLDER_ID = "placeholder";
const empty: UniqueIdentifier[] = [];

const defaultBoards = [
  {
    type: "board",
    id: uniqid(),
    title: "Recently assigned",
    items: [
      { id: uniqid(), title: "Recently assigned" },
      { id: 2, title: "A2" },
    ],
  },
  {
    type: "board",
    id: uniqid(),
    title: "Do today",
    items: [
      { id: uniqid(), title: "Do toda" },
      { id: uniqid(), title: "B2" },
    ],
  },
  {
    type: "board",
    id: uniqid(),
    title: "Do next week",
    items: [
      { id: uniqid(), title: "Do next wee" },
      { id: uniqid(), title: "C2" },
    ],
  },
  {
    type: "board",
    id: uniqid(),
    title: "Do Later",
    items: [
      { id: uniqid(), title: "Do Late" },
      { id: uniqid(), title: "D2" },
    ],
  },
];

const getSortableItemDragOverlay = (
  id: UniqueIdentifier,
  container: Board,
  handle: boolean,
  getItemStyles: (args: {
    value: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }) => React.CSSProperties,
  getIndex: (id: UniqueIdentifier) => number,
  wrapperStyle: (args: { index: number }) => React.CSSProperties,
  renderItem: any
) => {
  const item = container?.items.find((item: Item) => item.id === id) as Item;
  return (
    <Item
      value={item.title}
      handle={handle}
      style={getItemStyles({
        containerId: container?.id as UniqueIdentifier,
        overIndex: -1,
        index: getIndex(id),
        value: id,
        isSorting: true,
        isDragging: true,
        isDragOverlay: true,
      })}
      color="#fff"
      wrapperStyle={wrapperStyle({ index: 0 })}
      renderItem={renderItem}
      dragOverlay
    />
  );
};

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
  renderItem,
  strategy = verticalListSortingStrategy,
  vertical = false,
  scrollable,
}: Props) {
  const [boards, setBoards] = useState<Board[]>(defaultBoards);
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

  const [clonedItems, setClonedItems] = useState<Board[] | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const findBoard = (id: UniqueIdentifier): Board => {
    return boards.find((board) => board.id === id) as Board;
  };

  const findBoardByItemId = (id: UniqueIdentifier): Board => {
    return boards.find((board) =>
      board.items.find((item) => item.id === id)
    ) as Board;
  };

  const findItem = (id: UniqueIdentifier): Item => {
    return findBoardByItemId(id).items.find((item) => item.id === id) as Item;
  };

  const getIndex = (id: UniqueIdentifier) => {
    const board = findBoard(id);
    return !board ? -1 : board.items.findIndex((item) => item.id === id);
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
          const containerItems = findBoard(overId)?.items;

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
    //   renderItem
    // );

    const board = findBoard(id) as Board;
    const item = findItem(id) as Item;
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
        color="#fff"
        wrapperStyle={wrapperStyle({ index: 0 })}
        renderItem={renderItem}
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
        shadow
        unstyled={false}
      >
        {board.items.map((item, index) => (
          <Item
            key={item.id}
            value={item.title}
            handle={handle}
            style={getItemStyles({
              boardId,
              overIndex: -1,
              index: getIndex(item.id),
              value: item.id,
              isDragging: false,
              isSorting: false,
              isDragOverlay: false,
            })}
            color="#fff"
            wrapperStyle={wrapperStyle({ index })}
            renderItem={renderItem}
          />
        ))}
      </BoardContainer>
    );
  }

  function handleRemove(boardId: UniqueIdentifier) {
    setBoards((boards) => boards.filter((board) => board.id !== boardId));
  }

  function handleAddColumn() {
    const newBoardId = getNextBoardId();
    const newBoard = {
      id: newBoardId,
      title: `Board ${newBoardId}`,
      items: [],
      type: "board",
    };

    unstable_batchedUpdates(() => {
      setBoards((boards) => [...boards, newBoard]);
    });
  }

  function handleAddRow(boardID: UniqueIdentifier) {
    const newRowId = getNextRowId();

    unstable_batchedUpdates(() => {
      setBoards((boards) => {
        const newItems = [...boards];
        const board = newItems.find((item) => item.id === boardID);

        if (board) {
          board.items = [
            ...board.items,
            {
              id: newRowId,
              title: `Item ${newRowId}`,
            },
          ];
        }

        return newItems;
      });
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
    const overContainer = findBoardByItemId(overId);
    const activeContainer = findBoardByItemId(activeId);

    if (!overContainer || !activeContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setBoards((boards) => {
        const activeItems = activeContainer.items;
        const overItems = overContainer.items;
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
        newItems[newActiveContainerIndex].items = activeItems.filter(
          (item) => item.id !== activeId
        );

        newItems[newOverContainerIndex].items = [
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

    const overBoard = findBoardByItemId(overId);

    if (overBoard) {
      const activeIndex = activeBoard.items.findIndex(
        (item) => item.id === activeId
      );
      const overIndex = overBoard.items.findIndex((item) => item.id === overId);

      // might need fux
      if (activeIndex !== overIndex) {
        setBoards((items) => {
          let newItems = [...items];
          let targetItem =
            newItems[items.findIndex((item) => item.id === activeBoard.id)];
          let modifiedNestedItems = arrayMove(
            targetItem.items,
            activeIndex,
            overIndex
          );
          targetItem.items = modifiedNestedItems;
          return newItems;
        });
      }
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
        className={`inline-grid p-5 h-full ${
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
          {boards.map((board) => (
            <>
              <DroppableContainer
                key={board.id}
                id={board.id}
                label={`${board.title}`}
                columns={columns}
                items={board.items.map((item) => item.id)}
                scrollable={scrollable}
                style={containerStyle}
                unstyled={false}
                onRemove={() => handleRemove(board.id)}
              >
                <SortableContext items={board.items} strategy={strategy}>
                  {board.items.map((value, index) => {
                    return (
                      <SortableItemBoard
                        disabled={isSortingBoard}
                        key={value.id}
                        id={value.id}
                        value={value.title}
                        index={index}
                        handle={handle}
                        style={getItemStyles}
                        wrapperStyle={wrapperStyle}
                        renderItem={renderItem}
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
            </>
          ))}
          <DroppableContainer
            id={PLACEHOLDER_ID}
            disabled={isSortingBoard}
            items={empty}
            onClick={handleAddColumn}
            placeholder
          >
            + Add Board
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
