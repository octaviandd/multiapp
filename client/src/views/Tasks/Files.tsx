/** @format */

import { cn } from "@/utils/helpers/utils";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import docIcon from "@/assets/doc.png";
import pdfIcon from "@/assets/pdf.png";
import imgIcon from "@/assets/img.png";
import { Button } from "@/components/layout/button";
import { CheckIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

export default function Files() {
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

  const [currentFiles, setCurrentFiles] = useState<File[]>([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
    onDrop,
  });
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    fetch("/api/files", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentFiles(data);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, []);

  const deleteFile = (fileId: number) => {
    fetch(`/api/files/delete/${fileId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentFiles(currentFiles.filter((file: any) => file.id !== fileId));
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
      });
  };

  const files = acceptedFiles.map((file: FileWithPath) => {
    let icon;
    if (file.type.includes("image")) {
      icon = <img src={imgIcon} alt="Icon" width={40} height={40} />;
    } else if (file.type.includes("pdf")) {
      icon = <img src={pdfIcon} alt="PDF Icon" width={40} height={40} />;
    } else {
      icon = <img src={docIcon} alt="Document Icon" width={40} height={40} />;
    }

    return (
      <div
        key={file.path}
        className="flex flex-col items-center hover:bg-neutral-700 cursor-pointer rounded-lg p-4 group"
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
        <p className="mt-6 text-center text-sm font-medium text-white/80 max-w-[80px]">
          {file.path}
        </p>
      </div>
    );
  });

  return (
    <section className="w-full px-24 p-6 overflow-y-scroll h-full pb-[200px]">
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
      <aside className="my-12">
        {files.length > 0 && (
          <>
            <h3 className="mb-2 pb-2 border-b text-white border-neutral-500">
              Uploaded files
            </h3>
            <div className="grid gap-6 grid-cols-6 grid-rows-auto">{files}</div>
          </>
        )}
      </aside>
      {currentFiles.length > 0 && (
        <div>
          <h3 className="text-white mb-2 border-b pb-2 border-neutral-500">
            Current files
          </h3>
          {currentFiles.map((file: any) => (
            <div
              key={file.id}
              className="flex items-center justify-between bg-neutral-700 p-4 rounded-lg mb-4"
            >
              <div className="flex items-center">
                <img
                  src={
                    file.type.includes("image")
                      ? file.url
                      : file.type.includes("pdf")
                      ? pdfIcon
                      : docIcon
                  }
                  className="h-16 w-auto object-cover"
                  alt="Document Icon"
                />
                <p className="ml-4 text-white/80">{file.title}</p>
              </div>
              <Button
                className="hover:bg-red-500 transition-bg duration-300 ease-in-out"
                onClick={() => deleteFile(file.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
