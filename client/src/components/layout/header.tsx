/** @format */

import React, { useState } from "react";
import Searchbar from "./searchbar";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { CreditCard, Github, LogOut, Plus, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/layout/dropdown-menu";
import { useNavigate } from "react-router-dom";

type Props = {
  displaySidebar: boolean;
  setDisplaySidebar: Function;
};

export default function Header({ displaySidebar, setDisplaySidebar }: Props) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logOut = () => {
    setLoading(true);
    fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <header className="flex items-center justify-between bg-[#2e2e30] w-full px-6 py-3 border-b border-[#424244]">
      <div className="flex items-center gap-x-4">
        <button className="relative group">
          <div
            onClick={() => setDisplaySidebar(!displaySidebar)}
            className="relative flex overflow-hidden items-center justify-center rounded-full w-[30px] h-[30px] transform transition-all ring-0 ring-gray-300 hover:ring-8 focus:ring-4 ring-opacity-30 duration-200 shadow-md"
          >
            <div
              className={`flex flex-col justify-between w-[12px] h-[12px] transform transition-all duration-500 origin-center overflow-hidden ${
                displaySidebar ? "rotate-180" : ""
              }`}
            >
              <div
                className={`bg-white h-[1px] w-5 transform transition-all duration-500 ${
                  displaySidebar ? "rotate-45 -translate-x-1" : ""
                }`}
              ></div>
              <div className="bg-white h-[1px] w-5 rounded transform transition-all duration-500"></div>
              <div
                className={`bg-white h-[1px] w-5 transform transition-all duration-500 ${
                  displaySidebar ? "-rotate-45 -translate-x-1" : ""
                }`}
              ></div>
            </div>
          </div>
        </button>
        <div className="flex items-center gap-x-2 border rounded-full border-neutral-400 px-2 py-1 cursor-pointer hover:bg-[#3D3E40] transition-all ease-in-out duration-100">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center bg-transparent px-2 py-0 h-8 focus:outline-none">
                <Plus className="text-white" />
                <span className="text-white ml-2">Create</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 mt-2"
              align="start"
              alignOffset={15}
            >
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User color="black" className="mr-2 h-4 w-4" />
                  <span className="text-black">Task</span>
                  <DropdownMenuShortcut className="text-black">
                    ⇧⌘P
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard
                    color="black"
                    className="mr-2 h-4 w-4 text-black"
                  />
                  <span className="text-black">Note</span>
                  <DropdownMenuShortcut className="text-black">
                    ⌘B
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings color="black" className="mr-2 h-4 w-4" />
                  <span className="text-black">Transaction</span>
                  <DropdownMenuShortcut className="text-black">
                    ⌘S
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Searchbar />
      <div className="flex items-center gap-x-2 cursor-pointer">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center">
              <Avatar className="w-6 h-6 mr-2">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
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
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 mt-2"
            align="end"
            alignOffset={10}
          >
            <DropdownMenuLabel className="text-black">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User color="black" className="mr-2 h-4 w-4" />
                <span className="text-black">Profile</span>
                <DropdownMenuShortcut className="text-black">
                  ⇧⌘P
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings color="black" className="mr-2 h-4 w-4" />
                <span className="text-black">Settings</span>
                <DropdownMenuShortcut className="text-black">
                  ⌘S
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Github color="black" className="mr-2 h-4 w-4" />
              <span className="text-black">GitHub</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logOut}>
              <LogOut color="black" className="mr-2 h-4 w-4" />
              <span className="text-black">Log out</span>
              <DropdownMenuShortcut className="text-black">
                ⇧⌘Q
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
