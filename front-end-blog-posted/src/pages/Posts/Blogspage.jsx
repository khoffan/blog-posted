import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "../../components/BlogComponents/Blog";
import Nav from "../../components/Nav";
import Footter from "../../components/Footter";
import Loading from "../../components/Loading";

export default function Blogspage() {
	const [blogs, setBlogs] = useState([]);
	const [checkData, setCheckData] = useState(false);
	useEffect(() => {
		getBlogs();
	}, []);
	const getBlogs = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_BASE_API_URI}/api/blogs/`);

			if (response.status === 200) {
				setTimeout(() => {
					setCheckData(true);
					setBlogs(response.data.blogs);
				}, 1000);
			} else {
				setCheckData(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Nav />
			{checkData == true ? (
				<>
					<div className="pt-[100px] min-w-screen min-h-full mb-[50px]">
						<p className="text-3xl text-center text-black">Blog Posts</p>
						{blogs.map((blog) => (
							<>
								<button key={blog._id} className="w-full h-full">
									<Blog
										name={blog.author.name}
										title={blog.title}
										content={blog.description}
										creatDate={blog.createdAt}
										imageUrl={blog.author.image}
										isUser={true}
									/>
								</button>
							</>
						))}
					</div>
				</>
			) : (
				<div>
					<Loading />
				</div>
			)}
			<Footter />
		</>
	);
}
