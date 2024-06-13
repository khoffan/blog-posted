import React from "react";
import Tag from "./Tag";
export default function Sidebar({ colSpan, colStart, colEnd }) {
	return (
		<>
			<div className="col-start-1 col-span-1 row-start-1 row-end-5 h-full max-w-[300px] h-full">
				<h1 className="text-3xl text-center ml-[20px] ">Blogs</h1>
				<ul>
					<li>item1</li>
					<li>item2</li>
					<li>item3</li>
					<li>item4</li>
					<li>item5</li>
					<li>item6</li>
					<li>item7</li>
					<li>item8</li>
					<li>item9</li>
					<li>item10</li>
				</ul>
			</div>
		</>
	);
}
