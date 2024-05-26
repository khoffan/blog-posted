import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footter from "./Footter";
import { useNavigate } from "react-router-dom";
export default function UpdateProfileDetail({ id }) {
	const [user, setuser] = useState({
		name: "",
		email: "",
		address: "",
		image_path: "",
		phone: "",
		blog_count: 0
	});
	const [imageurl, setImageurl] = useState("");
	const navigate = useNavigate();

	const handleChangImage = async (event) => {
		const file = event.target.files[0];
		const formData = new FormData();
		console.log(file);
		formData.append("file", file);
		try {
			const response = await axios.put(
				`http://localhost:3001/api/updateprofile/${id}`,
				formData,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}
			);
			console.log(response.data);
			setImageurl(response.data.image_path);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_API_URI}/api/updateprofile/${id}`,
				{
					name: event.target.name.value,
					email: event.target.email.value,
					address: event.target.address.value,
					image_path: imageurl
				},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
			console.log(response.data);
			navigate(`/home/${id}`);
		} catch (error) {
			console.log(error);
		}
	};

	const changeName = (event) => {
		setuser({ ...user, name: event.target.value });
	};

	const changeEmail = (event) => {
		setuser({ ...user, email: event.target.value });
	};

	const changeAddress = (event) => {
		setuser({ ...user, address: event.target.value });
	};

	const changePhone = (event) => {
		setuser({ ...user, phone: event.target.value });
	};

	return (
		<>
			<div className="min-w-screen min-h-screen">
				<Nav />

				<input type="file" id="file" className="hidden rounded-full w-[80] h-[80]" />
				<label
					htmlFor="file"
					className="mx-auto mt-[20px] w-32 h-32 border-4 border-blue-200 border-dashed rounded-full flex items-center justify-center cursor-pointer"
				></label>

				<div
					id="feld_data"
					className="w-[800px] px-[20px] py-[10px] mx-auto  border border-black mt-[20px]"
				>
					<span className="py-[30px]  mb-[10px] pl-[40px] block text-xl border border-black">
						Name:
						<input
							type="text"
							id="name"
							className="ml-[20px] px-[10px] rounded-md outline-none w-[300px] h-[50px] border caret-orange-400"
							value={user.name}
						/>
					</span>
					<span className="py-[30px] text-xl pl-[40px] mt-[10px] block border border-black">
						Email:
						<p className="text-xl inline px-[30px] "></p>
					</span>
					<span className="py-[30px] text-xl pl-[40px] mt-[10px] block  border border-black">
						Address:
						<p className="text-xl inline px-[30px] ">ไม่มีช้อมูล</p>
					</span>
					<span className="py-[30px] text-xl pl-[40px] mt-[10px] block  border border-black">
						Phone:
						<p className="text-xl inline px-[30px] ">ไม่มีข้อมูล</p>
					</span>
					<span className="py-[30px] text-xl pl-[40px] mt-[10px] block  border border-black">
						Blogs count:
						<p className="text-xl inline px-[30px] ">ไม่มีข้อมูล</p>
					</span>
				</div>
				<Footter />
			</div>
		</>
	);
}
