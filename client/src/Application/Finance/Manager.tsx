/** @format */

import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { DataTable } from "../Tables/data-table";
import { columns } from "../Tables/columns";
import data from "../Tables/tasks.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {};

export default function FinanceManager({}: Props) {
  return (
    <div className="flex flex-col w-full">
      <div className="border-b border-neutral-500 w-full">
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
                My finances
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
              <Link to="review" className="text-[16px] font-medium text-white">
                Review
              </Link>
              <Link
                to="transactions"
                className="text-[16px] font-medium text-white"
              >
                Transactions
              </Link>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <Outlet />
    </div>
  );
}
