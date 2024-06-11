import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "./Blog.jsx";
import Footter from "./Footter.jsx";

import Sidebar from "./Sidebar.jsx";
import Tagbar from "./Tagbar.jsx";
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
		} finally {
			setTimeout(() => {
				setIsloading(false);
			}, 1000);
		}
	};

	return (
		<>
			{isLoading == false ? (
				<>
					<div className="min-h-screen mx-auto my-[100px] pt-[20px] min-w-screen">
						<div className="grid grid-rows-4 grid-flow-cols gap-4">
							<Sidebar />
							<Tagbar />
							<div className="col-start-2 col-end-2 row-span-2 col-span-1 ">
								{content.map((blog) => (
									<>
										<button
											key={blog._id}
											className="w-full"
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
									</>
								))}
							</div>
							<div className="h-full w-full col-span-4"></div>
						</div>
					</div>
				</>
			) : (
				<Loading />
			)}

			<Footter />
		</>
	);
}

export default Home;
