/** @format */

import React, { forwardRef, useState } from "react";

import { Handle } from "../../BoardItem/Handle";
import { cn } from "@/utils/helpers/utils";
import styles from "./container.module.scss";
import { Plus } from "lucide-react";
import { UniqueIdentifier } from "@dnd-kit/core";

export interface Props {
  children: React.ReactNode;
  columns?: number;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  id: UniqueIdentifier;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  onClick?(): void;
  onRemove?(): void;
  onChangeBoardTitle?(title: string): void;
}

export type { Props as ContainerProps };

export const BoardContainer = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      onChangeBoardTitle,
      label,
      id,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: Props,
    ref
  ) => {
    const Component = onClick ? "button" : "div";

    const changeBoardTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (label) {
        if (onChangeBoardTitle) onChangeBoardTitle(e.target.value);
      }
    };

    const updateBackEnd = () => {
      fetch(`/api/boards/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: label,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    return (
      <Component
        {...props}
        ref={ref as any}
        style={style}
        className={cn(
          styles.Container,
          unstyled && styles.unstyled,
          horizontal && styles.horizontal,
          hover && styles.hover,
          placeholder && styles.placeholder,
          scrollable && styles.scrollable,
          shadow && styles.shadow,
          "border border-[#424244]"
        )}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div className="flex items-center justify-between mb-4 board-container-title cursor-pointer">
            <input
              className="large bg-transparent px-2 py-1"
              value={label}
              onChange={changeBoardTitle}
              onBlur={updateBackEnd}
            ></input>
            <div className="flex items-center gap-x-3">
              <div className="flex items-center justify-between">
                <Plus width={16} height={16} />
              </div>
              <div className="flex items-center justify-between">
                <Handle {...handleProps} />
              </div>
            </div>
          </div>
        ) : null}
        {placeholder ? children : <ul>{children}</ul>}
      </Component>
    );
  }
);
