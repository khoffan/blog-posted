import { useEffect, useState } from "react";
import Tag from "./Tag";
import axios from "axios";

export default function Tagbar({ sendTags }) {
    const [tags, setTags] = useState(null);

    const fetchTags = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_API_URI}/api/tags`
            );
            setTags(
                response.data.tags[0].tagname.map((tag) => ({
                    tagname: tag,
                }))
            );
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <>
            {tags != null ? (
                <div className="p-4 flex flex-wrap w-full gap-2 justify-start items-center">
                    <span className="text-xl text-center font-bold">Tag:</span>
                    {tags.map((tag, index) => (
                        <Tag
                            tagName={tag.tagname}
                            key={`tag-${index}`}
                            index={index}
                            sendTags={sendTags}
                        />
                    ))}
                </div>
            ) : (
                <div className="p-4 flex flex-wrap w-full gap-2 justify-start items-center">
                    <span className="text-xl text-center font-bold">Tag:</span>
                </div>
            )}
        </>
    );
}
