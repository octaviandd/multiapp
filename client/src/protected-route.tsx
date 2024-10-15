/** @format */

import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "@/store";

interface Props {
  children: React.ReactNode; // Typing for children prop
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
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
}
