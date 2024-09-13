/** @format */

import React from "react";
import { columns } from "../../shared/tables/columns";
import data from "../../shared/tables/tasks.json";
import { DataTable } from "../../shared/tables/data-table";

type Props = {};

export default function FinanceManagerTransactions({}: Props) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
