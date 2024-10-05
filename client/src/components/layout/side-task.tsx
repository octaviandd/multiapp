/** @format */

import { UniqueIdentifier } from "@dnd-kit/core";
import { Folder, PlusCircle } from "lucide-react";
import { use } from "passport";
import React, { useEffect, useState } from "react";

interface SideTaskProps {
  selectedItem: UniqueIdentifier;
}

const SideTask: React.FC<SideTaskProps> = ({ selectedItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      fetch(`/api/boards/tasks/${String(selectedItem).replace("T", "")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching task:", error);
        });
      setIsOpen(true);
    }
  }, [selectedItem]);

  return (
    <div
      id="taskSidebar"
      className={`absolute border-[#424244] border-l right-0 top-0 h-full w-full sm:w-2/5 md:w-1/3 lg:w-1/3 bg-[#1E1F21] shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-[#424244]">
        <h2 className="pb-0 mb-0 text-xl border-none font-semibold text-white">
          Task Title
        </h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-white"
        >
          <svg
            className="w-[16px] h-[16px] bg-[#1E1F21] fill-[#a2a0a2] text-white"
            viewBox="0 0 32 32"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M3 15h18.379L13.94 7.561a1.5 1.5 0 1 1 2.121-2.121l10 10a1.5 1.5 0 0 1 0 2.121l-10 10A1.495 1.495 0 0 1 15 28a1.5 1.5 0 0 1-1.061-2.56l7.439-7.439H3a1.5 1.5 0 1 1 0-3V15ZM30.5 2.5A1.5 1.5 0 0 0 29 4v25a1.5 1.5 0 1 0 3 0V4a1.5 1.5 0 0 0-1.5-1.5Z"></path>
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/32"
              alt="Assignee Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="ml-2 text-sm text-white">Assigned to You</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3M16 7V3M4 11h16M4 19h16M5 11V5a2 2 0 012-2h10a2 2 0 012 2v6M5 19v-2a2 2 0 012-2h10a2 2 0 012 2v2"
              />
            </svg>
            <span className="ml-2 text-sm text-white">Due Today</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">Description</h3>
          <p className="mt-2 text-sm text-white">
            This is a detailed description of the task. It explains what needs
            to be done and any other relevant information.
          </p>
        </div>

        <div className="py-3 border-b border-[#424242]">
          <p className="extra-small pb-3 text-white border-b border-[#424242]">
            Subtasks
          </p>
          <ul className="mt-2 space-y-2">
            <li className="h-[34px] p-3 flex items-center whitespace-nowrap relative border border-[#656567]">
              <span className="mr-2">
                <Folder color="white" width={12} height={12} />
              </span>
              <p className="extra-small text-white !mt-0">Subtask</p>
            </li>
          </ul>
          <div className="inline-flex gap-x-2 items-center px-3 py-1 border cursor-pointer rounded-md transition-all duration-100 ease-in-out hover:bg-[#333334]">
            <span>
              <PlusCircle color="white" width={12} height={12} />
            </span>
            <p className="extra-small text-white">Add subtask</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">Attachments</h3>
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 00-5.656-5.656L7.757 9.172a6 6 0 008.485 8.485l6.586-6.586"
                />
              </svg>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                attachment.pdf
              </a>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">Comments</h3>
          <div className="mt-2">
            <textarea
              className="w-full p-2 text-[14px] hover:placeholder-h border rounded-md focus:outline-none bg-[#1E2021]"
              rows={3}
              placeholder="Add a comment"
            ></textarea>
            <button className="mt-2 px-4 py-2 bg-[#4573D2] text-white rounded-md">
              <p className="small text-white">Comment</p>
            </button>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex space-x-3">
              <img
                src="https://via.placeholder.com/32"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="text-sm font-medium text-white">User Name</div>
                <div className="text-sm text-white">
                  This is a comment on the task providing additional details.
                </div>
                <div className="text-xs text-gray-500 mt-1">Just now</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideTask;
