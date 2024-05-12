import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Cookies from "js-cookie";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import CreatePost from "./pages/Posts/CreatePost.jsx";
import Profile from "./pages/userProfile/Profile.jsx";
import ProtechRoute from "./components/protechRoute/ProtechRoute.jsx";
import EditProfile from "./pages/userProfile/EditProfile.jsx";
import Blogspage from "./pages/Posts/Blogspage.jsx";

const handleauthProtech = () => {
  console.log(Cookies.get("token", { sameSite: "none", secure: true }));
  //if (!token || token == undefined) {
  //  return false;
  //}
  //return true;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: (
      <ProtechRoute isAuth={handleauthProtech()} redirectPath="/">
        <Login />
      </ProtechRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <ProtechRoute isAuth={handleauthProtech()} redirectPath="/">
        <Register />
      </ProtechRoute>
    ),
  },
  {
    path: "blog/:id",
    element: <Blogspage />,
  },
  {
    path: "/create-blog/:id",
    element: <CreatePost />,
  },
  {
    path: "/user/profile/:id",
    element: <Profile />,
  },
  {
    path: "/user/editprofile/:id",
    element: <EditProfile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
