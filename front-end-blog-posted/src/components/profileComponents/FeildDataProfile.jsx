import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FeildData from "./FeildData";
export default function FeildDataProfile({ id, oldData, isShow }) {
	const navigate = useNavigate();

	const previousePage = () => {
		navigate(-1);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.put(
				`${import.meta.env.VITE_BASE_API_URI}/api/updateprofile/${id}`,
				{
					name: user.name,
					email: user.email,
					address: user.address,
					phone_nuumber: user.phone
				},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		} finally {
			navigate(-1);
		}
	};

	return (
		<>
			<div
				id="feld_data"
				className="w-screen px-[80px] py-[20px] min-h-screen mx-auto mt-[20px]"
			>
				{isShow == false ? (
					<>
						<FeildData id={id} oldData={oldData} />
						<div className="flex flex-row justify-evenly items-center">
							<button
								className="w-[300px] h-[50px] mt-[50px] bg-orange-400 rounded-md text-white hover:bg-orange-600"
								onClick={handleSubmit}
							>
								Update
							</button>
							<button
								className="w-[300px] h-[50px] mt-[50px] bg-slate-400 rounded-md text-white hover:bg-black"
								onClick={previousePage}
							>
								Cancel
							</button>
						</div>
					</>
				) : (
					<>
						<span className="py-[30px] my-[10px] text-xl px-auto  block">
							Name:
							<p className="ml-[80px] text-xl inline px-[30px] ">
								{oldData.first_name + " " + oldData.last_name}
							</p>
						</span>
						<span className="py-[30px] my-[10px] text-xl px-auto  block">
							Email:
							<p className="ml-[80px] text-xl inline px-[30px] ">{oldData.email}</p>
						</span>
						<span className="py-[30px] my-[10px] text-xl px-auto  block">
							Address:
							<p className="ml-[80px] text-xl inline px-[30px] ">{oldData.address}</p>
						</span>
						<span className="py-[30px] my-[10px] text-xl px-auto  block">
							Phone:
							<p className="ml-[80px] text-xl inline px-[30px] ">
								{oldData.phone_nuumber}
							</p>
						</span>
						<span className="py-[30px] my-[10px] text-xl px-auto  block">
							Blog_count:
							<p className="ml-[80px] text-xl inline px-[30px] ">0</p>
						</span>
					</>
				)}
			</div>
		</>
	);
}
