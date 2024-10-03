/** @format */

import React, {
  forwardRef,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
} from "react";

import { Handle } from "../BoardItem/Handle";
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
  recentlyAdded?: boolean;
  removeTemporaryBoard?: () => void;
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
      removeTemporaryBoard,
      label,
      id,
      placeholder,
      style,
      scrollable,
      shadow,
      recentlyAdded,
      unstyled,
      ...props
    }: Props,
    ref
  ) => {
    const Component = onClick ? "button" : "div";
    const inputRef = useRef<HTMLInputElement>(null);

    const onBlurTask = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!e.target.value) {
        if (removeTemporaryBoard) removeTemporaryBoard();
      } else {
        if (onChangeBoardTitle) onChangeBoardTitle(e.target.value);
      }
    };

    useEffect(() => {
      if (recentlyAdded) {
        inputRef.current?.focus();
      }
    }, [recentlyAdded]);

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
        {!placeholder ? (
          <div className="flex items-center justify-between mb-4 board-container-title cursor-pointer">
            <input
              className="large bg-transparent px-2 py-1 focus:outline-2"
              defaultValue={label}
              onBlur={onBlurTask}
              ref={inputRef}
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
