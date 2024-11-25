import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Nav from "../Nav";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faCirclePlus, faCirclePlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function IconAwesome({ iconName }) {
	return <FontAwesomeIcon className="text-xl" icon={iconName} />;
}

function TextNavigate({ handleFile }) {
	return (
		<>
			<ul className="flex gap-4 p-2 h-[60px] w-full">
				<label htmlFor="file-upload" className="w-[40px] h-[30px] py-2 cursor-pointer">
					<IconAwesome iconName={faImage} />
				</label>
				<input
					id="file-upload"
					type="file"
					className="hidden"
					onChange={console.log("file")}
				/>
				<button type="button" className="inline w-[40px] h-[40px] mr-2">
					<IconAwesome iconName={faCirclePlay} />
				</button>
			</ul>
		</>
	);
}

export default function CreateBlog({ id }) {
	const [paragraphs, setParagraphs] = useState([]);
	const [activeIndex, setActiveIndex] = useState(null);
	const [isTextnavigate, setIstextNavigate] = useState(Array(paragraphs.length).fill(false));
	const [isCreateBlog, setIscreateBlog] = useState(false);
	const paragraphRef = useRef([]);
	const [title, setTitle] = useState("");
	const [contents, setContents] = useState("");
	const [tags, setTags] = useState([]);
	const [inputTag, setInputTag] = useState("");
	const [image, setImage] = useState("");
	const [author, setAuthor] = useState({
		name: "",
		email: "",
		image: ""
	});

	const navigate = useNavigate();

	let result = "";

	useEffect(() => {
		if (isTextnavigate.length != paragraphs.length) {
			setIstextNavigate(Array(paragraphs.length).fill(false));
		}
	}, [paragraphs]);

	//ดึงข้อมูลจาก localstorage
	useEffect(() => {
		try {
			const saveParagraphs = JSON.parse(localStorage.getItem("paragraphs"));
			if (saveParagraphs != null && saveParagraphs.length > 0) {
				setParagraphs(saveParagraphs);
			} else {
				setParagraphs(["", ""]);
			}
		} catch (error) {
			console.log("err: ", error);
		}
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

	useEffect(() => {
		fetchProfile();
		setIscreateBlog(true);
	}, []);

	const handleKeydown = (event, index) => {
		if (event.key === "Enter") {
			event.preventDefault();

			const newParagraphs = [...paragraphs];
			newParagraphs.splice(index + 1, 0, ""); // เพิ่ม textarea ใหม่เป็นค่าพื้นฐาน (ข้อความว่าง)
			setParagraphs(newParagraphs);
			setActiveIndex(index + 1);

			requestAnimationFrame(() => {
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

				const newIndex = index > 0 ? index - 1 : 0;
				setActiveIndex(newIndex);

				requestAnimationFrame(() => {
					paragraphRef.current[index - 1]?.focus();
				}, 0);
			}
		}
	};

	const handleContent = (event, index) => {
		const newparagraphs = [...paragraphs];
		newparagraphs[index] = event.target.value;
		setParagraphs(newparagraphs);
		localStorage.setItem("paragraphs", JSON.stringify(newparagraphs));
	};

	const handleImportfile = () => {
		return;
	};
	//const handleChangeDescription = (event) => {
	//	setDescription(event.target.value);
	//};
	const handleFocus = (index) => {
		setActiveIndex(index);
		setIstextNavigate((prevSate) => prevSate.map((state, i) => (i === index ? false : null)));
		// เมื่อมีการโฟกัสที่ <p> จะตรวจสอบตำแหน่งของ cursor
	};

	const handleNavatebutton = (index) => {
		setIstextNavigate((prevState) =>
			prevState.map((state, i) => (i === index ? !state : state))
		);
	};

	const alertCreatedBlog = () => {
		return Swal.fire({
			title: "สร้างบล็อคของคุณสำเร็จแล้ว",
			icon: "success",
			confirmButtonText: "ตกลง"
		});
	};

	const handleInputChange = (e) => {
		setInputTag(e.target.value);
	};

	const handleTagInputKey = (e) => {
		if (e.key === "Enter") {
			setInputTag("");
			const triminput = inputTag.trim();

			if (triminput && !tags.includes(triminput)) {
				setTags([...tags, triminput]);
			} else if (!tags.includes(triminput)) {
				alert("tag นี้มีอยู่ในรายการแล้ว");
			} else {
				alert("กรุณาเพิ่ม tag");
			}
		}
	};

	const handleSubmitBlog = async (event) => {
		event.preventDefault();
		if (paragraphs.length > 2) {
			let header = paragraphs[0];
			result = paragraphs.slice(1).join("\n");
			setTitle(header);
			setContents(result);
		}
		try {
			if (title === "" || contents === "" || author === null) {
				alert("Please fill all the fields");
				return;
			}
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_API_URI}/api/creatBlogs`,
				{
					title: title,
					description: contents,
					author
				},
				{
					headers: {
						"Content-Type": "application/json"
					},
					withCredentials: true
				}
			);
			if (response.status === 201) {
				localStorage.removeItem("paragraphs");
				setTitle("");
				setContents("");
				setParagraphs([]);
				alertCreatedBlog();
				navigate("/");
			} else {
				alert("ไม่สามารถ publish blog ได้");
			}
		} catch (error) {
			alert("ไม่สามารถ publish blog ได้");
			console.log(error);
		}
	};
	//const convertList2string = () => {
	//	if (paragraphs.length > 2) {
	//		let header = paragraphs[0];
	//		result = paragraphs.slice(1).join("\n");
	//		setTitle(header);
	//		setContents(JSON.stringify(result));
	//	}
	//	//console.log(`raw reslut ${JSON.stringify(result)} typeof ${typeof result}`);
	//	//let content = result.split("")
	//	//setTitle(title)
	//	//console.log(`split string ${split} typeof ${typeof split}`);
	//};

	return (
		<>
			<div className="w-full flex flex-col items-center justify-center gap-4 ">
				<Nav isCreateBlog={isCreateBlog} publicState={handleSubmitBlog} />
				<div className="flex flex-col justify-start w-1/2">
					{paragraphs.map((paragraph, index) => (
						<>
							<div key={index} className="flex gap-4 relative">
								{activeIndex === index && (
									<button
										className="absolute left-[-50px] pt-[16px] outline-none"
										onClick={() => handleNavatebutton(index)}
									>
										<IconAwesome iconName={faCirclePlus} />
									</button>
								)}
								{!isTextnavigate[index] ? (
									<textarea
										ref={(el) => (paragraphRef.current[index] = el)}
										className="left-[0px] min-w-[80%] min-h-[20px] my-[8px] pt-[4px] text-base outline-none resize-none"
										onChange={(event) => handleContent(event, index)}
										onKeyDown={(event) => handleKeydown(event, index)}
										onFocus={() => handleFocus(index)}
										placeholder={index === 0 ? "Title" : "Content"}
										value={paragraph}
									></textarea>
								) : (
									<TextNavigate />
								)}
							</div>
						</>
					))}
				</div>
				{/* เพิ่มของ blog */}
				<div className="border border-2 border-red-500 w-1/2 p-[10px]">
					<p className="text-xl font-bold mb-2">Tag</p>
					<div className="flex gap-5">
						{tags.map((tag, index) => {
							return (
								<div
									className="flex flex-wrap w-20 justify-between items-center bg-green-500 text-white py-2 px-4 rounded-md border border-green-700 text-sm cursor-pointer transition-all duration-300 transform hover:bg-green-600 hover:scale-105 active:bg-green-800"
									key={index}
								>
									<span className="">{tag}</span>
									<a className="block cursor-pointer hover:text-red-400 ">
										<IconAwesome iconName={faXmark} />
									</a>
								</div>
							);
						})}
					</div>
					<input
						type="text"
						name="tag-input"
						id="tag-input"
						placeholder="Add Tag"
						value={inputTag}
						onChange={(e) => handleInputChange(e)}
						onKeyDown={(e) => handleTagInputKey(e)}
						className="block m-[10px] p-[10px] rounded-md focus:outline-1 focus:outline-gray-300"
					/>
				</div>
				{/*<button className="block" onClick={(e) => handleSubmitBlog(e)}>
					
				</button>*/}
			</div>
		</>
	);
}
