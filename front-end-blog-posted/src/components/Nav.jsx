import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Dropdown from "./Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Nav({ isCreateBlog }) {
	const [sreach, setSreach] = useState("");
	const [isLogin, setIsLogin] = useState(false);
	const [user, setUser] = useState({});
	const [isImage, setIsIMage] = useState(false);
	const [isDropdown, setIsDropdown] = useState(false);

	const navigate = useNavigate();
	const handleSreaching = (event) => {
		setSreach(event.target.value);
		console.log(sreach);
	};

	useEffect(() => {
		handleResponse();
	}, []);
	const handleResponse = async () => {
		try {
			const res = await axios.get(`${import.meta.env.VITE_BASE_API_URI}/api/user`, {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json"
				}
			});

			console.log(res.data);
			if (res.data.auth == true) {
				setIsLogin(true);
			}
			setUser(res.data.user);
			if (res.data.user.image_path) {
				setIsIMage(true);
			}
			//console.log(res.data.user.image_path);
		} catch (error) {
			if (error.response && error.response.status === 401) {
				// Handle token expiration here, for example, by redirecting to the login page
				setIsLogin(false); // You can also call your alertToken function here if needed
			} else {
				// Handle other types of errors
				console.log("Error:", error);
			}
		}
	};

	const handleProfileNvigate = () => {
		if (isLogin) {
			navigate(`/user/profile/`, { state: { user } });
			//console.log(user.email);
		} else {
			navigate("/login");
		}
	};
	const handletoWriteblog = () => {
		if (isLogin) {
			navigate(`/create-blog/${user._id}`);
			//console.log(user.email);
		} else {
			navigate("/");
		}
	};
	const handletoblogpage = () => {
		if (isLogin) {
			navigate(`/blog/${user._id}`);
		} else {
			navigate("/");
		}
	};

	const handleDropdown = () => {
		setIsDropdown(!isDropdown);
	};

	const handleLogout = async () => {
		try {
			const res = await axios.post("http://localhost:3001/api/logout", null, {
				withCredentials: true
			});
			if (res.status === 200) {
				setIsLogin(false);
				alert(res.data.massage);
				navigate("/", { state: { isLogin: true } });
			}
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const ModifyButtonLogin = styled(Button)(({ theme }) => ({
		color: theme.palette.getContrastText(grey[900]),
		backgroundColor: grey[900],
		"&:hover": {
			backgroundColor: grey[700]
		}
	}));
	const ModifyButtonSignUp = styled(Button)(({ theme }) => ({
		color: theme.palette.getContrastText(grey[500]),
		backgroundColor: grey[50],
		"&:hover": {
			backgroundColor: grey[700]
		}
	}));

	return (
		<>
			{isCreateBlog == true ? (
				<div className="z-[1000] top-0 left-0 w-full flex flex-row items-center justify-evenly px-6 h-[90px] bg-red-500">
					<div className="flex gap-4">
						<Link to="/">
							<span className="text-3xl font-bold text-white">Litium</span>
						</Link>
						<span className="text-base text-gray-400 pt-[10px]">
							Write by {user.first_name}
						</span>
					</div>

					{isLogin == true ? (
						<div className="flex flex-row justify-center items-center ">
							<ul className="flex flex-row justify-center space-x-4 mx-5">
								<button className="text-white text-center rounded-full w-[100px] p-2 mx-5 transition ease-in-out hover:-translate-y-1 hover:duration-500 hover:bg-blue-700 cursor-pointer">
									Public
								</button>
							</ul>

							<div className="flex flex-row justify-center items-center mx-5">
								<p className="text-white outline-none cursor-default text-lg">
									{user.first_name}
								</p>

								<div>
									<button
										id="dropdownButton"
										onClick={handleDropdown}
										className="relative inline-block text-left"
									>
										<img
											className="w-[60px] h-[50px] mx-2 bg-transparent rounded-full"
											src={
												isImage
													? `http://localhost:3001/${user.image_path}`
													: "https://via.placeholder.com/150"
											}
											alt=""
										/>
										{isDropdown && (
											<Dropdown
												navProfile={handleProfileNvigate}
												logoutevent={handleLogout}
												yourBlog={handletoblogpage}
											/>
										)}
									</button>
								</div>
							</div>
						</div>
					) : (
						<div className="flex flex-row justify-center items-center mx-5">
							<ul className="flex flex-row justify-center space-x-4">
								<li>Write</li>
							</ul>
							<div className="mx-5 flex flex-row justify-center space-x-4">
								<ModifyButtonLogin variant="contained">
									<Link to="/login">Sign In</Link>
								</ModifyButtonLogin>
								<ModifyButtonSignUp variant="contained">
									<Link to="/signup">Sign Up</Link>
								</ModifyButtonSignUp>
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="z-[1000] top-0 left-0 w-full flex flex-row items-center justify-between px-6 h-[90px] bg-red-500">
					<div className="text-3xl font-bold text-white px-2 flex  justify-center items-center">
						<Link to="/">Litium</Link>
						<div className="mx-5">
							<input
								className="rounded-full px-5 text-l text-black input-field w-full py-1 px-2 text-lg focus:outline-none focus:shadow-outline "
								id="search"
								name="search"
								type="text"
								placeholder="Search..."
								value={sreach}
								onChange={handleSreaching}
							/>
						</div>
					</div>
					{isLogin == true ? (
						<div className="flex flex-row justify-center items-center ">
							<ul className="flex flex-row justify-center space-x-4 mx-5">
								<li
									className="mx-5 hover:text-white outline-none cursor-pointer"
									onClick={handletoWriteblog}
								>
									Write Blog <FontAwesomeIcon icon={faPenToSquare} />
								</li>
							</ul>

							<div className="flex flex-row justify-center items-center mx-5">
								<p className="text-white outline-none cursor-default text-lg">
									{user.first_name}
								</p>

								<div>
									<button
										id="dropdownButton"
										onClick={handleDropdown}
										className="relative inline-block text-left"
									>
										<img
											className="w-[60px] h-[50px] mx-2 bg-transparent rounded-full"
											src={
												isImage
													? `http://localhost:3001/${user.image_path}`
													: "https://via.placeholder.com/150"
											}
											alt=""
										/>
									</button>
								</div>
								{isDropdown && (
									<Dropdown
										navProfile={handleProfileNvigate}
										logoutevent={handleLogout}
										yourBlog={handletoblogpage}
									/>
								)}
							</div>
						</div>
					) : (
						<div className="flex flex-row justify-center items-center mx-5">
							<ul className="flex flex-row justify-center space-x-4">
								<li>Write</li>
							</ul>
							<div className="mx-5 flex flex-row justify-center space-x-4">
								<ModifyButtonLogin variant="contained">
									<Link to="/login">login</Link>
								</ModifyButtonLogin>
								<ModifyButtonSignUp variant="contained">
									<Link to="/signup">signup</Link>
								</ModifyButtonSignUp>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
}

export default Nav;
