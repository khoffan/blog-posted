import React from "react";
import Tag from "./Tag";
export default function Sidebar() {
	return (
		<>
			<div className="flex flex-2 flex-col gap-4 w-[40%]">
				<div className="w-auto h-40">Recommended Topics</div>
				<div className="w-auto h-40">Who to Follow</div>
			</div>
		</>
	);
}
