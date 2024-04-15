/** @format */

import React, { useContext, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { StoreContext } from "@/store";

type Props = {};

export default function Root({}: Props) {
  const { store, setStore } = useContext(StoreContext);

  const setDisplaySidebar = (value: boolean) => {
    setStore({
      ...store,
      displaySidebar: value,
    });
  };

  return (
    <div className="overflow-hidden">
      <Header
        displaySidebar={store.displaySidebar}
        setDisplaySidebar={() => setDisplaySidebar(!store.displaySidebar)}
      />
      <div className="relative h-full flex">
        <Sidebar
          displaySidebar={store.displaySidebar}
          setDisplaySidebar={() => setDisplaySidebar(!store.displaySidebar)}
        />
        <div className={`w-full transition-all ease-in-out duration-300 `}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
