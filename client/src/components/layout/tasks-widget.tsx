/** @format */

import { ActionProps } from "@/components/drag-and-drop/tasks/BoardItem/Action";
import React, { forwardRef } from "react";

export const TasksWidget = forwardRef<HTMLButtonElement, ActionProps>(
  (props, ref) => {
    return (
      <div className="home-board-note group">
        <button
          className="flex justify-between cursor-grab"
          {...props}
          ref={ref}
          tabIndex={5}
        >
          <h4>My Tasks</h4>
        </button>
      </div>
    );
  }
);
