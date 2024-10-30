/** @format */

import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "@/store";
import { Spinner } from "./components/layout/spinner";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props): JSX.Element | null {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { store, setStore } = useContext(StoreContext);

  useEffect(() => {
    setLoading(true);
    fetch("/api/auth/check-auth", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.authenticated);
        setLoading(false);
        if (data.authenticated) {
          setStore({ ...store, user: data.user });
        }
      })
      .catch((error) => {
        console.error("Error fetching auth status:", error);
        setIsAuthenticated(false);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner size="large" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Navigate to="/register" />;
}
