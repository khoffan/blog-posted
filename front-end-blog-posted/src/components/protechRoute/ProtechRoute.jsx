import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtechRoute({ isAuth, redirectPath = "/", children }) {
  if (isAuth) {
    return <Navigate to={redirectPath} />;
  }

  return children;
}
