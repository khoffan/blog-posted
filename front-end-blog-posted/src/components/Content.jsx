import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "./Blog.jsx";
import Footter from "./Footter.jsx";

import Sidebar from "./Sidebar.jsx";

import { useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";

function Home() {
	const [content, setContent] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const navigate = useNavigate();
	//console.log(token);
	useEffect(() => {
		getData();
	}, []);
	const getData = async () => {
		setIsloading(true);
		try {
			const response = await axios.get(`${import.meta.env.VITE_BASE_API_URI}/api/blogs`, {
				withCredentials: true
			});
			//console.log(response.data.blogs);
			if (response.data.blog != undefined) {
				setIsloading(false);
			}
			setContent(response.data.blogs);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			{isLoading == true ? (
				content.length == 0 ? (
					<p className="w-full min-h-screen flex flex-col justify-center items-center text-3xl">
						ไม่มีข้อมูล
					</p>
				) : (
					<Loading />
				)
			) : (
				<div className="min-h-screen mx-auto pt-[20px] min-w-screen">
					<Sidebar />
					{content.map((blog) => (
						<button
							key={blog._id}
							className="w-full h-full pt-[20px]"
							onClick={() => blogDeatil(blog._id)}
						>
							<Blog
								name={blog.author.name}
								title={blog.title}
								content={blog.description}
								creatDate={blog.createdAt}
								imageUrl={blog.author.image}
								isUser={false}
							/>
						</button>
					))}
				</div>
			)}

			<Footter />
		</>
	);
}

export default Home;
