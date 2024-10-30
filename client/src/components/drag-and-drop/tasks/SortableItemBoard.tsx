/** @format */

import React, { useEffect, useState } from "react";

import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { Item } from "./BoardItem/index";
import { Task, TaskFile } from "./Board";
import { useMountStatus } from "@/utils/helpers/utils";
import docIcon from "@/assets/doc.png";
import pdfIcon from "@/assets/pdf.png";

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

  const taskFileUrl = (taskFile: TaskFile) => {
    let iconUrl = null;
    if (taskFile.file.type.includes("image")) {
      iconUrl = taskFile.file.url;
    } else if (taskFile.file.type.includes("pdf")) {
      iconUrl = pdfIcon;
    } else {
      iconUrl = docIcon;
    }
    return iconUrl;
  };

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
        item.files && item.files.length > 0
          ? taskFileUrl(item.files[item.files.length - 1])
          : ""
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
