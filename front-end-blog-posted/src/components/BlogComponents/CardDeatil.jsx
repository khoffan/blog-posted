import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Nav from "../Nav";

export default function CardDeatil({ id }) {
	const [blogDeatil, setBlogDetail] = useState({});
	const [hasBlog, setHasBlog] = useState(false);
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);
	const [contents, setContents] = useState("");
	const [authId, setAuthid] = useState("");

	const handleComments = (e) => {
		e.preventDefault();
		if (!comment.trim()) {
			alert("กรุณราใส่ข้อมในช่อง");
			return;
		}

		setComments((prevCommnet) => [...prevCommnet, comment]);
		setComment("");
	};

	const getProfileuser = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_BASE_API_URI}/api/profile`, {
				withCredentials: true
			});
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const getBlogbyId = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_API_URI}/api/blog/${id}`,
				{
					withCredentials: true
				}
			);
			setBlogDetail(response.data.blog);
			console.log(response.data.blog.description);
			let desc = response.data.blog.description;
			console.log(desc);
			setContents(desc);
			setHasBlog(true);
		} catch (error) {
			setHasBlog(false);
			console.log(error);
		}
	};

	//const convertjson2string = (param) => {
	//	const cleanedText = param.replace(/^'|'$/g, "");
	//	let cleanString = cleanedText.replaceAll("\\n", "\n");
	//	let splitString = cleanString.split("\n");
	//	console.log(typeof param);
	//	console.log(splitString);
	//	let content = splitString.join("\n");
	//	setContents(content);
	//};

	const invertTime2Datetime = (isotime) => {
		const date = new Date(isotime);
		let localDate = date.toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
		return localDate;
	};

	//const paragraphs = splitContent(loremText, 15);

	useEffect(() => {
		getBlogbyId();
		getProfileuser();
	}, []);

	//console.log(blogDeatil); //blogDeatil.author.name blogDeatil.title blogDeatil.description
	return (
		<>
			<Nav />
			{hasBlog ? (
				<>
					<div className="relative flex flex-col justify-center items-center w-full h-full border border-1 border-red-500 p-4">
						<div className="flex justify-evenly items-stretch gap-4 w-[75%] h-full mb-2 px-4 border border-1 border-red-500">
							<div className="flex ">
								<img
									src={`${import.meta.env.VITE_BASE_API_URI}/${
										blogDeatil.author.image
									}`}
									width="100"
								/>
								<div className="py-[20px]">
									<p className="text-lg text-bold">{blogDeatil.author.name}</p>
									<p className="text-lg text-bold">{blogDeatil.author.email}</p>
								</div>
							</div>

							<p className="self-end opacity-25">
								created at: {invertTime2Datetime(blogDeatil.createdAt)}
							</p>
						</div>
						<div className="w-[75%] min-h-[200px] mb-2 border border-1 border-red-500">
							<section className="px-4">
								<p className="text-2xl font-bold">{blogDeatil.title}</p>
								<pre>{contents}</pre>
							</section>
						</div>
						<div className="w-[75%] min-h-[200px] mb-2 px-4 border border-1 border-red-500">
							<p className="px-[0.5rem] text-xl mb-[1rem]">Comments</p>
							<form
								onSubmit={handleComments}
								className="px-[2rem] flex gap-[16px] items-center"
							>
								<textarea
									name="text"
									id=""
									placeholder="Please enter message..."
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									className="px-[1.2rem] py-[0.7rem] outline-none resize-none overflow-hidden w-[50%] h-[50px] rounded-full border border-1 border-gray-200 shadow-md shadow-gray-200 focus:border focus:borser2 focus:border-gray-500"
								/>
								<button
									type="submit"
									className="p-[1rem] min-w-[150px] rounded-full bg-red-500 text-white opacity-50  hover:opacity-100 hover:transition-all hover:duration-500"
								>
									Comment
								</button>
							</form>
							<div>
								รายการ comments
								{comments.map((com, index) => (
									<div key={index}>{com}</div>
								))}
							</div>
						</div>
					</div>
				</>
			) : (
				<div className="flex flex-col justify-center items-center w-full">
					<h1 className="text-3xl text-bold w-1/2"></h1>
				</div>
			)}
		</>
	);
}
