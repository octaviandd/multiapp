/** @format */

import { ActionProps } from "@/shared/drag-and-drop/Item/Action";
import React, { forwardRef } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {};

export const FinanceWidget = forwardRef<HTMLButtonElement, ActionProps>(
  (props, ref) => {
    return (
      <div className="home-board-note group">
        <button
          className="flex justify-between grab-cursor"
          {...props}
          ref={ref}
          tabIndex={4}
        >
          <div className="flex items-center">
            <h4 className="mr-2">Finance Tracker</h4>
            <Select>
              <SelectTrigger className="w-full bg-transparent px-0 py-0 border-0 text-neutral-400 text-[12px] mr-2 h-full">
                <SelectValue placeholder="All activity" className="" />
              </SelectTrigger>
              <SelectContent className="bg-[#252628] text-white border-0">
                <SelectItem value="light">Recent incomes</SelectItem>
                <SelectItem value="dark">Recent outcomes</SelectItem>
                <SelectItem value="system">All activity</SelectItem>
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
                  <p className="muted extra-small">11/02/2024</p>
                  <span className="h-1 w-1 block rounded-full bg-[#a2a0a2]"></span>
                  <p className="muted extra-small">Tesco</p>
                </div>
              </div>
              <div>
                <div>
                  <p className="extra-small">£22.56</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
