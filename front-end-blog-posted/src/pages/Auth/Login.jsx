import React, { useState } from "react";
import Footter from "../../components/Footter";
import { Link } from "react-router-dom";
import Fromfeild from "../../components/Fromfeild";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isShow, setIsShow] = useState(false);

	const navigate = useNavigate();

	const showMassageErroe = (msg) => {
		setIsShow(true);
		setMessage(msg);
		setTimeout(() => {
			setIsShow(false);
		}, 1500);
	};

	const handleSubmitLogin = async (event) => {
		event.preventDefault();
		try {
			if (email == "") {
				showMassageErroe("กรุณากรอก Email");
			}
			if (password == "") {
				showMassageErroe("กรุณากรอก password");
			}
			if (email != "" || password != "") {
				const response = await axios.post(
					`${import.meta.env.VITE_BASE_API_URI}/api/login`,
					{
						email: email,
						password: password
					},
					{
						withCredentials: true
					}
				);
				console.log(response.status);
				if (response.status === 200) {
					showMassageErroe(response.data.massage);
					setEmail("");
					setPassword("");
					setTimeout(() => {
						navigate(`/`);
					}, 500);
				} else {
					showMassageErroe("Email หรือ Password ไม่ถูกต้อง");
				}
			} else {
				showMassageErroe("กรุณากรอกข้อมูลให้ครบถ้วน");
			}
		} catch (error) {
			if (error.response && error.response.data) {
				showMassageErroe(error.response.data.massage);
				console.log(error); // Use the error message from the server response if available
			} else {
				showMassageErroe("Failed to login. Please try again later."); // Generic error message if no specific error message is available
			}
		}
	};

	return (
		<>
			<div className="flex flex-col min-h-screen">
				<div className="grid grid-cols-2 flex-grow">
					<div className="bg-red-400 flex flex-col justify-center items-center z-10 border-r border-black">
						<img src="" className="bg-black-400 p-auto border-r w-40 h-40 hidden" />
						<h2 className="text-9xl text-black">Litium</h2>
						<p className="text-black text-lg">Blog Post Sing In</p>
					</div>
					<div className=" flex flex-col justify-center bg-slate-200">
						<div className="mx-36">
							<h1 className="text-3xl text-blod flex justify-center items-center">
								Sing In
							</h1>
							<div className="border boerder-black p-auto flex flex-col justify-center items-center">
								<Fromfeild
									title="Email"
									value={email}
									onChange={(value) => setEmail(value)}
								/>
								<Fromfeild
									value={password}
									title="Password"
									onChange={(value) => setPassword(value)}
								/>
								<label className="inline-flex mt-3 items-center">
									<span className="ml-2 text-gray-700 text-sm">
										สมัครบัญชีได้ที่นี่
									</span>
									<Link to="/signup">
										<span className="ml-2 text-red-500 text-sm">Register</span>
									</Link>
								</label>
								<button
									type="submit"
									onClick={handleSubmitLogin}
									className="my-5  text-white rounded-md bg-black hover:bg-gray-200 p-2 w-1/2 flex justify-center  hover:text-black hover:border hover:border-black "
								>
									Sing In
								</button>
								{isShow && <p>{message}</p>}
							</div>
						</div>
					</div>
				</div>
				<Footter />
			</div>
		</>
	);
}
