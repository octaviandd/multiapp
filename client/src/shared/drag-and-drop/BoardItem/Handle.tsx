/** @format */

import React, { forwardRef } from "react";
import { GripVertical } from "lucide-react";

import { Action, ActionProps } from "./Action";

export const Handle = forwardRef<HTMLButtonElement, ActionProps>(
  (props, ref) => {
    return (
      <Action ref={ref} data-cypress="draggable-handle" {...props}>
        <GripVertical width={16} height={16} stroke="white" />
      </Action>
    );
  }
);
