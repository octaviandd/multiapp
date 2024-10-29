/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./global-styles/index.scss";
import Root from "./Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Errors from "./views/Error/ErrorPage";
import Home from "./views/Home/Home";
import Tasks from "./views/Tasks/TasksNavigvation";
import Board from "./views/Tasks/Board";
import Files from "./views/Tasks/Files";
import { LoginForm } from "./views/Login/LoginPage";
import { RegisterForm } from "./views/Register/RegisterPage";
import { StoreProvider } from "./store/index";
import ProtectedRoute from "./protected-route";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    errorElement: <Errors />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
        children: [
          {
            path: "/tasks/board",
            element: <Board />,
          },
          {
            path: "/tasks/files",
            element: <Files />,
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
