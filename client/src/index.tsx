/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Root from "./Application/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Errors from "./Application/Errors";
import Home from "./Application/Home";
import Tasks from "./Application/Tasks";
import Inbox from "./Application/Inbox";
import FinanceManager from "./Application/Finance/Manager";
import FinanceManagerReview from "./Application/Finance/ManagerReview";
import FinanceManagerTransactions from "./Application/Finance/ManagerTransactions";
import List from "./Application/Tasks/components/List";
import Board from "./Application/Tasks/components/Board";
import Files from "./Application/Tasks/components/Files";
import Calendar from "./Application/Tasks/components/Calendar";
import { LoginForm } from "./Auth/Login";
import { RegisterForm } from "./Auth/Register";
import { StoreProvider } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Errors />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
        children: [
          {
            path: "/tasks/list",
            element: <List />,
          },
          {
            path: "/tasks/board",
            element: <Board />,
          },
          {
            path: "/tasks/calendar",
            element: <Calendar />,
          },
          {
            path: "/tasks/files",
            element: <Files />,
          },
        ],
      },
      {
        path: "/inbox",
        element: <Inbox />,
      },
      {
        path: "/finance",
        element: <FinanceManager />,
        children: [
          {
            path: "/finance/review",
            element: <FinanceManagerReview />,
          },
          {
            path: "/finance/transactions",
            element: <FinanceManagerTransactions />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
]);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={router}></RouterProvider>
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
