/** @format */

import { ActionProps } from "@/shared/drag-and-drop/Item/Action";
import React, { forwardRef, useState } from "react";

type Props = {};

export const PeopleWidget = forwardRef<HTMLButtonElement, ActionProps>(
  (props, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="home-board-note group">
        <button
          className="flex justify-between cursor-grab"
          {...props}
          ref={ref}
          tabIndex={3}
        >
          <h4>People</h4>
          <span className="home-board-settings">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </span>
        </button>
      </div>
    );
  }
);
