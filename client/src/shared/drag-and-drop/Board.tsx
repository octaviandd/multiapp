/** @format */

// @ts-nocheck
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
  id: number;
  title: string;
};

type Items = {
  id: UniqueIdentifier;
  title: string;
  items: Item[];
};

// type Items = {
//   [key: UniqueIdentifier]: Item[];
// };

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
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: { index: number }): React.CSSProperties;
  itemCount?: number;
  items?: Items;
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

const defaultItems = [
  {
    id: 123,
    title: "Recently assigned",
    items: [
      { id: 1, title: "Recently assigned" },
      { id: 2, title: "A2" },
    ],
  },
  {
    id: 124,
    title: "Do today",
    items: [
      { id: 3, title: "Do toda" },
      { id: 4, title: "B2" },
    ],
  },
  {
    id: 125,
    title: "Do next week",
    items: [
      { id: 5, title: "Do next wee" },
      { id: 6, title: "C2" },
    ],
  },
  {
    id: 126,
    title: "Do Later",
    items: [
      { id: 7, title: "Do Late" },
      { id: 8, title: "D2" },
    ],
  },
];

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
  const [items, setItems] = useState<Items[]>(() => defaultItems);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  // const isSortingContainer = activeId
  //   ? items.find((item) => item.id === activeId)
  //   : false;
  const isSortingContainer = false;
  // const isSortingContainer = () => {
  //   if (items.hasOwnProperty('items')){
  //     return activeId ? items.find((item) => item.id === activeId) : false;
  //   } else {
  //     return activeId ? items.find((item) => item) : false;
  //   }
  // }

  const measuring = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
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
        items.some((item) => item.id === activeId);

      const hasArrayObjectWithIndex = (id: number | UniqueIdentifier) =>
        items.some((item) => item.id === id);

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

      if (overId != null) {
        if (hasArrayObjectWithIndex(overId)) {
          //err
          const containerItems = findContainer(overId).items;

          if (containerItems.length > 0) {
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
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, items]
  );
  const [clonedItems, setClonedItems] = useState<Items[] | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const findContainer = (id: UniqueIdentifier) => {
    const container = items.find((item) => item.id === id);
    if (container) return container;

    return items.find((item) => {
      return item.items.some((item) => item.id === id);
    });
  };

  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = container.items.findIndex((item) => item.id === id);

    return index;
  };

  const onDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
      // console.log("animation frame");
    });
  }, [items]);

  function renderSortableItemDragOverlay(id: UniqueIdentifier) {
    const container = findContainer(id);
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
  }

  function renderContainerDragOverlay(containerId: UniqueIdentifier) {
    const container = findContainer(containerId);
    return (
      <BoardContainer
        label={`${container.title}`}
        columns={columns}
        style={{
          height: "100%",
          border: "1px solid #424244",
        }}
        shadow
        unstyled={false}
      >
        {container.items.map((item, index) => (
          <Item
            key={item.id}
            value={item.title}
            handle={handle}
            style={getItemStyles({
              containerId,
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

  function handleRemove(containerID: UniqueIdentifier) {
    setItems((containers) =>
      containers.filter((container) => container.id !== containerID)
    );
  }

  function handleAddColumn() {
    const newContainerId = getNextContainerId();

    unstable_batchedUpdates(() => {
      // setContainers((containers) => [...containers, newContainerId]);
      setItems((items) => ({
        ...items,
        [newContainerId]: [],
      }));
    });
  }

  // function handleAddRow() {
  //   const newRowId = getNextRowId();

  //   unstable_batchedUpdates(() => {
  //     setItems((items) => ({
  //       ...items,
  //       [newContainerId]: [],
  //     }));
  //   });
  // }

  function onDragStart({ active }: { active: any }) {
    setActiveId(active.id);
    setClonedItems(items);
  }

  function onDragOver({ active, over }: { active: any; over: any }) {
    const overId = over?.id;
    const activeId = active.id;

    const isDraggingContainers = items.some(
      (item) => item.id === overId || item.id === activeId
    );

    const isActiveIdInItems = () => {
      return items.some((item) => item.id === activeId);
    };

    if (overId == null || isActiveIdInItems()) {
      console.log("im here");
      return;
    }

    const overContainer = findContainer(overId);
    const activeContainer = findContainer(activeId);

    if (!overContainer || !activeContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setItems((items) => {
        const activeItems = activeContainer.items;
        const overItems = overContainer.items;
        const overIndex = overItems.findIndex((item) => item.id === overId);
        const activeIndex = activeItems.findIndex(
          (item) => item.id == activeId
        );

        let newIndex: number;

        const isOverInItems = () => {
          return items.some((item) => item.id === overId);
        };

        if (isOverInItems()) {
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

        recentlyMovedToNewContainer.current = true;

        let newItems = [...items];
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

    console.log("activeId", activeId, "overId", overId);

    const isActiveIdInItems = () => items.some((item) => item.id === activeId);

    if (isActiveIdInItems() && overId) {
      setItems((containers) => {
        const activeIndex = containers.findIndex(
          (item) => item.id === activeId
        );
        const overIndex = containers.findIndex((item) => item.id === overId);

        console.log(activeIndex, overIndex);

        return arrayMove(containers, activeIndex, overIndex);
      });
    }

    const activeContainer = findContainer(activeId);

    if (!activeContainer) {
      setActiveId(null);
      return;
    }

    if (overId == null) {
      setActiveId(null);
      return;
    }

    const overContainer = findContainer(overId);

    if (overContainer) {
      const activeIndex = activeContainer.items.findIndex(
        (item) => item.id === activeId
      );
      const overIndex = overContainer.items.findIndex(
        (item) => item.id === overId
      );

      console.log("hit");
      // might need fux
      if (activeIndex !== overIndex) {
        setItems((items) => {
          let newItems = [...items];
          let targetItem =
            newItems[items.findIndex((item) => item.id === activeContainer.id)];
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

  function getNextContainerId() {
    const containerIds = Object.keys(items);
    const lastContainerId = containerIds[containerIds.length - 1];

    return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);
  }

  // function getNextRowId(activeId: UniqueIdentifier) {
  //   const currentContainer = findContainer(activeId);
  //   const lastItemId = items[currentContainer][items[currentContainer].length - 1]

  //   return String.fromCharCode(lastItemId.charCodeAt(0) + 1);
  // }

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
          items={[...items.map((item) => item.id), PLACEHOLDER_ID]}
          strategy={
            vertical
              ? verticalListSortingStrategy
              : horizontalListSortingStrategy
          }
        >
          {items.map((container) => (
            <>
              <DroppableContainer
                key={container.id}
                id={container.id}
                label={`${container.title}`}
                columns={columns}
                items={container.items.map((item) => item.id)}
                scrollable={scrollable}
                style={containerStyle}
                unstyled={false}
                onRemove={() => handleRemove(container.id)}
              >
                <SortableContext items={container.items} strategy={strategy}>
                  {container.items.map((value, index) => {
                    return (
                      <SortableItemBoard
                        disabled={isSortingContainer}
                        key={value.id}
                        id={value.id}
                        value={value.title}
                        index={index}
                        handle={handle}
                        style={getItemStyles}
                        wrapperStyle={wrapperStyle}
                        renderItem={renderItem}
                        containerId={container.id}
                        getIndex={getIndex}
                      />
                    );
                  })}
                  <div className="py-1 flex justify-center items-center cursor-pointer rounded-lg bg-transparent hover:bg-[#3D3E40] transition-all ease-in-out duration-200">
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
            disabled={isSortingContainer}
            items={empty}
            onClick={handleAddColumn}
            placeholder
          >
            + Add column
          </DroppableContainer>
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
          {activeId
            ? items.find((item) => item.id == activeId)
              ? renderContainerDragOverlay(activeId)
              : renderSortableItemDragOverlay(activeId)
            : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
