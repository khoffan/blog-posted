import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtechRoute({ isAuth, redirectPath = "/", children }) {
  const [isProtect, setIsprotect] = useState(false);
  const protectedRoute = async () => {
    try {
      const res = await axios.get("http://localhost:3001/protected-route", {
        withCredentials: true,
      });
      if (res.data.protect == true) {
        setIsprotect(true);
      } else {
        setIsprotect(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    protectedRoute();
  }, []);

  console.log(isAuth);
  if (isProtect == true) {
    return <Navigate to={redirectPath} />;
  }

  return children;
}
