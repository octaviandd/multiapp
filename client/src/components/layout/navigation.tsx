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
      className={`flex flex-col bg-[#2e2e30] flex-shrink-0 transition-all ease-in-out duration-200 ${
        displaySidebar ? "w-[240px]" : "w-0"
      }`}
    >
      <ul className={`mb-3 list-none ml-0 px-4 transition-all ease-in-out duration-[50] ${displaySidebar ? "opacity-100" : "opacity-0"}`}>
        <li className="text-white py-1 px-4 hover:bg-[#3D3E40] rounded-lg cursor-pointer whitespace-nowrap">
          <Link to="/home" className="flex items-center gap-x-2 w-full">
            <Home width={16} height={16} />
            <span>Home</span>
          </Link>
        </li>
        <li className="text-white w-full py-1 px-4 hover:bg-[#3D3E40] rounded-lg cursor-pointer whitespace-nowrap">
          <Link to="/tasks/list" className="flex items-center gap-x-2">
            <ListTodo width={16} height={16} />
            <span>Tasks Manager</span>
          </Link>
        </li>
        <li className="text-white py-1 px-4 hover:bg-[#3D3E40] rounded-lg cursor-pointer whitespace-nowrap">
          <Link to="/notes" className="flex items-center gap-x-2 w-full">
            <Notebook width={16} height={16} />
            <span>Notes</span>
          </Link>
        </li>
        <li className="text-white  w-full py-1 px-4 hover:bg-[#3D3E40] rounded-lg cursor-pointer whitespace-nowrap">
          <Link to="/finance" className="flex items-center gap-x-2">
            <Landmark width={16} height={16} />
            <span>Finance Manager</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
