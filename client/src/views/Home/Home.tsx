/** @format */

import React from "react";
import { BoardSortable } from "../../components/drag-and-drop/home/BoardSortable";
import styles from "./home.module.scss";

type Props = {};

export default function Home({}: Props) {
  return (
    <div className={styles.Home}>
      <div className="p-6">
        <div className="mb-4">
          <p className="text-[20px] text-white">Home</p>
        </div>
        <div className="flex w-full justify-center flex-col">
          <div>
            <p className="text-[16px] text-center text-white">
              Saturday, March 30
            </p>
            <p className="text-[32px] text-center text-white">
              Good evening, Octavian
            </p>
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
              <div className="pl-8 pr-1 flex items-center">
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
                  1 task completed
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-6 flex w-full">
          <BoardSortable />
        </div>
      </div>
    </div>
  );
}
