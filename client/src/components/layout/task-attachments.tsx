/** @format */

import { StoreContext } from "@/store";
import { cn } from "@/utils/helpers/utils";
import { Plus } from "lucide-react";
import React, { useContext } from "react";
import { File, TaskFile } from "../drag-and-drop/tasks/Board";

type Props = {
  taskFiles: TaskFile[] | undefined;
};

export default function TaskAttachments({ taskFiles }: Props) {
  const { setStore } = useContext(StoreContext);

  return (
    <div className="border-b border-neutral-600 pb-4 px-4">
      <p className="extra-small pb-3 text-white">Attachments</p>
      <section className="p-6">
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
      <div>
        {taskFiles?.map((taskFile, index) => (
          <div key={index} className="flex items-center gap-3 py-2">
            <img
              src={taskFile.file.url}
              alt="attachment"
              className="h-8 w-8 rounded-lg"
            />
            <p className="text-white">{taskFile.file.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
