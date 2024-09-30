/** @format */

import React, { useContext, useEffect, useState } from "react";
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import styles from "./item.module.scss";

import { Handle } from "./Handle";

import { cn } from "@/utils/helpers/utils";
import { CalendarClock, CircleCheck, ThumbsUp } from "lucide-react";
import { StoreContext } from "@/store";

export interface Props {
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  handleProps?: any;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  id: UniqueIdentifier;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: string;
  onRemove?(): void;
  onChangeTaskTitle?(title: string): void;
  removeTemporaryTask?(): void;
  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: Props["transform"];
    transition: Props["transition"];
    value: Props["value"];
  }): React.ReactElement;
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        id,
        listeners,
        onRemove,
        removeTemporaryTask,
        onChangeTaskTitle,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        ...props
      },
      ref
    ) => {
      const { store, setStore } = useContext(StoreContext);

      const updateStoreCurrentBoardItem = (id: UniqueIdentifier) => {
        setStore((prev) => ({
          ...prev,
          currentBoardItem: id,
        }));
      };

      const setTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (value) {
          if (onChangeTaskTitle) onChangeTaskTitle(e.target.value);
        }
      };

      const onBlurTask = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value) {
          if (removeTemporaryTask) removeTemporaryTask();
        }
      };

      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <li
          onClick={() => updateStoreCurrentBoardItem(id)}
          className={cn(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay,
            store.currentBoardItem === id && styles.active
          )}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(", "),
              "--translate-x": transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              "--translate-y": transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              "--scale-x": transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              "--scale-y": transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              "--index": index,
              "--color": color,
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div
            className={cn(
              styles.Item,
              dragging && styles.dragging,
              handle && styles.withHandle,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
              color && styles.color,
              "group"
            )}
            style={style}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            <div className="flex items-center">
              <div className="mr-2">
                <CircleCheck width={14} height={14} />
              </div>
              <input
                className="large bg-transparent px-2 py-1"
                value={value}
                onChange={setTaskTitle}
                onBlur={onBlurTask}
                placeholder="Write a new task"
              ></input>
            </div>
            <div className="flex justify-between items-center mt-7">
              <CalendarClock
                width={14}
                height={14}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out border-dotted rounded-full"
              />
              <ThumbsUp
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
                width={14}
                height={14}
              />
            </div>
            <span className={styles.Actions}>
              {handle ? <Handle {...handleProps} {...listeners} /> : null}
            </span>
          </div>
        </li>
      );
    }
  )
);
