/** @format */

import { UniqueIdentifier } from "@dnd-kit/core";
import React from "react";
import { BoardContainer, ContainerProps } from "./BoardContainer/Container";
import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

export default function DroppableContainer({
  children,
  columns = 1,
  disabled,
  id,
  items,
  style,
  saveBoard,
  ...props
}: ContainerProps & {
  disabled?: boolean;
  id: UniqueIdentifier;
  items: UniqueIdentifier[];
  saveBoard?: (items: UniqueIdentifier[]) => void;
  style?: React.CSSProperties;
}) {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
    id,
    data: {
      type: "container",
      children: items,
    },
    animateLayoutChanges,
  });

  const isOverContainer = over
    ? (id === over.id && active?.data.current?.type !== "container") ||
      items.includes(over.id)
    : false;

  return (
    <BoardContainer
      ref={disabled ? undefined : setNodeRef}
      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
      }}
      hover={isOverContainer}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      id={id}
      columns={columns}
      {...props}
    >
      {children}
    </BoardContainer>
  );
}
