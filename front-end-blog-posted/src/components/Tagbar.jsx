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
		"name10",
		"name10",
		"name10",
		"name10"
	];

	return (
		<>
			<div className="p-4 flex flex-wrap w-full gap-2 justify-start items-center">
				<span className="text-xl text-center font-bold">Tag:</span>
				{tagName.map((name, index) => (
					<Tag key={index} tagName={name} />
				))}
			</div>
		</>
	);
}
