import React from "react";

export default function Tag({ tagName }) {
	return (
		<>
			<span className="p-1 mx-auto inline  w-[100px] text-center border border-none hover:border border-red-400 hover:border-red-600 hover:bg-slate-700 hover:text-white shadow rounded-md cursor-pointer">
				{tagName}
			</span>
		</>
	);
}
