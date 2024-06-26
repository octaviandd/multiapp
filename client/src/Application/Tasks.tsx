/** @format */

import React, { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StoreContext } from "@/store";

type Props = {};

export default function Tasks({}: Props) {
  const { store } = useContext(StoreContext);

  return (
    <div
      className={`flex flex-col w-full h-full transition-all ease-in-out duration-300 ${
        store.displaySidebar ? "translate-x-0" : "-translate-x-[240px]"
      }`}
    >
      <div className="overflow-hidden pb-2">
        <div className="w-full bg-[#1E1F21] py-3 px-4 flex items-center gap-x-6">
          <div className="flex items-center">
            <div className="flex items-center gap-x-2 cursor-pointer">
              <Avatar className="w-[48px] h-[48px] min-w-[48px] min-h-[48px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-[20px] mr-2 font-semibold text-white">
                My tasks
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                className="w-3 h-3 stroke-[#9CA3AF]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <div className="flex gap-x-4">
              <Link to="list" className="text-[16px] font-medium text-white">
                List
              </Link>
              <Link to="board" className="text-[16px] font-medium text-white">
                Board
              </Link>
              <Link
                to="calendar"
                className="text-[16px] font-medium text-white"
              >
                Calendar
              </Link>
              <Link to="files" className="text-[16px] font-medium text-white">
                Files
              </Link>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div>
        <div className="flex items-center justify-between bg-[#1E1F21] py-3 px-4 border-b border-t border-[#424244]">
          <div>
            <p className="muted extra-small">Last task completed on 31 Mar</p>
          </div>
          <div className="flex items-center gap-x-4">
            <button>Filter</button>
            <button>Sort</button>
            <button>Group By</button>
          </div>
        </div>
      </div>
      <div className="h-full">
        <div className="bg-[#252628] h-full">
          <div className={`overflow-scroll w-full h-full`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
