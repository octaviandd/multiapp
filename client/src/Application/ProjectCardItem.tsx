/** @format */

import React from "react";

type Props = {};

export default function ProjectCardItem({}: Props) {
  return (
    <div className="flex items-center gap-x-2 px-2 py-1 rounded-lg hover:bg-[#3D3E40] group/item">
      <div className="mr-3">
        <div className="flex items-center justify-center gap-x-5 cursor-pointer h-[48px] w-[48px] min-w-[48px] min-h-[48px]">
          <img
            src="https://via.placeholder.com/50"
            className="rounded-full w-8 h-8"
            alt="Profile"
          />
        </div>
      </div>
      <div>
        <div>
          <span className="font-medium">Cross-functional project plan</span>
        </div>
        <div>
          <span className="text-[12px] text-[#a2a0a2]">3 tasks due soon</span>
        </div>
      </div>
      <div className="ml-auto">
        <span className="hidden group-hover/item:inline-block p-2 rounded-lg transition-all ease-in-out duration-400 hover:bg-[#3D3E40] cursor-pointer">
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
      </div>
    </div>
  );
}
