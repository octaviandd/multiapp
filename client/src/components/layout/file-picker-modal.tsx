/** @format */

import React, { useCallback, useContext, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import docIcon from "@/assets/doc.png";
import pdfIcon from "@/assets/pdf.png";
import imgIcon from "@/assets/img.png";
import { Button } from "./button";
import { CheckIcon, CircleX } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { cn, fetchWithOptions } from "@/utils/helpers/utils";
import { StoreContext } from "@/store";
import { Input } from "./input";

type Props = {};

export default function FilePickerModal({}: Props) {
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: any) => {
    const formData = new FormData();
    acceptedFiles.forEach((file: any, index: number) => {
      formData.append(file.name + index, file);
    });

    fetch("/api/files/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentFiles((prev) => {
          return [...prev, ...data.files];
        });
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
    onDrop,
  });

  const [currentTabs, setCurrentTabs] = useState([
    { name: "File Upload", isActive: true },
    { name: "Library", isActive: false },
  ]);

  useEffect(() => {
    const promise = fetchWithOptions("/api/files", { method: "GET" });
    promise.then(({ data, error }) => {
      if (error) return;

      console.log(data);
      setCurrentFiles(data);
    });
  }, []);

  const { setStore, store } = useContext(StoreContext);

  const [isSelected, setIsSelected] = useState(false);

  const files = acceptedFiles.map((file: FileWithPath) => {
    let icon;
    if (file.type.includes("image")) {
      icon = <img src={imgIcon} alt="File Icon" width={40} height={40} />;
    } else if (file.type.includes("pdf")) {
      icon = <img src={pdfIcon} alt="PDF Icon" width={40} height={40} />;
    } else {
      icon = <img src={docIcon} alt="Document Icon" width={40} height={40} />;
    }

    return (
      <div
        key={file.path}
        className="flex flex-col items-center hover:bg-neutral-400 cursor-pointer rounded-lg p-4 group"
      >
        <div className="opacity-0 flex justify-between items-center w-full group-hover:opacity-100 transition-all duration-200 ease-in-out">
          <div
            className={cn(
              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-secondary text-black",
              isSelected
                ? "bg-primary text-primary-foreground"
                : "opacity-50 [&_svg]:invisible"
            )}
          >
            <CheckIcon color="black" className={cn("h-4 w-4")} />
          </div>
          <Button variant="default" className="flex h-8 w-8 p-0">
            <DotsHorizontalIcon color="white" className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
        {icon}
        <p className="mt-6 text-center text-sm font-medium text-black/80 max-w-[80px] overflow-hidden text-ellipsis">
          {file.path}
        </p>
      </div>
    );
  });

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0">
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-black opacity-50"></div>
      <div className="absolute w-[70vw] h-[70vh] bg-white border-b rounded border-neutral-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="border-b border-neutral-400 py-3 my-3 px-4 flex items-center gap-x-4">
          {currentTabs.map((tab, index) => (
            <h3
              key={index}
              className={cn(
                "cursor-pointer px-2 py-1 rounded-md",
                tab.isActive ? "bg-neutral-200" : ""
              )}
              onClick={() => {
                setCurrentTabs((prev) =>
                  prev.map((tab, i) => ({ ...tab, isActive: i === index }))
                );
              }}
            >
              {tab.name}
            </h3>
          ))}
          <button
            className="ml-auto"
            onClick={() =>
              setStore((prev) => ({ ...prev, filePickerModalIsOpen: false }))
            }
          >
            <CircleX size={24} />
          </button>
        </div>
        {currentTabs[0].isActive ? (
          <div className="transition-all duration-200 ease-in-out">
            <div className="px-4">
              <div
                {...getRootProps({ className: "dropzone" })}
                className={cn(
                  "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                <input {...getInputProps()} />
                <p className="font-medium text-muted-foreground">
                  Drag 'n' drop some files here, or click to select files
                </p>
              </div>
            </div>
            <aside className="my-12 px-4">
              {files.length > 0 && (
                <>
                  <h3 className="mb-2 pb-2 border-b text-white border-neutral-500">
                    Uploaded files
                  </h3>
                  <div className="grid gap-6 grid-cols-6 grid-rows-auto">
                    {files}
                  </div>
                </>
              )}
            </aside>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="border-b border-neutral-300 py-2 pb-4 px-4">
              <Input placeholder="Search files" />
            </div>
            <div className="grid grid-cols-4 grid-rows-auto gap-4 p-4 my-2">
              {currentFiles.length > 0 &&
                currentFiles.map((file: any) => (
                  <div
                    key={file.id}
                    className="flex items-center flex-col justify-between bg-neutral-200 p-4 rounded-lg mb-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-y-2 flex-col">
                      <img
                        src={
                          file.type.includes("image")
                            ? file.url
                            : file.type.includes("pdf")
                            ? pdfIcon
                            : docIcon
                        }
                        alt="Document Icon"
                      />
                    </div>
                    <p className="text-black pt-2 extra-small overflow-hidden text-ellipsis inline-block">
                      {file.title}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
