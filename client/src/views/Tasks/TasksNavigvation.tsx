/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/layout/avatar";
import { StoreContext } from "@/store/index";
import SideTask from "@/components/layout/side-task";
import { fetchWithOptions } from "@/utils/helpers/utils";
import dayjs from "dayjs";

export default function Tasks() {
  const { store } = useContext(StoreContext);
  const [lastTaskCompleted, setLastTaskCompleted] =
    useState<string>("No tasks completed");

  useEffect(() => {
    const promise = fetchWithOptions("/api/auth/user-completed-tasks");
    promise.then(({ data, error }) => {
      if (error) return;

      if (data.length === 0) return;
      setLastTaskCompleted(
        "Last task completed on " +
          dayjs(data[0].updatedAt).format("MMMM D, YYYY")
      );
    });
  }, [store.completedItem]);

  return (
    <div className="flex flex-col w-full transition-all ease-in-out duration-300 h-full dark-scroll relative">
      <div className="w-full bg-[#1E1F21] h-16 py-3 px-4 flex items-center gap-x-6">
        <div className="flex items-center">
          <div className="flex items-center gap-x-2 cursor-pointer">
            <Avatar className="w-[48px] h-[48px] min-w-[48px] min-h-[48px]">
              <AvatarImage src={store.user?.profileImage} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-[20px] mr-2 font-semibold text-white">
              My tasks
            </span>
          </div>
          <div className="flex gap-x-4">
            <Link to="board" className="text-[16px] font-medium text-white">
              Board
            </Link>
            <Link to="files" className="text-[16px] font-medium text-white">
              Files
            </Link>
          </div>
        </div>
      </div>
      <div className="h-10 py-4 bg-[#1E1F21] border-b border-t border-[#424244] flex items-center justify-between px-4">
        <div>
          <p className="muted extra-small">{lastTaskCompleted}</p>
        </div>
      </div>
      <div className="w-full h-full bg-[#252628]">
        <Outlet />
      </div>
      {store.currentBoardItem && (
        <SideTask selectedItem={store.currentBoardItem} />
      )}
    </div>
  );
}
