import { useState, useEffect, useMemo } from "react";
import Blog from "./Blog.jsx";
import Sidebar from "../Sidebar.jsx";
import Tagbar from "../Tagbar.jsx";
import { useNavigate } from "react-router-dom";
import useBlogStore from "../../store/useBlogStore.js";

// Custom lightweight skeleton loader matching the grid card format
const SkeletonBlock = () => (
	<div className="animate-pulse flex flex-col h-full w-full border border-gray-100 rounded-xl overflow-hidden shadow-sm">
		{/* Thumbnail Area */}
		<div className="w-full aspect-video md:aspect-[4/3] bg-gray-200"></div>
		
		{/* Content Area */}
		<div className="flex-1 flex flex-col p-4 md:p-5 h-full w-full">
			<div className="flex items-center gap-2 mb-3">
				<div className="h-6 w-6 rounded-full bg-gray-200"></div>
				<div className="h-4 w-24 bg-gray-200 rounded"></div>
			</div>
			<div className="h-6 w-3/4 bg-gray-200 rounded mt-2"></div>
			<div className="h-4 w-full bg-gray-200 rounded mt-4"></div>
			<div className="h-4 w-5/6 bg-gray-200 rounded mt-2"></div>
			<div className="mt-auto pt-4 flex gap-2">
				<div className="h-3 w-16 bg-gray-200 rounded"></div>
			</div>
		</div>
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
		<div className="flex flex-col xl:flex-row gap-12 w-full">
			{/* Main Feed */}
			<div className="flex-1 w-full">
				
				<div className="pb-6 border-b border-gray-100 sticky top-16 bg-white z-10 pt-4 hidden sm:block">
					<Tagbar sendTags={handleTagsChild} />
				</div>

				{showLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-4">
						<SkeletonBlock />
						<SkeletonBlock />
						<SkeletonBlock />
					</div>
				) : filteredContent?.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 list-none mt-4">
						{filteredContent.map((blog) => (
							<div
								key={blog._id}
								className="w-full text-left group hover:bg-gray-50 transition-colors border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer flex flex-col h-full"
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
							</div>
						))}
					</div>
				) : (
					<div className="py-20 text-center">
						<p className="text-gray-500 text-lg font-serif">We couldn't find any stories matching your search.</p>
					</div>
				)}
			</div>

			{/* Sidebar Component placed on the right */}
			<div className="hidden xl:block w-[320px] sticky top-24 h-fit border-l border-gray-100 pl-10 shrink-0">
				<Sidebar />
			</div>
		</div>
	);
}

export default Content;
