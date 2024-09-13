/** @format */

import React, { forwardRef } from "react";

import { Handle } from "../BoardItem/Handle";
import { cn } from "@/utils/helpers/utils";
import styles from "./container.module.scss";
import { Plus } from "lucide-react";

export interface Props {
  children: React.ReactNode;
  columns?: number;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  onClick?(): void;
  onRemove?(): void;
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
      label,
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
            <p className="large">{label}</p>
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
