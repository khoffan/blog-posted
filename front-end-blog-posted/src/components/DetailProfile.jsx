import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footter from "./Footter";
import { Divider } from "@mui/material";
export default function DetailProfile({ id }) {
  const [user, setuser] = useState({});

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/profile/${id}`
      );
      console.log(response.data);
      setuser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="max-w-screen min-h-screen bg-red-400 ">
        <Nav />
        <div className="max-w-[1000px] h-[600px]  border rounded-md mx-auto bg-white">
          <div className="relative left-[400px] mb-4">
            <img
              className="max-w-fit max-h-fit rounded-full mb-4"
              src="https://picsum.photos/200"
              alt="profile"
            />
          </div>
          <div className="block relative bg-gray-300 w-full h-[310px] border border-black">
            <div className="ml-[50px] relative left-[30px] top-[50px]">
              <div className="px-2 py-2 text-center my-[4px] block text-2xl border border-black rounded-full max-w-[300px] bg-white h-[50px]">
                Name: {user.first_name} {user.last_name}
              </div>
              <div className="text-center px-2 py-2 block text-xl border border-black rounded-full max-w-[300px] bg-white h-[50px]">
                Email: {user.email}
              </div>
            </div>
            <div className="flex flex-row justify-evenly items-center relative top-[200px]   pt-2 w-full h-[80px]">
              <button className="w-48 mx-[50px] px-2 py-2 bg-black text-white h-[50px] rounded-full">
                Update Profile
              </button>
              <button className="w-48 px-2 py-2 h-[50px] rounded-full bg-red-400">
                Delate
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footter />
    </>
  );
}
