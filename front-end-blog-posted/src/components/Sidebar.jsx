import React from "react";
import Tag from "./Tag";
export default function Sidebar({ colSpan, colStart, colEnd }) {
	return (
		<>
			<div className="row-end-1 row-start-4 row-span-1 col-span-1 h-full max-w-[300px] h-full border border-black">
				<h1 className="text-3xl text-center ml-[20px] ">Blogs</h1>
			</div>
		</>
	);
}
