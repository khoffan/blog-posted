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
        `http://localhost:3001/api/profile/${id}`
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
        <div className="max-w-[1000px] h-[600px]  border border-blue-400 rounded-md mx-auto bg-white ">
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
          <div className="flex flex-col justify-start items-start relative h-[300px] bg-blue-300">
            <div className="grid grid-cols-3 gap-4 border-b-2 border-black w-full h-[400px]">
              <div className="col-span-1 flex flex-col  text-white  block">
                <p className="text-3xl w-[300px] bg-black text-center m-4">
                  {user.first_name}-{user.last_name}
                </p>
                <p className="text-3xl w-[300px] bg-black text-center ml-4">
                  {user.email}
                </p>
              </div>
              <div className="col-span-2 border-l-2 border-black">
                <h1 className="text-3xl m-4">list My blogs</h1>
                <p className="text-xl text-bottom m-4">number of blogs</p>
              </div>
            </div>
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
