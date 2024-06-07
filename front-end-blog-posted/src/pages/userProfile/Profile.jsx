import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DetailProfile from "../../components/profileComponents/DetailProfile";

export default function Profile() {
	const location = useLocation();
	const { user } = location.state || {};

	return (
		<>
			<DetailProfile userObj={user} />
		</>
	);
}
