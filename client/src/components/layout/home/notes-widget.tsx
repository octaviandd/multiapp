/** @format */

import { ActionProps } from "@/shared/drag-and-drop/Item/Action";
import { Folder, Plus } from "lucide-react";
import React, { forwardRef, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/layout/dropdown-menu";

type Props = {
  handleProps?: any;
  listeners?: any;
};

export const NotesWidget = forwardRef<HTMLButtonElement, ActionProps>(
  (props, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="home-board-note group">
        <button
          className="flex justify-between border-b border-[#656567] pb-3 cursor-grab"
          ref={ref}
          {...props}
          tabIndex={0}
        >
          <h4>My Notes</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span
                className="home-board-settings"
                onClick={() => setOpen(true)}
              >
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
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 mt-2"
              align="start"
              alignOffset={15}
            >
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Remove</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>View all</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </button>
        <ul>
          <li className="h-[34px] flex items-center pr-6 whitespace-nowrap relative">
            <span className="mr-2">
              <Plus width={12} height={12} />
            </span>
            <p className="small !mt-0">Create task</p>
          </li>
          {Array.from({ length: 5 }).map((item, index) => (
            <li
              key={index}
              className="h-[34px] p-3 flex items-center whitespace-nowrap relative border border-[#656567]"
            >
              <span className="mr-2">
                <Folder width={12} height={12} />
              </span>
              <p className="small !mt-0">Note</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
