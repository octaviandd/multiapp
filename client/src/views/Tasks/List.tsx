/** @format */

import React from "react";
import { DataTable } from "../../components/tables/data-table";
import { columns } from "../../components/tables/columns";
import data from "../../components/tables/tasks.json";

export default function List() {
  return <DataTable columns={columns} data={data} />;
}
