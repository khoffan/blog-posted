import { useState } from "react";

export default function Tag({ tagName, index, sendTags }) {
    const [isSelected, setIsSelected] = useState(false);

    const toggleSelect = (e) => {
        const newSelected = !isSelected;
        setIsSelected(newSelected);
        // ใช้ value จาก input
        sendTags(e.target.value, newSelected);
    };

    return (
        <input
            type="button"
            onClick={toggleSelect}
            data-index={index}
            value={tagName}
            readOnly
            className={`cursor-pointer px-4 py-2 rounded-full border transition-all 
            ${
                isSelected
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-blue-500 border-blue-500"
            }`}
        />
    );
}
