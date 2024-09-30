/** @format */

import React, { useEffect, useState } from "react";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import styles from "./item.module.scss";

import { Handle } from "./Handle";
import { Remove } from "./Remove";

import { cn } from "../../../../utils/helpers/utils";

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
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: React.ReactNode;
  onRemove?(): void;
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

const CLICK_DRAG_THRESHOLD = 5; // Threshold to distinguish click from drag

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
        listeners,
        onRemove,
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
      const [mouseDownPosition, setMouseDownPosition] = useState<{
        x: number;
        y: number;
      } | null>(null);

      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      const handleMouseDown = (event: React.MouseEvent) => {
        // Store the mouse down position
        setMouseDownPosition({ x: event.clientX, y: event.clientY });
      };

      const handleMouseMove = (event: React.MouseEvent) => {
        if (!mouseDownPosition) return;

        const deltaX = Math.abs(event.clientX - mouseDownPosition.x);
        const deltaY = Math.abs(event.clientY - mouseDownPosition.y);

        // If the mouse moved beyond the threshold, it's considered a drag
        if (deltaX >= CLICK_DRAG_THRESHOLD || deltaY >= CLICK_DRAG_THRESHOLD) {
          setMouseDownPosition(null); // Reset after determining drag
        }
      };

      const handleMouseUp = (event: React.MouseEvent) => {
        if (!mouseDownPosition) return;

        const deltaX = Math.abs(event.clientX - mouseDownPosition.x);
        const deltaY = Math.abs(event.clientY - mouseDownPosition.y);

        // If movement is within threshold, it's a click
        if (deltaX < CLICK_DRAG_THRESHOLD && deltaY < CLICK_DRAG_THRESHOLD) {
          if (typeof value === "object" && React.isValidElement(value)) {
            // Trigger click action here
            console.log("Item clicked");
          }
        }

        setMouseDownPosition(null); // Reset after click or drag
      };

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
          className={cn(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay
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
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          {...listeners}
          ref={ref}
        >
          <div
            className={cn(
              styles.Item,
              dragging && styles.dragging,
              handle && styles.withHandle,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
              color && styles.color
            )}
            style={style}
            data-cypress="draggable-item"
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            {typeof value === "object" &&
              React.isValidElement(value) &&
              React.cloneElement(value, { ...handleProps, ...listeners })}
            <span className={styles.Actions}>
              {onRemove ? (
                <Remove className={styles.Remove} onClick={onRemove} />
              ) : null}
              {handle ? <Handle {...handleProps} {...listeners} /> : null}
            </span>
          </div>
        </li>
      );
    }
  )
);
