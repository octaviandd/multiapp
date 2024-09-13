/** @format */

import React from "react";
import { DataTable } from "../../shared/tables/data-table";
import { columns } from "../../shared/tables/columns";
import data from "../../shared/tables/tasks.json";

type Props = {};

export default function List({}: Props) {
  return <DataTable columns={columns} data={data} />;
}
