/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { Landmark, Activity, ListTodo, Home, Notebook } from "lucide-react";

type Props = {
  displaySidebar: boolean;
  setDisplaySidebar: Function;
};

export default function Sidebar({ displaySidebar }: Props) {
  return (
    <div
      className={`flex flex-col bg-[#2e2e30] w-[240px] flex-shrink-0 h-full pb-16 transition-all ease-in-out duration-300 ${
        displaySidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ul className="border-b border-[#424244] mb-3 pb-3 list-none ml-0 px-4">
        <li className="text-white py-1 px-4 hover:bg-[#3D3E40] rounded-lg cursor-pointer">
          <Link to="/home" className="flex items-center gap-x-2 w-full">
            <Home width={16} height={16} />
            <span>Home</span>
          </Link>
        </li>
        <li className="text-white w-full py-1 px-4 hover:bg-[#3D3E40] rounded-lg cursor-pointer">
          <Link to="/tasks/list" className="flex items-center gap-x-2">
            <ListTodo width={16} height={16} />
            <span>Tasks Manager</span>
          </Link>
        </li>
        <li className="text-white py-1 px-4 hover:bg-[#3D3E40] rounded-lg cursor-pointer">
          <Link to="/notes" className="flex items-center gap-x-2 w-full">
            <Notebook width={16} height={16} />
            <span>Notes</span>
          </Link>
        </li>
        <li className="text-white  w-full py-1 px-4 hover:bg-[#3D3E40] rounded-lg cursor-pointer">
          <Link to="/finance" className="flex items-center gap-x-2">
            <Landmark width={16} height={16} />
            <span>Finance Manager</span>
          </Link>
        </li>
        <li className="text-white  w-full py-1 px-4 hover:bg-[#3D3E40] rounded-lg cursor-pointer">
          <Link to="/tasks" className="flex items-center gap-x-2">
            <Activity width={16} height={16} />
            <span>Activity Tracker</span>
          </Link>
        </li>
        <li className="text-white w-full py-1 px-4 hover:bg-[#3D3E40] rounded-lg cursor-pointer">
          <Link to="/inbox" className="flex items-center gap-x-2">
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
                d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
              />
            </svg>
            <span>Inbox</span>
          </Link>
        </li>
      </ul>
      <ul className="px-4 list-none ml-0">
        <li className="text-white flex items-center justify-between gap-x-2 w-full py-1 px-2 cursor-pointer">
          <span>Insights</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="rounded-full w-6 h-6 p-1 hover:bg-[#3D3E40]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </li>
        <li className="text-white flex items-center gap-x-2 w-full py-1 px-2 hover:bg-[#3D3E40] rounded-lg cursor-pointer">
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
              d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
            />
          </svg>
          <span>Reporting</span>
        </li>
        <li className="text-white flex items-center gap-x-2 w-full py-1 px-2 hover:bg-[#3D3E40] rounded-lg cursor-pointer">
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
              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
            />
          </svg>

          <span>Portfolio</span>
        </li>
        <li className="text-white flex items-center gap-x-2 w-full py-1 px-2 hover:bg-[#3D3E40] rounded-lg cursor-pointer">
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
              d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
            />
          </svg>

          <span>Goals</span>
        </li>
      </ul>
      <ul className="px-4 list-none ml-0">
        <li className="text-white flex items-center justify-between gap-x-2 w-full py-1 px-2 cursor-pointer">
          <span>Projects</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="rounded-full w-6 h-6 p-1 hover:bg-[#3D3E40]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </li>
        <li className="text-white flex items-center gap-x-2 w-full py-1 px-2 hover:bg-[#3D3E40] rounded-lg cursor-pointer">
          Project 1
        </li>
        <li className="text-white flex items-center gap-x-2 w-full py-1 px-2 hover:bg-[#3D3E40] rounded-lg cursor-pointer">
          Project 2
        </li>
        <li className="text-white flex items-center gap-x-2 w-full py-1 px-2 hover:bg-[#3D3E40] rounded-lg cursor-pointer"></li>
      </ul>
      <ul className="px-4 ml-0 list-none">
        <li className="text-white flex items-center gap-x-2 w-full py-1 px-2 hover:bg-[#3D3E40] rounded-lg cursor-pointer">
          Team
        </li>
        <li className="text-white flex items-center gap-x-2 w-full py-1 px-2 hover:bg-[#3D3E40] rounded-lg cursor-pointer">
          My Workspace
        </li>
      </ul>

      <div className="border-t py-3 mt-auto border-[#424244] flex flex-col justify-center items-center gap-y-3">
        {/* <button className="text-white justify-center flex items-center gap-x-2 w-full py-1 px-2 hover:bg-[#3D3E40] rounded-lg border-neutral-400 cursor-pointer bg-[#3D3E40]">
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
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <span>Invite teammates</span>
          </button> */}
        <a className="text-white py-1 px-5 w-full hover:bg-[#3D3E40] cursor-pointer rounded-lg text-center">
          Help
        </a>
      </div>
    </div>
  );
}
