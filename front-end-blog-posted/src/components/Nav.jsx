import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Nav() {
  const [sreach, setSreach] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const handleSreaching = (event) => {
    setSreach(event.target.value);
    console.log(sreach);
  };

  useEffect(() => {
    handleResponse();
  }, []);
  const handleResponse = async (e) => {
    try {
      const res = await axios.get("http://localhost:3001/api/profile", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);
      if (res.data.auth == true) {
        setIsLogin(true);
      }
      setUser(res.data.user);
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
      console.log(user.email);
    } else {
      navigate("/login");
    }
  };

  const ModifyButtonLogin = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    "&:hover": {
      backgroundColor: grey[700],
    },
  }));
  const ModifyButtonSignUp = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[50],
    "&:hover": {
      backgroundColor: grey[700],
    },
  }));

  return (
    <div className="flex flex-row items-center justify-between p-6 bg-red-500">
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
      {isLogin ? (
        <div className="flex flex-row justify-center items-center ">
          <ul className="flex flex-row justify-center space-x-4 mx-5">
            <li>Blogs</li>
            <li className="mx-5">
              <Link
                className="text-white hover:text-gray-300"
                to="/create-blog"
              >
                Write Blog
              </Link>
            </li>
          </ul>
          <button className="block bg-white hover:bg-red-300 text-black font-bold py-2 px-4 rounded">
            Logout
          </button>
          <div className="flex flex-row justify-center items-center mx-5">
            <p className="text-white text-lg">{user.first_name}</p>
            <div className="block w-10 h-10 mx-2">
              <img
                className="rounded-full"
                src="https://via.placeholder.com/150"
                alt=""
                onClick={handleProfileNvigate}
              />
            </div>
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
