import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function FeildDataProfile({ oldData }) {
	const [user, setuser] = useState({
		name: "",
		email: "",
		address: "",
		image_path: "",
		phone: "",
		blog_count: 0
	});

	const navigate = useNavigate();

	const previousePage = () => {
		navigate(-1);
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

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_API_URI}/api/updateprofile/${id}`,
				{
					name: event.target.name.value,
					email: event.target.email.value,
					address: event.target.address.value
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

	return (
		<>
			<div
				id="feld_data"
				className="w-screen px-[80px] py-[20px] min-h-screen mx-auto mt-[20px]"
			>
				<span className="relative py-[30px] mb-[10px] px-auto block text-xl hover:border hover:border-orange-400">
					Name:
					<input
						type="text"
						id="name"
						className="absolute left-[80px] top-[20px] min-w-[500px] max-w-full ml-[80px] px-[10px] rounded-md outline-none h-[50px] border caret-orange-400 focus:outline-none focus:border-gray-400"
						value={oldData.first_name + " " + oldData.last_name}
						onChange={changeName}
					/>
				</span>
				<span className="relative py-[30px] my-[10px] text-xl px-auto  block hover:border hover:border-orange-400 ">
					Email:
					<input
						type="email"
						id="email"
						className="absolute left-[80px] top-[20px] min-w-[500px] max-w-full ml-[80px] px-[10px] rounded-md outline-none  h-[50px] border caret-orange-400 focus:outline-none focus:border-gray-400"
						value={oldData.email}
						onChange={changeEmail}
					/>
				</span>
				<span className="relative py-[30px] mb-[10px] text-xl px-auto mt-[10px] block hover:border hover:border-orange-400 ">
					Address:
					<input
						type="text"
						id="address"
						className="absolute left-[80px] top-[20px] ml-[80px] min-w-[500px] max-w-full px-[10px] rounded-md outline-none h-[50px] border caret-orange-400 focus:outline-none focus:border-gray-400"
						value="ไม่มีข้อมูล"
						onChange={changeAddress}
					/>
				</span>
				<span className="relative py-[30px] my-[10px] text-xl px-[20px]  block hover:border hover:border-orange-400  ">
					Phone:
					<input
						type="text"
						id="phone"
						className="absolute left-[80px] top-[20px] ml-[80px] px-[10px] min-w-[500px] max-w-full rounded-md outline-none  h-[50px] border caret-orange-400 focus:outline-none focus:border-gray-400"
						value="ไม่มีข้อมูล"
						onChange={changePhone}
					/>
				</span>
				<span className="py-[30px] my-[10px] text-xl px-auto  block  hover:border hover:border-orange-400 ">
					Blogs count:
					<p className="ml-[80px] text-xl inline px-[30px] ">0</p>
				</span>
				<div className="flex flex-row justify-evenly items-center">
					<button className="w-[300px] h-[50px] mt-[50px] bg-orange-400 rounded-md text-white hover:bg-orange-600">
						Update
					</button>
					<button
						className="w-[300px] h-[50px] mt-[50px] bg-slate-400 rounded-md text-white hover:bg-black"
						onClick={previousePage}
					>
						Cancel
					</button>
				</div>
			</div>
		</>
	);
}
