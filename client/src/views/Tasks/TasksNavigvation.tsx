/** @format */

import React, { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/layout/avatar";
import { StoreContext } from "@/store/index";

type Props = {};

export default function Tasks({}: Props) {
  const { store } = useContext(StoreContext);

  return (
    <div className="flex flex-col w-full transition-all ease-in-out duration-300 h-full dark-scroll">
      <div className="w-full bg-[#1E1F21] h-16 py-3 px-4 flex items-center gap-x-6">
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
      <div className="h-10 py-4 bg-[#1E1F21] border-b border-t border-[#424244] flex items-center justify-between px-4">
        <div>
          <p className="muted extra-small">Last task completed on 31 Mar</p>
        </div>
      </div>
      <div className="w-full h-full bg-[#252628]">
        <Outlet />
      </div>
    </div>
  );
}
