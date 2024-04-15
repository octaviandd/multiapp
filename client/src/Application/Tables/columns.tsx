/** @format */

"use client";
import React from "react";
import { ColumnDef, RowData, CellContext } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";

import { labels, categories } from "./data";
import { Task } from "./schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export const useSkipper = () => {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
};

function CategoryCell<TData extends RowData, TValue>({
  row,
  column: { id },
  table,
  getValue,
}: CellContext<TData, TValue>) {
  const category = categories.find(
    (category) => category.value === row.getValue("category")
  );

  if (!category) {
    return null;
  }

  // React.useEffect(() => {
  //   setValue(initialValue);
  // }, [initialValue]);

  return (
    <div className="flex space-x-2">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((category) => (
              <SelectItem value={category.value}>
                <div className="flex items-center">
                  {category.icon && (
                    <category.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  )}{" "}
                  {category.label}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function TitleCell<TData extends RowData, TValue>({
  row,
  column: { id },
  table,
  getValue,
}: CellContext<TData, TValue>) {
  const initialValue = getValue();
  const [value, setValue] = React.useState(initialValue);
  const label = labels.find(
    (label) => label.value === (row.original as any).label
  );

  const onBlur = () => {
    table.options.meta?.updateData(row.index, id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="flex space-x-2">
      {label && <Badge variant="outline">{label.label}</Badge>}
      <span className="max-w-[500px] w-full">
        <input
          className="max-w-[500px] truncate font-medium w-full"
          value={value as string}
          onChange={(e) => setValue(e.target.value as TValue)}
          onBlur={onBlur}
        />
      </span>
    </div>
  );
}

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: TitleCell,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>£ {row.getValue("price")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: CategoryCell,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
