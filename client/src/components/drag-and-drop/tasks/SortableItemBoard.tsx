/** @format */

import React, { useEffect, useState } from "react";

import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { Item } from "./BoardItem/index";
import { Task } from "./Board";

interface SortableItemProps {
  containerId: UniqueIdentifier;
  item: Task;
  index: number;
  handle: boolean;
  disabled?: boolean;
  style(args: any): React.CSSProperties;
  getIndex(id: UniqueIdentifier): number;
  removeTemporaryTask?(): void;
  saveTask?(title: string, taskId: UniqueIdentifier): void;
  wrapperStyle({ index }: { index: number }): React.CSSProperties;
}

function useMountStatus() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  return isMounted;
}

export const SortableItemBoard = ({
  disabled,
  item,
  index,
  handle,
  removeTemporaryTask,
  saveTask,
  style,
  containerId,
  getIndex,
  wrapperStyle,
}: SortableItemProps) => {
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition,
  } = useSortable({
    id: item.id,
  });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      value={item.title}
      recentlyAdded={item.recentlyAdded}
      id={item.id}
      completed={item.completed}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      lastFileUrl={
        item.files && item.files.length > 0 ? item.files[0].file.url : ""
      }
      handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
      index={index}
      wrapperStyle={wrapperStyle({ index })}
      style={style({
        index,
        value: item.title,
        isDragging,
        isSorting,
        overIndex: over ? getIndex(over.id) : overIndex,
        containerId,
      })}
      color="#fff"
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      removeTemporaryTask={removeTemporaryTask}
      saveTask={saveTask}
    />
  );
};
