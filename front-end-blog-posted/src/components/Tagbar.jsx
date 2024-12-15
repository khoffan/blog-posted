import { useEffect, useState } from "react";
import Tag from "./Tag";
import axios from "axios";

export default function Tagbar() {
    const [tags, setTags] = useState([]);

    const fetchTags = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_API_URI}/api/tags`
            );
            setTags(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <>
            <div className="p-4 flex flex-wrap w-full gap-2 justify-start items-center">
                <span className="text-xl text-center font-bold">Tag:</span>
                {tags.map((tag) => (
                    <Tag key={tag._id} tagName={tag.tagname} />
                ))}
            </div>
        </>
    );
}
