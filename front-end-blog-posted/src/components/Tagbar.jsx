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
			<div className="col-start-2 col-span-4 items-start max-h-[100px]  inline">
				<div className="grid grid-cols-6 col-span-1">
					<span className="inline text-center">Tag:</span>
					{tagName.map((name, index) => (
						<Tag key={index} tagName={name} />
					))}
				</div>
			</div>
		</>
	);
}
