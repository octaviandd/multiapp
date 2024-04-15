/** @format */

import React from "react";
import MultipleContainers from "../../../shared/drag-and-drop/Board";

type Props = {};

export default function Board({}: Props) {
  return (
    <MultipleContainers
      containerStyle={{
        fontSize: "16px",
        lineHeight: "20px",
        backgroundColor: "#252628",
        color: "white",
      }}
    />
  );
}
