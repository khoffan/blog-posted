import { Button } from "@mui/material";
import React from "react";

function LiComponent({ navTraffic, name }) {
	return (
		<li className="mb-2 border border-1 border-gray-200">
			<button
				className="block px-4 py-2 w-full text-gray-800 hover:bg-gray-100"
				onClick={() => navTraffic()}
			>
				{name}
			</button>
		</li>
	);
}

export default function Dropdown({ navProfile, logoutevent, yourBlog, userData }) {
	return (
		<>
			<div
				id="dropdown"
				className="absolute inline right-[-20px] bg-white top-[70px] mt-2 w-[300px] h-[400px] border border-2 border-gray-300 rounded-md z-100"
			>
				<div>
					<img src="" alt="" />
				</div>
				<ul className="py-1">
					<LiComponent navTraffic={navProfile} name={"Profile"} />
					<LiComponent navTraffic={logoutevent} name={"Log Out"} />
					<LiComponent navTraffic={yourBlog} name={"Your Blog"} />
				</ul>
			</div>
		</>
	);
}
