/** @format */

import React, { useContext, useEffect, useRef } from "react";
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import styles from "./item.module.scss";

import { Handle } from "./Handle";

import { cn } from "@/utils/helpers/utils";
import { CircleCheck } from "lucide-react";
import { StoreContext } from "@/store";
import { TaskFile } from "../Board";

export interface Props {
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  handleProps?: any;
  height?: number;
  index?: number;
  completed?: boolean;
  lastFileUrl?: string;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  id: UniqueIdentifier;
  recentlyAdded?: boolean;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: string;
  onRemove?(): void;
  saveTask?(title: string, taskId: UniqueIdentifier | null): void;
  removeTemporaryTask?(): void;
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
        completed,
        id,
        listeners,
        lastFileUrl,
        recentlyAdded,
        onRemove,
        removeTemporaryTask,
        saveTask,
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
      const inputRef = useRef<HTMLInputElement>(null);

      const listItemStyles = {
        ...wrapperStyle,
        transition: [transition, wrapperStyle?.transition]
          .filter(Boolean)
          .join(", "),
        "--translate-x": transform ? `${Math.round(transform.x)}px` : undefined,
        "--translate-y": transform ? `${Math.round(transform.y)}px` : undefined,
        "--scale-x": transform?.scaleX ? `${transform.scaleX}` : undefined,
        "--scale-y": transform?.scaleY ? `${transform.scaleY}` : undefined,
        "--index": index,
        "--color": color,
      } as React.CSSProperties;

      const updateStoreCurrentBoardItem = (id: UniqueIdentifier) => {
        setStore((prev) => ({
          ...prev,
          currentBoardItem: id,
        }));
      };

      const onBlurTask = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value) {
          if (removeTemporaryTask) removeTemporaryTask();
        } else {
          if (saveTask) saveTask(e.target.value, id);
        }
      };

      useEffect(() => {
        if (recentlyAdded) {
          inputRef.current?.focus();
        }
      }, [recentlyAdded]);

      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      return (
        <li
          onClick={() => updateStoreCurrentBoardItem(id)}
          className={cn(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay,
            completed && styles.completed,
            store.currentBoardItem === id && styles.active
          )}
          style={listItemStyles}
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
            <div className="flex items-center flex-start">
              <div className="mr-2">
                <CircleCheck width={14} height={14} />
              </div>
              <input
                className="large bg-transparent px-2 py-1 border-0 focus:outline-none"
                defaultValue={value}
                onBlur={onBlurTask}
                ref={inputRef}
                placeholder="Write a new task"
              ></input>
              <span className={styles.Actions}>
                <Handle {...handleProps} {...listeners} />
              </span>
            </div>
            {!recentlyAdded && lastFileUrl && (
              <div className="flex justify-between items-center mt-7">
                <img
                  src={lastFileUrl}
                  alt="last file"
                  className="h-auto max-h-[250px] w-full object-cover"
                />
              </div>
            )}
          </div>
        </li>
      );
    }
  )
);
