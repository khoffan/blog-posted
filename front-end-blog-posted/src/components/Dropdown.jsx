import { Button } from "@mui/material";
import React from "react";

export default function Dropdown({ navProfile, logoutevent }) {
	return (
		<>
			<div
				id="dropdown"
				className="fixed  inline right-[0px] top-[70px] mt-2 w-48 bg-white shadow-lg rounded-md z-100"
			>
				<ul className="py-1">
					<li>
						<button
							className="block px-4 py-2 w-full text-gray-800 hover:bg-gray-100"
							onClick={navProfile}
						>
							Profile
						</button>
					</li>

					<li>
						<button
							className="block px-4 py-2 w-full text-gray-800 hover:bg-gray-100"
							onClick={logoutevent}
						>
							Logout
						</button>
					</li>
				</ul>
			</div>
		</>
	);
}
