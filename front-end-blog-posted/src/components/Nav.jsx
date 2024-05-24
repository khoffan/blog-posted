import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

function Nav() {
	const { id } = useParams();
	const location = useLocation();

	let currentPath = location.pathname;

	const [sreach, setSreach] = useState("");
	const [isLogin, setIsLogin] = useState(false);
	const [user, setUser] = useState({});
	const [isImage, setIsIMage] = useState(false);

	const navigate = useNavigate();
	const handleSreaching = (event) => {
		setSreach(event.target.value);
		console.log(sreach);
	};

	useEffect(() => {
		if (isLogin == false) {
			handleResponse();
		}
	}, [isLogin]);
	const handleResponse = async () => {
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_BASE_API_URI}/api/user/${id}`,
				{},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
			console.log(res.data);
			if (res.data.auth == true) {
				setIsLogin(true);
			}
			setUser(res.data.user);
			if (res.data.user.image_path) {
				setIsIMage(true);
			} else {
				setIsLogin(false);
			}
			console.log(res.data.user.image_path);
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
			navigate(`/user/profile/${user._id}`);
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
		<div className="sticky z-50 top-0 w-full flex flex-row items-center justify-between p-6 bg-red-500">
			<div className="text-3xl font-bold text-white px-2 flex  justify-center items-center">
				<Link to={currentPath}>Litium</Link>
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
			{isLogin ? (
				<div className="flex flex-row justify-center items-center ">
					<ul className="flex flex-row justify-center space-x-4 mx-5">
						<li className="mx-5 hover:text-white" onClick={handletoblogpage}>
							Blogs
						</li>
						<li className="mx-5 hover:text-white" onClick={handletoWriteblog}>
							Write Blog
						</li>
					</ul>
					<button
						className="block bg-white hover:bg-red-300 text-black font-bold py-2 px-4 rounded"
						onClick={handleLogout}
					>
						Logout
					</button>
					<div className="flex flex-row justify-center items-center mx-5">
						<p className="text-white text-lg">{user.first_name}</p>

						<img
							className="w-[60px] h-[50px] mx-2 bg-transparent rounded-full"
							src={
								isImage
									? `http://localhost:3001/${user.image_path}`
									: "https://via.placeholder.com/150"
							}
							alt=""
							onClick={handleProfileNvigate}
						/>
					</div>
				</div>
			) : (
				<div className="flex flex-row justify-center items-center mx-5">
					<ul className="flex flex-row justify-center space-x-4">
						<li>
							<a href="#" className="text-white hover:text-gray-300">
								Home
							</a>
						</li>
						<li>
							<a href="#" className="text-white hover:text-gray-300">
								About
							</a>
						</li>
						<li>
							<a href="#" className="text-white hover:text-gray-300">
								Blog
							</a>
						</li>
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
	);
}

export default Nav;
