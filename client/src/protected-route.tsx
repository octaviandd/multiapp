/** @format */

import React, { useEffect, useState, ReactNode } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({
  children,
}: Props): JSX.Element | null {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);

  useEffect(() => {
    fetch("/api/auth/check-auth", {
      headers: {
        "Content-Type": "application/json",
        type: "GET",
        credentials: "include",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.authenticated);
      })
      .catch((error) => {
        setIsAuthenticated(false);
      });
  });

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (!isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return <Navigate to="/login" />;
}
