/** @format */

import React, { useContext, useState } from "react";
import Sidebar from "./components/layout/navigation";
import Header from "./components/layout/header";
import { Outlet } from "react-router-dom";
import { StoreContext } from "@/store/index";

type Props = {};

export default function Root({}: Props) {
  const { store, setStore } = useContext(StoreContext);

  const setDisplaySidebar = (value: boolean) => {
    setStore({
      ...store,
      displaySidebar: value,
    });
  };

  fetch("/api", {
    headers: {
      "Content-Type": "application/json",
      type: "GET",
    },
  }).then((res) => {
    console.log(res);
  });

  return (
    <div className="overflow-hidden h-screen flex flex-col">
      <Header
        displaySidebar={store.displaySidebar}
        setDisplaySidebar={() => setDisplaySidebar(!store.displaySidebar)}
      />
      <div className="relative h-full flex">
        <Sidebar
          displaySidebar={store.displaySidebar}
          setDisplaySidebar={() => setDisplaySidebar(!store.displaySidebar)}
        />
        <div
          style={{
            width: store.displaySidebar ? "calc(100% - 240px)" : "100%",
          }}
          className="transition-all ease-in-out duration-300"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
