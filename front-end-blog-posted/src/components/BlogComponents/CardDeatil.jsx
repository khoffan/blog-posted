import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav";

export default function CardDeatil({ id }) {
	const [blogDeatil, setBlogDetail] = useState({});
	const [hasBlog, setHasBlog] = useState(false);
	useEffect(() => {
		getBlogbyId();
	}, []);

	const getBlogbyId = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_API_URI}/api/blog/${id}`,
				{
					withCredentials: true
				}
			);
			console.log(response.data.blog.author.name);
			setBlogDetail(response.data.blog);
			setHasBlog(true);
		} catch (error) {
			setHasBlog(false);
			console.log(error);
		}
	};
	console.log(blogDeatil); //blogDeatil.author.name blogDeatil.title blogDeatil.description
	return (
		<>
			<Nav />
			{hasBlog ? (
				<div className="flex flex-col justify-center items-center w-full">
					<h1 className="text-3xl text-bold w-1/2">
						Blog of <span className="text-orange-400">{blogDeatil.author.name}</span>
					</h1>
					<div className="p-10 h-full flex flex-col justify-center items-center gap-4 ">
						<div id="user-and-title" className="p-10 max-w-[1000px] w-full h-[100px]">
							<img
								className="inline w-[8opx] rounded-full h-[80px] "
								src={`${import.meta.env.VITE_BASE_API_URI}/${
									blogDeatil.author.image
								}`}
							/>
							<p className=" inline ml-4">Name: {blogDeatil.author.name}</p>
						</div>
						<p className="inline ml-4 text-start  text-bold text-3xl">
							Title: {blogDeatil.title}
						</p>
						<div
							id="tag"
							className="p-10  max-w-[1000px] w-full h-[100px] hidden"
						></div>
						<div id="content" className="p-10  max-w-[1000px] w-full h-[500px]">
							<h1 className="text-3xl text-start">Content</h1>
							<br />
							<p className="text-2xl ">{blogDeatil.description}</p>
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col justify-center items-center w-full">
					<h1 className="text-3xl text-bold w-1/2"></h1>
				</div>
			)}
		</>
	);
}
