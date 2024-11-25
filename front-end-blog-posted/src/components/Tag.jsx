import React, { useState } from "react";

export default function Tag({ tagName }) {
	const [isSelected, setIsSelected] = useState(false);

	const toggleSelect = () => {
		setIsSelected(!isSelected); // เปลี่ยนสถานะเมื่อคลิก
	};

	return (
		<span
			onClick={toggleSelect}
			className={`cursor-pointer px-4 py-2 rounded-full border transition-all 
        ${
			isSelected
				? "bg-blue-500 text-white border-blue-500"
				: "bg-white text-blue-500 border-blue-500"
		}`}
		>
			{tagName}
		</span>
	);
}
