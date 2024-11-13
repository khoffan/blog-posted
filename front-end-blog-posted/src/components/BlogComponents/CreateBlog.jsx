import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Nav from "../Nav";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateBlog({ id }) {
	const [paragraphs, setParagraphs] = useState([]);
	const [activeIndex, setActiveIndex] = useState(null);
	const [isCreateBlog, setIscreateBlog] = useState(false);
	const paragraphRef = useRef([]);
	const titleRef = useRef(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [author, setAuthor] = useState({
		name: "",
		email: "",
		image: ""
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (paragraphs.length === 0) {
			setParagraphs(["", ""]);
		}
		fetchProfile();
		setIscreateBlog(true);
	}, []);

	const fetchProfile = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_API_URI}/api/profile/${id}`
			);
			const autherRes = response.data.profile;
			//console.log(response.data.profile);
			setAuthor({
				name: autherRes.first_name + " " + autherRes.last_name,
				email: autherRes.email,
				image: autherRes.image_path
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleKeydown = (event, index) => {
		if (event.key === "Enter") {
			event.preventDefault();

			const newParagraphs = [...paragraphs];
			newParagraphs.push(""); // เพิ่ม textarea ใหม่เป็นค่าพื้นฐาน (ข้อความว่าง)
			setParagraphs(newParagraphs);

			setTimeout(() => {
				if (paragraphRef.current[newParagraphs.length - 1]) {
					paragraphRef.current[newParagraphs.length - 1].focus();
				}
			}, 0);
		}
		if (event.key === "Backspace" && paragraphs[index] === "") {
			if (paragraphs.length > 1) {
				const newParagraphs = [...paragraphs];
				newParagraphs.splice(index, 1); // ลบ textarea ที่ตำแหน่งนี้
				setParagraphs(newParagraphs);

				setTimeout(() => {
					paragraphRef.current[index - 1]?.focus();
				}, 0);
			}
		}
	};

	const handleContent = (event, index) => {
		const newparagraphs = [...paragraphs];
		newparagraphs[index] = event.target.value;
		setParagraphs(newparagraphs);
		console.log(newparagraphs);
	};

	const handleChangtitle = (event) => {
		const newTitle = event.target.value;
		setTitle(newTitle);
		console.log(typeof newTitle);
	};
	//const handleChangeDescription = (event) => {
	//	setDescription(event.target.value);
	//};
	const handleFocus = (index) => {
		setActiveIndex(index);
		// เมื่อมีการโฟกัสที่ <p> จะตรวจสอบตำแหน่งของ cursor
	};

	const alertCreatedBlog = () => {
		return Swal.fire({
			title: "สร้างบล็อคของคุณสำเร็จแล้ว",
			icon: "success",
			confirmButtonText: "ตกลง"
		});
	};

	//const handleSubmitBlog = async (event) => {
	//	event.preventDefault();
	//	try {
	//		if (title === "" || description === "" || author === null) {
	//			alert("Please fill all the fields");
	//			return;
	//		}
	//		const response = await axios.post(
	//			`${import.meta.env.VITE_BASE_API_URI}/api/creatBlogs`,
	//			{
	//				title: title,
	//				description: description,
	//				author
	//			},
	//			{
	//				headers: {
	//					"Content-Type": "application/json"
	//				},
	//				withCredentials: true
	//			}
	//		);
	//		if (response.status === 201) {
	//			alertCreatedBlog();
	//			navigate("/home");
	//		} else {
	//			console.log(response.status);
	//		}
	//	} catch (error) {
	//		console.log(error);
	//	}
	//};

	//const resetCursorPosition = () => {
	//	const selection = document.getSelection();
	//	const range = document.createRange();
	//	const paragraph = titleRef.current;

	//	// ให้โฟกัสไปที่ paragraph
	//	paragraph.focus();

	//	// ตั้งตำแหน่ง cursor ที่จุดที่ต้องการ
	//	const textNode = paragraph.firstChild;
	//	range.setStart(textNode, title.length);
	//	range.setEnd(textNode, title.length);
	//	selection.removeAllRanges();
	//	selection.addRange(range);
	//};
	console.log(paragraphs.length);
	return (
		<>
			<div className="w-full flex flex-col gap-4 ">
				<Nav isCreateBlog={isCreateBlog} />

				{paragraphs.map((paragraph, index) => (
					<div key={index} className="flex flex-col items-center justify-start w-[75%]">
						<div className="flex gap-4 relative">
							{activeIndex === index && (
								<button className="absolute left-[-50px] mb-2 p-2 bg-blue-500 text-white">
									Save
								</button>
							)}
							{index === 0 ? (
								<textarea
									ref={(el) => (paragraphRef.current[index] = el)}
									className="w-1/2 min-h-[20px] p-[8px] mb-[8px] text-base outline-none resize-none"
									onChange={(event) => handleContent(event, index)}
									onKeyDown={(event) => handleKeydown(event, index)}
									onFocus={() => handleFocus(index)}
									placeholder="Title"
									value={paragraph}
								></textarea>
							) : (
								<textarea
									ref={(el) => (paragraphRef.current[index] = el)}
									className="w-1/2 min-h-[20px] p-[8px] mb-[8px] text-base outline-none resize-none"
									onChange={(event) => handleContent(event, index)}
									onKeyDown={(event) => handleKeydown(event, index)}
									onFocus={() => handleFocus(index)}
									placeholder="Content...."
									value={paragraph}
								></textarea>
							)}
						</div>
					</div>
				))}
			</div>
		</>
	);
}

{
	/*<div className="w-[1200px]  mt-[100px] border rounded-md p-2 mx-auto my-2 bg-white">
	<h1 className="text-3xl">Create Post</h1>
	<form className="mt-4 flex flex-col" onSubmit={handleSubmitBlog}>
		<div className="mb-6">
			<label className="block mb-2 text-sm font-medium text-black " htmlFor="title">
				Title
			</label>
			<input
				className="border rounded-md border-black px-2 w-full"
				id="title"
				type="text"
				placeholder="title"
				onChange={handleChangtitle}
			/>
		</div>
		<div className="mb-6">
			<label className="block mb-2 text-sm font-medium text-black " htmlFor="image">
				Image
			</label>
			<img src={image} className="w-[100px] h-[100px] mx-auto invisible" />
			<input
				className="hidden"
				type="file"
				id="image"
				onChange={(event) => setImage(event.target.files[0])}
			/>
		</div>
		<div className="mb-6">
			<label className="block mb-2 text-sm font-medium text-black " htmlFor="Contents">
				Contents
			</label>
			<textarea
				name="Contents"
				id="Contents"
				cols="30"
				rows="10"
				className="border rounded-md border-black p-2 w-full static"
				placeholder="Contents"
				onChange={handleChangeDescription}
			></textarea>
		</div>

		<div className="mb-6">
			<label className="block mb-2 text-sm font-medium text-black" htmlFor="author">
				Author
			</label>
			<input
				className="border rounded-md border-black px-2 w-full"
				id="author" // Unique ID for the input
				type="text"
				value={author.email} // Show the email in the input field
				readOnly // Optional: to make it read-only if you don't want it to be editable
			/>
		</div>
		<div className="mb-4 mx-4 flex justify-center">
			<button
				type="submit"
				className="w-[250px] bg-black text-white border rounded-md border-black py-2 hover:bg-gray-200 hover:text-black"
			>
				Publish
			</button>
		</div>
	</form>
</div>;*/
}
