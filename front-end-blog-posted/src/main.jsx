import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
//import Cookies from "js-cookie";
import axios from "axios";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import CreatePost from "./pages/Posts/CreatePost.jsx";
import Profile from "./pages/userProfile/Profile.jsx";
import ProtechRoute from "./components/protechRoute/ProtechRoute.jsx";
import EditProfile from "./pages/userProfile/EditProfile.jsx";
import Blogspage from "./pages/Posts/Blogspage.jsx";
import BlogDetail from "./pages/Posts/BlogDetail.jsx";
import Home from "./pages/Home.jsx";

//server side for protect route

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />
	},
	{
		path: "/home/:id",
		element: <Home />
	},
	{
		path: "/login",
		element: (
			<ProtechRoute redirectPath="/home/:id">
				<Login />
			</ProtechRoute>

			//<Login />
		)
	},
	{
		path: "/signup",
		element: (
			<ProtechRoute redirectPath="/home/:id">
				<Register />
			</ProtechRoute>

			//<Register />
		)
	},
	{
		path: "blog/:id",
		element: <Blogspage />
	},
	{
		path: "/create-blog/:id",
		element: <CreatePost />
	},
	{
		path: "/user/profile/",
		element: <Profile />
	},
	{
		path: "/user/editprofile/:id",
		element: <EditProfile />
	},
	{
		path: "/blog/deatil/:id",
		element: <BlogDetail />
	}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
