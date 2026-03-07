import { useEffect } from "react";
import Tag from "./Tag";
import useBlogStore from "../store/useBlogStore";

export default function Tagbar({ sendTags }) {
	const { allTags, fetchAllTags } = useBlogStore();

	useEffect(() => {
		fetchAllTags();
	}, []);

	if (!allTags || allTags.length === 0) return null;

	return (
		<div className="w-full">
			<div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
				{/* The plus icon could go here for "Add Topic" */}
				<div className="flex gap-2">
					{allTags.map((tag, index) => (
						<Tag
							tagName={tag.tagname}
							key={`tag-${index}`}
							index={index}
							sendTags={sendTags}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
