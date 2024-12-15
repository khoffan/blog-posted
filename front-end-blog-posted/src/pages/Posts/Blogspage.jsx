import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import Blog from "../../components/BlogComponents/Blog";
import Nav from "../../components/NavbarComponents/Nav";
import Footter from "../../components/Footter";
import Loading from "../../components/Loading";

export default function Blogspage() {
	const { id } = useParams();

	const [blogs, setBlogs] = useState([]);
	const [checkData, setCheckData] = useState(false);
	useEffect(() => {
		getBlogs();
	}, []);
	const getBlogs = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_API_URI}/api/blogs/${id}`
			);

			const blog = response.data.message;
			if (response.status === 200) {
				setTimeout(() => {
					setCheckData(true);
					setBlogs(blog);
				}, 1000);
			} else {
				setCheckData(false);
			}
		} catch (error) {
			console.log(error);
		}
	};
	console.log(blogs);
	return (
		<>
			<Nav />
			{checkData ? (
				<div className="pt-[100px] min-w-screen min-h-full mb-[50px]">
					<p className="text-3xl text-center text-black">Blog Posts</p>
					{blogs.map((blog) => (
						<>
							<li key={blog._id} className="w-full h-full">
								<Blog
									index={blog._id}
									name={blog.author.name}
									title={blog.title}
									content={blog.description}
									creatDate={blog.createdAt}
									imageUrl={blog.author.image}
									isUser={true}
								/>
							</li>
						</>
					))}
				</div>
			) : (
				<div>
					<Loading />
				</div>
			)}
			<Footter />
		</>
	);
}
