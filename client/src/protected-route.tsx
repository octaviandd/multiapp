/** @format */

import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode; // Typing for children prop
}

export default function ProtectedRoute({
  children,
}: Props): JSX.Element | null {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // `null` for initial state
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    setLoading(true); // Start loading
    fetch("/api/auth/check-auth", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure credentials like cookies are included
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.authenticated); // Update auth state
        setLoading(false); // Stop loading
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
