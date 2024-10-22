/** @format */

import React from "react";
import MultipleContainers from "../../components/drag-and-drop/tasks/Board";

export default function Board() {
  return (
    <MultipleContainers
      scrollable={true}
      trashable={true}
      containerStyle={{
        fontSize: "16px",
        lineHeight: "20px",
        backgroundColor: "#252628",
        color: "white",
      }}
    />
  );
}
