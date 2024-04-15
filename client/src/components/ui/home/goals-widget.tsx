/** @format */

import React, { forwardRef, useEffect, useState } from "react";
import { ActionProps } from "@/shared/drag-and-drop/Item/Action";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

import { Progress } from "@/components/ui/progress";

export function ProgressDemo() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-[60%] !h-2" />;
}

interface Props {}

export const GoalsWidget = forwardRef<HTMLButtonElement, ActionProps>(
  (props, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="home-board-note group">
        <button
          className="flex justify-between border-b border-[#656567] pb-3 cursor-grab"
          {...props}
          ref={ref}
          tabIndex={2}
        >
          <div className="flex items-center">
            <h4 className="mr-2">Goals</h4>
            <Select>
              <SelectTrigger className="w-full bg-transparent px-0 py-0 border-0 text-neutral-400 text-[12px] mr-2 h-full">
                <SelectValue placeholder="All goals" className="" />
              </SelectTrigger>
              <SelectContent className="bg-[#252628] text-white border-0">
                <SelectItem value="light">All goals</SelectItem>
                <SelectItem value="dark">Open goals</SelectItem>
                <SelectItem value="system">Closed goals</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
        <ul>
          <li className="h-[34px] flex items-center pr-6 whitespace-nowrap relative">
            <span className="mr-2">
              <Plus width={12} height={12} />
            </span>
            <p className="small !mt-0">Add goal</p>
          </li>
          {Array.from({ length: 2 }).map((item, index) => (
            <li
              key={index}
              className="p-3 flex items-center justify-between whitespace-nowrap rounded-lg relative border border-[#656567]"
            >
              <div className="flex flex-col">
                <div className="mb-2">
                  <p className="small !mt-0">Note</p>
                </div>
                <div className="flex items-center gap-x-2">
                  <p className="muted extra-small">Q2 FY24</p>
                  <span className="h-1 w-1 block rounded-full bg-[#a2a0a2]"></span>
                  <p className="muted extra-small">My workspace</p>
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <Progress />
                </div>
                <div>
                  <p className="muted extra-small">No status</p>
                </div>
              </div>
              <div>
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
