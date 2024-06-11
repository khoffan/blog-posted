import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateBlog({ id }) {
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
		fetchProfile();
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

	const handleChangtitle = (event) => {
		setTitle(event.target.value);
	};
	const handleChangeDescription = (event) => {
		setDescription(event.target.value);
	};

	const alertCreatedBlog = () => {
		return Swal.fire({
			title: "สร้างบล็อคของคุณสำเร็จแล้ว",
			icon: "success",
			confirmButtonText: "ตกลง"
		});
	};

	const handleSubmitBlog = async (event) => {
		event.preventDefault();
		try {
			if (title === "" || description === "" || author === null) {
				alert("Please fill all the fields");
				return;
			}
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_API_URI}/api/creatBlogs`,
				{
					title: title,
					description: description,
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
				alertCreatedBlog();
				navigate("/home");
			} else {
				console.log(response.status);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="flex flex-col min-h-screen bg-red-400">
				<Nav />
				<div className="w-[1200px]  mt-[100px] border rounded-md p-2 mx-auto my-2 bg-white">
					<h1 className="text-3xl">Create Post</h1>
					<form className="mt-4 flex flex-col" onSubmit={handleSubmitBlog}>
						<div className="mb-6">
							<label
								className="block mb-2 text-sm font-medium text-black "
								htmlFor="title"
							>
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
							<label
								className="block mb-2 text-sm font-medium text-black "
								htmlFor="image"
							>
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
							<label
								className="block mb-2 text-sm font-medium text-black "
								htmlFor="Contents"
							>
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
							<label
								className="block mb-2 text-sm font-medium text-black"
								htmlFor="author"
							>
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
				</div>
			</div>
		</>
	);
}
