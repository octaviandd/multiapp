/** @format */

import React from "react";
import { BoardSortable } from "../shared/drag-and-drop/BoardSortable";

type Props = {};

export default function Home({}: Props) {
  return (
    <div className="overflow-y-scroll home-background w-full">
      <div className="p-6">
        <div className="mb-4">
          <p className="text-[20px]">Home</p>
        </div>
        <div className="flex w-full justify-center flex-col">
          <div>
            <p className="text-[16px] text-center">Saturday, March 30</p>
            <p className="text-[32px] text-center">Good evening, Octavian</p>
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex justify-center bg-[#252628] rounded-full px-6 py-3">
              <div className="border-r border-neutral-600 pr-6 flex items-center">
                <span className="text-neutral-400 text-[12px] mr-2">
                  My week
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="white"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
              <div className="pl-8 pr-7 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>

                <span className="text-neutral-400 text-[12px] ml-2">
                  1 task completed
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <span className="text-neutral-400 text-[12px] ml-2">
                  0 collaborators
                </span>
              </div>
            </div>
            {/* <div className="flex items-center bg-[#252628] rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                />
              </svg>
            <span>Customize</span>
            </div> */}
          </div>
        </div>
        <div className="my-6 flex w-full">
          <BoardSortable />
        </div>
      </div>
    </div>
  );
}
