/** @format */

import React from "react";
import { columns } from "../../components/tables/columns";
import data from "../../components/tables/tasks.json";
import { DataTable } from "../../components/tables/data-table";

type Props = {};

export default function FinanceManagerTransactions({}: Props) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
