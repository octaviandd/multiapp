/** @format */

import React from "react";
import { DataTable } from "../../Tables/data-table";
import { columns } from "../../Tables/columns";
import data from "../../Tables/tasks.json";

type Props = {};

export default function List({}: Props) {
  return <DataTable columns={columns} data={data} />;
}
