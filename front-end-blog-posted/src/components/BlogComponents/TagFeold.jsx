import { faXmark } from "@fortawesome/free-solid-svg-icons";
import IconAwesome from "../IconAwesome";

export default function TagFeold({
    tags = [],
    inputTag,
    handleInputChange,
    handleTagInputKey,
}) {
    return (
        <div className="border border-2 border-red-500 w-1/2 p-[10px]">
            <p className="text-xl font-bold mb-2">Tag</p>
            <div className="flex w-full flex-wrap gap-5">
                {tags.map((tag, index) => {
                    return (
                        <div
                            className="flex w-24 justify-between items-center bg-green-500 text-white py-2 px-4 rounded-md border border-green-700 text-sm cursor-pointer transition-all duration-300 transform hover:bg-green-600 hover:scale-105 active:bg-green-800"
                            key={index}
                        >
                            <span className="">{tag}</span>
                            <a className="block cursor-pointer hover:text-red-400 ">
                                <IconAwesome iconName={faXmark} />
                            </a>
                        </div>
                    );
                })}
            </div>
            <input
                type="text"
                name="tag-input"
                id="tag-input"
                placeholder="Add Tag"
                value={inputTag}
                onChange={(e) => handleInputChange(e)}
                onKeyDown={(e) => handleTagInputKey(e)}
                className="block m-[10px] p-[10px] rounded-md focus:outline-1 focus:outline-gray-300"
            />
        </div>
    );
}
