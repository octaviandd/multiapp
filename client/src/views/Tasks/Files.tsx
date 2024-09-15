/** @format */

import { cn } from "@/utils/helpers/utils";
import React from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import docIcon from "@/assets/doc.png";
import pdfIcon from "@/assets/pdf.png";
import imgIcon from "@/assets/img.png";
import { Button } from "@/components/layout/button";
import { CheckIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

type Props = {};

export default function Files({}: Props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
  });
  const [isSelected, setIsSelected] = React.useState(false);

  const files = acceptedFiles.map((file: FileWithPath) => {
    let icon;
    if (file.type.includes("image")) {
      icon = <img src={imgIcon} alt="Image Icon" width={80} height={80} />;
    } else if (file.type.includes("pdf")) {
      icon = <img src={pdfIcon} alt="PDF Icon" width={80} height={80} />;
    } else {
      icon = <img src={docIcon} alt="Document Icon" width={80} height={80} />;
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
    <section className="container p-6">
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
        <div className="grid gap-6 grid-cols-4 grid-rows-auto">{files}</div>
      </aside>
    </section>
  );
}
