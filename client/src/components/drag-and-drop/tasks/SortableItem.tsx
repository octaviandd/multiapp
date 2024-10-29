/** @format */

import React, { useEffect, useState } from "react";

import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { Item } from "../home/index";
import { Task } from "./Board";
import { useMountStatus } from "@/utils/helpers/utils";

interface SortableItemProps {
  containerId: UniqueIdentifier;
  id: UniqueIdentifier;
  value: string;
  item: Task;
  index: number;
  handle: boolean;
  disabled?: boolean;
  style(args: any): React.CSSProperties;
  getIndex(id: UniqueIdentifier): number;
  renderItem(): React.ReactElement;
  wrapperStyle({ index }: { index: number }): React.CSSProperties;
}

export const SortableItem = ({
  disabled,
  id,
  index,
  value,
  handle,
  renderItem,
  style,
  item,
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
    id,
  });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      value={value}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
      index={index}
      wrapperStyle={wrapperStyle({ index })}
      style={style({
        index,
        value: value,
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
      renderItem={renderItem}
    />
  );
};
