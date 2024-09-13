/** @format */
// @ts-nocheck
import React, { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/layout/command";
import { Input } from "@/components/layout/input";

type Props = {};

export default function Searchbar({}: Props) {
  const [open, setOpen] = useState(false);

  const onOpenChange = () => setOpen(!open);

  return (
    <>
      <div>
        <Input
          placeholder="Search..."
          onClick={() => setOpen(true)}
          className="py-2 h-8 text-xs"
        />
      </div>
      <CommandDialog open={open} onOpenChange={onOpenChange}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
