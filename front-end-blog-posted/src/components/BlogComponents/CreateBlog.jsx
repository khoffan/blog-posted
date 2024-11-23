import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Nav from "../Nav";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faCirclePlus, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
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
			if (saveParagraphs.length > 0) {
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
	const convertList2string = () => {
		result = paragraphs.join("\n");
		console.log(`raw reslut ${JSON.stringify(result)} typeof ${typeof result}`);
		let split = result.split("\n");
		console.log(`split string ${split} typeof ${typeof split}`);
	};

	return (
		<>
			<div className="w-full flex flex-col items-center justify-center gap-4 ">
				<Nav isCreateBlog={isCreateBlog} />
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
				<div className="border border-2 border-red-500 w-1/2"></div>
				<button className="block" onClick={() => convertList2string()}>
					Click Me
				</button>
			</div>
		</>
	);
}
