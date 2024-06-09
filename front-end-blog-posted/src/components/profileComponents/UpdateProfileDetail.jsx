import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav";
import Footter from "../Footter";
import { useNavigate } from "react-router-dom";
import FeildDataProfile from "./FeildDataProfile";
export default function UpdateProfileDetail({ id, oldData }) {
	const [imageurl, setImageurl] = useState("");
	const navigate = useNavigate();

	const handleChangImage = async (event) => {
		event.preventDefault();
		const file = event.target.files[0];
		const formData = new FormData();
		console.log(file);
		formData.append("file", file);
		try {
			const response = await axios.put(
				`${import.meta.env.VITE_BASE_API_URI}/api/uploadimage/${id}`,
				formData,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}
			);
			console.log(response.data.image_path);
			setImageurl(response.data.image_path);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="min-w-screen min-h-screen">
				<Nav />

				<div className="h-full w-full mt-[150px]">
					<input
						type="file"
						id="file"
						className="hidden rounded-full w-[80] h-[80]"
						value=""
						onChange={handleChangImage}
					/>
					<label
						htmlFor="file"
						className="mx-auto mt-[20px] w-32 h-32 rounded-full flex items-center justify-center cursor-pointer"
					>
						{imageurl ? (
							<img
								src={`${import.meta.env.VITE_BASE_API_URI}/${imageurl}`}
								alt="profile"
							/>
						) : (
							<img
								src={`${import.meta.env.VITE_BASE_API_URI}/${oldData.image_path}`}
								alt="profile"
							/>
						)}
					</label>
				</div>
				<FeildDataProfile id={id} oldData={oldData} />
				<Footter />
			</div>
		</>
	);
}
