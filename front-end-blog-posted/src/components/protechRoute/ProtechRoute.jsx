import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtechRoute({ isAuth, redirectPath = "/", children }) {
  console.log(isAuth);
  if (isAuth == true) {
    return <Navigate to={redirectPath} />;
  }

  return children;
}
