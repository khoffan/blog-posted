import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function ProtechRoute({ redirectPath = "/", children }) {
	const location = useLocation();

	const currentPath = location.pathname;

	const [isProtect, setIsprotect] = useState(null);

	const checkToken = () => {
		const token = Cookies.get("token");
		console.log("token", typeof token);
		if (token == null) {
			setIsprotect(false);
		} else {
			setIsprotect(true);
		}
	};

	useEffect(() => {
		checkToken();
	});

	if (isProtect) {
		return <Navigate to={redirectPath} />;
	}

	return children;
}
