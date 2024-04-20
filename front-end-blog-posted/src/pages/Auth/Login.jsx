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

  const navigate = useNavigate();
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setMessage(response.data.massage);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
        console.log(error); // Use the error message from the server response if available
      } else {
        setMessage("Failed to login. Please try again later."); // Generic error message if no specific error message is available
      }
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="grid grid-cols-2 flex-grow">
          <div className="bg-red-400 flex flex-col justify-center items-center z-10 border-r border-black">
            <img
              src=""
              alt="420 * 280"
              className="bg-black-400 p-auto border-r w-40 h-40"
            />
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
                {message && <p>{message}</p>}
              </div>
            </div>
          </div>
        </div>
        <Footter />
      </div>
    </>
  );
}
