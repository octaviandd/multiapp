/** @format */

import React, { useContext } from "react";
import { StoreContext } from "@/store";
import dayjs from "dayjs";

export default function Home() {
  const { store } = useContext(StoreContext);

  return (
    <div className="home">
      <div className="p-6">
        <div className="mb-4">
          <p className="text-[20px] text-white">Home</p>
        </div>
        <div className="flex w-full justify-center flex-col">
          <div>
            <p className="text-[16px] text-center text-white">
              Saturday, {dayjs().format("DD MMMM")}
            </p>
            <p className="text-[32px] text-center text-white">
              Good evening, {store?.user?.firstName}
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex justify-center bg-[#252628] rounded-full px-6 py-3">
              <div className="px-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>

                <span className="text-neutral-400 text-[12px] ml-2">
                  {store?.user?.tasks.filter((task) => task.completed).length ??
                    "0"}{" "}
                  task completed
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-6 flex w-full"></div>
      </div>
    </div>
  );
}
