import { useState, useEffect } from "react";
import axios from "axios";
import Blog from "./Blog.jsx";

import Sidebar from "../Sidebar.jsx";
import Tagbar from "../Tagbar.jsx";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading.jsx";

function Home({ search }) {
	const [content, setContent] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [tags, setTags] = useState([]);
	const navigate = useNavigate();
	//console.log(token);

	const handleTagsChild = (data, selected) => {
		if (!selected) {
			setTags((prev) => {
				// ลบ tag ที่ตรงกับค่าที่ส่งมา
				return prev.filter((tag) => tag !== data);
			});
		} else {
			setTags((prev) => {
				// ตรวจสอบว่ามี tag นี้อยู่แล้วหรือไม่
				return prev.includes(data) ? prev : [...prev, data];
			});
		}
	};

	const getData = async () => {
		setIsloading(true);
		try {
			const response = await axios.get(`${import.meta.env.VITE_BASE_API_URI}/api/blogs`, {
				params: {
					search: search
				},
				withCredentials: true
			});
			if (response.data.blog != undefined) {
				setIsloading(false);
			}
			setContent(response.data.blogs);
		} catch (error) {
			console.log(error);
		} finally {
			setTimeout(() => {
				setIsloading(false);
			}, 1000);
		}
	};

	console.log(tags);

	const blogDeatil = (id) => {
		navigate(`/blog/deatil/${id}`);
		return false;
	};

	useEffect(() => {
		getData();
	}, [search]);

	return (
		<>
			{isLoading == false ? (
				<>
					<div className="flex flex-row w-full h-full gap-2 justify-center ">
						<div className="w-full px-8 overflow-auto h-full md: px-8 w-full overflow-auto h-screen">
							{content.length > 0 ? (
								<>
									<Tagbar sendTags={handleTagsChild} />
									{content.map((blog) => {
										return (
											<>
												<button
													key={blog._id}
													className="w-full md:w-3/4 block p-2 mx-auto max-w-[830px]"
													onClick={() => blogDeatil(blog._id)}
												>
													<Blog
														name={blog.author.name}
														title={blog.title}
														creatDate={blog.createdAt}
														imageUrl={blog.author.image}
														tags={blog.tag}
														isUser={false}
													/>
												</button>
											</>
										);
									})}
								</>
							) : (
								<div className="w-full h-full flex flex-col justify-center items-center">
									<div className="text-2xl">No Blog Found</div>
								</div>
							)}
						</div>
						<Sidebar />
					</div>
				</>
			) : (
				<Loading />
			)}
		</>
	);
}

export default Home;
