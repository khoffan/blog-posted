import React from "react";
import Tag from "./Tag";
export default function Sidebar() {
	return (
		<>
			<div className="flex flex-col gap-4 border border-b-2 border-gray-200 w-[40%]">
				<div className="w-auto h-40 bg-red-400">1</div>
				<div className="w-auto h-40 bg-red-400">2</div>
			</div>
		</>
	);
}
