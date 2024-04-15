/** @format */

import React from "react";

type Props = {};

export default function ProjectCardItemCreate({}: Props) {
  return (
    <div className="group/create-item flex items-center hover:bg-[#3D3E40] rounded-lg p-2">
      <div className="mr-5 h-[48px] w-[48px] min-w-[48px] min-h-[48px] border-dotted border rounded-lg flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={4}
          className="rounded-full w-5 h-5 p-1 stroke-[#a2a0a2] group-hover/create-item:stroke-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <div>
        <span className="font-medium text-[##a2a0a2]">Create project</span>
      </div>
    </div>
  );
}
