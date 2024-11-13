import React from "react";

export default function Tag({ tagName }) {
	return (
		<>
			<span className="mx-auto inline w-[100px] text-center shadow rounded-md">
				{tagName}
			</span>
		</>
	);
}
