import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footter from "./Footter";
import { useNavigate } from "react-router-dom";
export default function UpdateProfileDetail({ id }) {
  const [user, setuser] = useState({});
  const [imageurl, setImageurl] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/profile/${id}`
      );
      //  console.log(response.data);
      setuser(response.data.user);
      setImageurl(response.data.user.image_path);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    console.log(file);
    formData.append("file", file);
    try {
      const response = await axios.put(
        `http://localhost:3001/api/updateprofile/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setImageurl(response.data.image_path);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-screen min-h-screen bg-red-400 ">
        <Nav />
        <div className="max-w-[1000px] h-[600px] rounded-md mx-auto bg-white ">
          <div className="relative left-[400px] mb-4 bg-cover bg-no-repeat bg-center">
            <input
              type="file"
              id="file-input"
              onChange={handleChangImage}
              className="hidden" // Hides the default input
            />
            <label
              htmlFor="file-input" // Links the label to the hidden file input
              className="cursor-pointer text-xl text-blue-500 flex "
            >
              <img
                className="w-[200px] h-[200px] rounded-full mb-4 object-cover"
                src={
                  imageurl ? `http://localhost:3001/${imageurl}` : "no image"
                }
                alt="profile"
              />
            </label>
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
        </div>
      </div>
      <Footter />
    </>
  );
}
