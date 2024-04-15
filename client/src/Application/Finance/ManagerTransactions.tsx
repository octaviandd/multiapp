/** @format */

import React from "react";
import { columns } from "../Tables/columns";
import data from "../Tables/tasks.json";
import { DataTable } from "../Tables/data-table";

type Props = {};

export default function FinanceManagerTransactions({}: Props) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
