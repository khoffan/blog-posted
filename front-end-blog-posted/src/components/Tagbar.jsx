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
			<div className="flex flex-rows justify-center border border-2 border-red-400">
				{tagName.map((name, index) => (
					<Tag key={index} tagName={name} />
				))}
			</div>
		</>
	);
}
