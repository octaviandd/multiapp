/** @format */

import React from "react";
import { DataTable } from "../../components/tables/data-table";
import { columns } from "../../components/tables/columns";
import data from "../../components/tables/tasks.json";

type Props = {};

export default function List({}: Props) {
  return <DataTable columns={columns} data={data} />;
}
