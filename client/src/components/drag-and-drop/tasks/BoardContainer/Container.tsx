/** @format */

import React, { forwardRef, useEffect, useRef } from "react";

import { Handle } from "../BoardItem/Handle";
import { cn } from "@/utils/helpers/utils";
import styles from "./container.module.scss";
import { Plus, Ellipsis, Pen, Trash } from "lucide-react";
import { UniqueIdentifier } from "@dnd-kit/core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

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
  removeBoard?: (id: UniqueIdentifier) => void;
  id: UniqueIdentifier;
  shadow?: boolean;
  placeholder?: boolean;
  onClick?(): void;
  onRemove?(): void;
  onChangeBoardTitle?(title: string): void;
  createTask?(boardId: UniqueIdentifier): void;
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
      removeBoard,
      createTask,
      label,
      id,
      placeholder,
      style,
      scrollable,
      shadow,
      recentlyAdded,
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

    const handleCreateTaskFromBoard = () => {
      if (createTask) createTask(id);
    };

    const handleRemoveBoard = (
      e: React.MouseEvent<HTMLDivElement>,
      id: UniqueIdentifier
    ) => {
      e.preventDefault();
      if (removeBoard) removeBoard(id);
    };

    const onClickFocus = () => {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
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
          horizontal && styles.horizontal,
          hover && styles.hover,
          placeholder && styles.placeholder,
          scrollable && styles.scrollable,
          shadow && styles.shadow,
          "border border-[#424244] border-opacity-0 hover:border-opacity-100 transition-all duration-400 ease-in-out"
        )}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {!placeholder ? (
          <div className="flex items-center justify-between mb-4 cursor-pointer">
            <input
              className="large bg-transparent px-2 py-1 focus:outline-2 text-[20px] leading-5 font-medium"
              defaultValue={label}
              onBlur={onBlurTask}
              ref={inputRef}
            ></input>
            <div className="flex items-center gap-x-3">
              <div className="flex items-center justify-between p-1 rounded-md hover:bg-[#343638]">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Ellipsis width={16} height={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="mt-2 bg-[#1E1F21] border border-neutral-600 rounded-md z-50"
                    align="start"
                    alignOffset={10}
                  >
                    <DropdownMenuItem
                      className="cursor-pointer px-3 py-2 hover:bg-[#3D3E3F] flex items-center"
                      onClick={() => onClickFocus()}
                    >
                      <Pen width={16} height={16} className="mr-2" />
                      Rename Section
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer px-3 py-2 hover:bg-[#3D3E3F] flex items-center"
                      onClick={(e) => handleRemoveBoard(e, id)}
                    >
                      <Trash width={16} height={16} className="mr-2" />
                      Delete Section
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center justify-between p-1 rounded-md hover:bg-[#343638]">
                <Plus
                  width={16}
                  height={16}
                  onClick={() => handleCreateTaskFromBoard()}
                />
              </div>
              <div className="flex items-center justify-between p-1">
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
