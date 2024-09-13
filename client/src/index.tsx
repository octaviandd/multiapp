/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Root from "./Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Errors from "./views/Error/ErrorPage";
import Home from "./views/Home/Home";
import Tasks from "./views/Tasks/TasksNavigvation";
import FinanceManager from "./views/Finance/Manager";
import FinanceManagerReview from "./views/Finance/ManagerReview";
import FinanceManagerTransactions from "./views/Finance/ManagerTransactions";
import List from "./views/Tasks/List";
import Board from "./views/Tasks/Board";
import Files from "./views/Tasks/Files";
import Calendar from "./views/Tasks/Calendar";
import { LoginForm } from "./views/Login/LoginPage";
import { RegisterForm } from "./views/Register/RegisterPage";
import { StoreProvider } from "./store/index";

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
