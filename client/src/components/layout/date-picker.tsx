/** @format */

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/utils/helpers/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import dayjs from "dayjs";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: any) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  const onHandleDate = (date: any) => {
    setDate(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            " justify-start text-left font-normal bg-[#1E1F21] border border-[#3A3B3C] text-[#9CA3AF] hover:bg-[#3A3B3C] hover:border-[#3A3B3C] hover:text-white",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>No due date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => onHandleDate(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
