import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  allowedRole: string;
}

export default function ProtectedRoute({
  children,
  allowedRole,
}: Props) {

  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/" />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}