import { faXmark } from "@fortawesome/free-solid-svg-icons";
import IconAwesome from "../IconAwesome";

export default function TagFeold({
    tags = [],
    inputTag,
    handleInputChange,
    handleTagInputKey,
    handleCloseTag,
}) {
    return (
        <div className="h-full w-1/2 p-[10px] my-5">
            <p className="text-xl font-bold mb-2">Tag</p>
            <div className="flex w-full flex-wrap gap-5">
                {tags.map((tag, index) => {
                    return (
                        <div
                            className="flex gap-4 justify-between items-center bg-white text-black py-2 px-4 rounded-md border border-green-700 text-sm cursor-pointer transition-all duration-300 transform hover:bg-gray-600 hover:scale-105 active:bg-gray-400"
                            key={index}
                        >
                            <div className="p-1.5 bg-black rounded-full hover:bg-white"></div>
                            <p className="hover:text-white">{tag}</p>
                            <a
                                className="block cursor-pointer hover:text-red-400"
                                onClick={() => {
                                    handleCloseTag(tag);
                                }}
                            >
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
