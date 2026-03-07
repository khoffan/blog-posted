import { useState, useEffect, useMemo } from "react";
import Blog from "./Blog.jsx";
import Sidebar from "../Sidebar.jsx";
import Tagbar from "../Tagbar.jsx";
import { useNavigate } from "react-router-dom";
import useBlogStore from "../../store/useBlogStore.js";

// Custom lightweight skeleton loader
const SkeletonBlock = () => (
	<div className="animate-pulse flex flex-col md:flex-row gap-6 py-8 border-b border-gray-100">
		<div className="flex-1 flex flex-col gap-3">
			<div className="flex items-center gap-2">
				<div className="h-6 w-6 rounded-full bg-gray-200"></div>
				<div className="h-4 w-24 bg-gray-200 rounded"></div>
			</div>
			<div className="h-6 w-3/4 bg-gray-200 rounded mt-2"></div>
			<div className="h-4 w-full bg-gray-200 rounded"></div>
			<div className="h-4 w-5/6 bg-gray-200 rounded"></div>
		</div>
		<div className="w-full md:w-[160px] h-[100px] bg-gray-200 rounded-sm"></div>
	</div>
);

function Content() {
	const { blogs, isLoading, fetchBlogs, selectedTags, searchQuery } = useBlogStore();
	const [localLoading, setLocalLoading] = useState(false);
	const navigate = useNavigate();

	const handleTagsChild = (data, selected) => {
		const { addSelectedTag, removeSelectedTag } = useBlogStore.getState();
		if (!selected) {
			removeSelectedTag(data);
		} else {
			addSelectedTag(data);
		}
	};

	const getData = async () => {
		setLocalLoading(true);
		await fetchBlogs(searchQuery);
		setTimeout(() => setLocalLoading(false), 500);
	};

	const blogDetail = (id) => {
		navigate(`/blog/detail/${id}`);
	};

	const filteredContent = useMemo(() => {
		if (!selectedTags || selectedTags.length === 0) return blogs;
		return blogs?.filter((blog) => {
			return blog.tag?.some((t) => selectedTags.includes(t.tagname));
		});
	}, [blogs, selectedTags]);

	useEffect(() => {
		getData();
	}, [searchQuery]);

	const showLoading = isLoading || localLoading;

	return (
		<div className="flex flex-col lg:flex-row gap-12 w-full">
			{/* Main Feed */}
			<div className="flex-1 w-full lg:max-w-[680px]">
				
				<div className="pb-6 border-b border-gray-100 sticky top-16 bg-white z-10 pt-4 hidden sm:block">
					<Tagbar sendTags={handleTagsChild} />
				</div>

				{showLoading ? (
					<div className="flex flex-col mt-4">
						<SkeletonBlock />
						<SkeletonBlock />
						<SkeletonBlock />
					</div>
				) : filteredContent?.length > 0 ? (
					<div className="flex flex-col divide-y divide-gray-100">
						{filteredContent.map((blog) => (
							<button
								key={blog._id}
								className="w-full text-left group hover:bg-gray-50 transition-colors -mx-4 px-4 rounded-xl"
								onClick={() => blogDetail(blog._id)}
							>
								<Blog
									index={blog._id}
									name={blog.author.name}
									title={blog.title}
									content={blog.description || "No preview available for this story. Click to read more..."}
									creatDate={blog.createdAt}
									imageUrl={blog.author.image}
									tags={blog.tag}
									isUser={false}
									thumbnail={blog.blog_image?.[0]?.image_path}
								/>
							</button>
						))}
					</div>
				) : (
					<div className="py-20 text-center">
						<p className="text-gray-500 text-lg font-serif">We couldn't find any stories matching your search.</p>
					</div>
				)}
			</div>

			{/* Sidebar Component placed on the right */}
			<div className="hidden lg:block w-[320px] sticky top-24 h-fit border-l border-gray-100 pl-10">
				<Sidebar />
			</div>
		</div>
	);
}

export default Content;
