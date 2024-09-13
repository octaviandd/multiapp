/** @format */

import React, { forwardRef, CSSProperties } from "react";
import styles from "./action.module.scss";
import { cn } from "@/utils/helpers/utils";

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties["cursor"];
}

export type { Props as ActionProps };

export const Action = forwardRef<HTMLButtonElement, Props>(
  ({ active, className, cursor, style, ...props }, ref) => {
    return <button ref={ref} {...props} tabIndex={0} />;
  }
);
