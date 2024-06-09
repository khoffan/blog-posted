import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";

export default function CardDeatil({ id }) {
	const [blogDeatil, setBlogDetail] = useState({});
	//  console.log(id);

	const getBlogbyId = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_BASE_API_URI}/api/blog/${id}`);
			//  console.log(response.data.blog);
			setBlogDetail(response.data.blog);
			console.log(response.status);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getBlogbyId();
	}, []);

	return (
		<>
			<Nav />
			<div className="block w-screen min-h-screen mt-[150px] border-box">
				<div className="p-10 h-full flex flex-col justify-center items-center gap-4 ">
					<div id="user-and-title" className="p-10 max-w-[1000px] w-full h-[100px]">
						<img
							className="inline w-[8opx] rounded-full h-[80px] "
							src={`${import.meta.env.VITE_BASE_API_URI}/${blogDeatil.author.image}`}
						/>
						<p className="inline ml-4 text-bold text-xl">{blogDeatil.title}</p>
						<p className=" inline ml-4">{blogDeatil.author.name}</p>
					</div>
					<div id="tag" className="p-10  max-w-[1000px] w-full h-[100px] hidden"></div>
					<div id="content" className="p-10  max-w-[1000px] w-full h-[500px]">
						{blogDeatil.description}
					</div>
				</div>
			</div>
		</>
	);
}
