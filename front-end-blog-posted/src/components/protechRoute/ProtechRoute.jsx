import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function ProtechRoute({ redirectPath = "/", children }) {
	const location = useLocation();

	const currentPath = location.pathname;

	const [isProtect, setIsprotect] = useState(false);
	const protectedRoute = async () => {
		try {
			const res = await axios.get("http://localhost:3001/protected-route", {
				withCredentials: true
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

	if (isProtect == false && currentPath == "/home/:id") {
		return <Navigate to={redirectPath} />;
	}

	return children;
}
