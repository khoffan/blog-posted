import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footter from "./Footter";
import { useNavigate } from "react-router-dom";
export default function DetailProfile({ userObj }) {
	const [user, setuser] = useState({});
	const [image, setimage] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		console.log(userObj.image_path);
	}, []);
	//const fetchData = async () => {
	//	try {
	//		const response = await axios.get(`${import.meta.env.VITE_BASE_API_URI}/api/profile/`);
	//		if (response.status === 401) return false;
	//		//console.log(response.data);
	//		setuser(response.data.user);
	//		setimage(response.data.user.image_path);
	//	} catch (error) {
	//		console.log(error);
	//	}
	//};

	const handleUpdateProfile = () => {
		navigate(`/user/editprofile/${id}`);
	};

	return (
		<>
			<div className="min-w-screen min-h-screen h-screen border-box">
				<Nav />
				<div className="h-full w-full">
					<div className="h-full min-w-[200px] w-[800px] max-w-full border border-blcak mx-auto">
						<div className="h-full w-full border border-black">
							<div className="flex flex-col">
								<img
									src={`${import.meta.env.VITE_BASE_API_URI}/${
										userObj.image_path
									}`}
									className="rounded-full  w-[80px] h-[80px] object-cover mx-auto pt-[10px] border border-black"
								/>
								<div className="flex flex-row justify-end pr-[20px]">
									<button className="m-[20px]">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="size-6 fill-blue-400"
										>
											<path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
											<path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
										</svg>
										Edit
									</button>
									<button className="m-[20px]">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="size-6 fill-red-400"
										>
											<path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
										</svg>
										<p className="text-red-400">Delate</p>
									</button>
								</div>
							</div>
							<div
								id="feld_data"
								className="w-[800px] px-[20px] py-[10px]  border border-black mt-[20px]"
							>
								<span className="py-[30px]  mb-[10px] pl-[40px] block text-xl border border-black">
									Name:
									<h1 className="text-xl inline px-[30px] py-auto">
										{userObj.first_name} {userObj.last_name}
									</h1>
								</span>
								<span className="py-[30px] text-xl pl-[40px] mt-[10px] block border border-black">
									Email:
									<p className="text-xl inline px-[30px] ">{userObj.email}</p>
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
						</div>
					</div>
				</div>
				<Footter />
			</div>
		</>
	);
}
