import React from "react";
import Footter from "../components/Footter";
import { Link } from "react-router-dom";

export default function Login() {
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
                <label className="my-2 w-full" htmlFor="email">
                  <span className="flex flex-col">Email</span>
                  <input
                    className="border rounded-md border-black my-1 px-2 w-full h-10"
                    id="email"
                    placeholder="email"
                    type="email"
                  />
                </label>
                <label className="my-2 w-full" htmlFor="password">
                  <span className="flex flex-col">Password</span>
                  <input
                    className="border rounded-md border-black my-1  px-2 w-full h-10"
                    placeholder="Password"
                    type="password"
                  />
                </label>
                <label className="inline-flex mt-3 items-center">
                  <span className="ml-2 text-gray-700 text-sm">
                    สมัครบัญชีได้ที่นี่
                  </span>
                  <Link to="/signup">
                    <span className="ml-2 text-red-500 text-sm">Register</span>
                  </Link>
                </label>
                <button className="my-5  text-white rounded-md bg-black hover:bg-gray-200 p-2 w-1/2 flex justify-center  hover:text-black hover:border hover:border-black ">
                  <Link to="/create-blog">Login</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footter />
      </div>
    </>
  );
}
