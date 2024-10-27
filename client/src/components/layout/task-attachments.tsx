/** @format */

import { StoreContext } from "@/store";
import { cn } from "@/utils/helpers/utils";
import { Plus } from "lucide-react";
import React, { useContext } from "react";
import { TaskFile } from "../drag-and-drop/tasks/Board";

type Props = {
  taskFiles: TaskFile[] | undefined;
};

export default function TaskAttachments({ taskFiles }: Props) {
  const { setStore } = useContext(StoreContext);

  return (
    <div className="border-b border-neutral-600 pb-4 px-4">
      <p className="extra-small pb-3 text-white">Attachments</p>
      <section className="grid grid-cols-4 gap-4 grid-rows-auto p-6 items-center">
        {taskFiles?.map((taskFile) => (
          <div className="relative group">
            <button
              onClick={() =>
                setStore((prev) => ({
                  ...prev,
                  imageModalIsOpen: true,
                }))
              }
              className="absolute hidden group-hover:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5 z-50 bg-neutral-500/50 rounded-lg"
            >
              <Plus className="h-4 w-4" color="white" />
            </button>
            <div className="absolute top-0 hidden group-hover:block left-0 right-0 bottom-0 bg-black opacity-35 h-full w-full"></div>
            <img
              src={taskFile.file.url}
              alt="attachment"
              key={taskFile.id}
              className="h-12 w-full rounded-lg object-cover"
            />
          </div>
        ))}
        <div
          onClick={() =>
            setStore((prev) => ({ ...prev, filePickerModalIsOpen: true }))
          }
          className={cn(
            "group relative grid h-12 w-16 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
            "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
        >
          <Plus className="h-6 w-6" color="white" />
        </div>
      </section>
    </div>
  );
}
