import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footter from "./Footter";
import { useNavigate } from "react-router-dom";
export default function DetailProfile({ id }) {
  const [user, setuser] = useState({});
  const [image, setimage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URI}/api/profile/${id}`
      );
      //console.log(response.data);
      setuser(response.data.user);
      setimage(response.data.user.image_path);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProfile = () => {
    navigate(`/user/editprofile/${id}`);
  };

  return (
    <>
      <div className="max-w-screen min-h-screen bg-red-400 ">
        <Nav />
        <div className="max-w-[1000px] h-full border border-blue-400 rounded-md mx-auto bg-white ">
          <div className="relative left-[400px] mb-4">
            <img
              className="max-w-fit max-h-fit cornered-full rounded-full mb-4"
              src={
                image
                  ? `http://localhost:3001/${image}`
                  : "https://picsum.photos/200"
              }
              alt="profile"
            />
          </div>
          <div className="">
            <div>
              <p className="inline mx-4 text-2xl">Name :</p>
              <p className="inline  text-2xl">
                {user.first_name} {user.last_name}
              </p>
            </div>
            <div></div>
          </div>
          <div className="flex flex-row justify-evenly items-center relative   pt-2 w-full h-[80px]">
            <button
              className="w-48 mx-[50px] px-2 py-2 bg-black text-white h-[50px] rounded-full"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>
            <button className="w-48 px-2 py-2 h-[50px] rounded-full bg-red-400">
              Delate
            </button>
          </div>
        </div>
      </div>
      <Footter />
    </>
  );
}
