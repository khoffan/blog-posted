import React from "react";
import Tag from "./Tag";

export default function Tagbar() {
	const tagName = [
		"name1",
		"name2",
		"name3",
		"name4",
		"name5",
		"name6",
		"name7",
		"name8",
		"name9",
		"name10"
	];

	return (
		<>
			<div className="inline h-[100px] col-span-1 col-start-2 row-span-1 border border-black grid grid-cols-6">
				<span className="block text-center">Tag:</span>
				{tagName.map((name, index) => (
					<Tag key={index} tagName={name} />
				))}
			</div>
		</>
	);
}
