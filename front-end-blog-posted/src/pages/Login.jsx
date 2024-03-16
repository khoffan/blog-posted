import React from "react";
import Footter from "../components/Footter";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="grid grid-cols-2 flex-grow">
          <h2 className="text-9xl text-black bg-red-400 p-auto flex flex-col justify-center items-center">
            Litium <p className="text-black text-lg">Blog Post Sing In</p>
          </h2>
          <div className=" flex flex-col justify-center bg-slate-200">
            <div className="mx-36">
              <h1 className="text-3xl text-blod flex justify-center items-center">
                Sing In
              </h1>
              <div className="border boerder-black p-5 flex flex-col justify-center">
                <label className="my-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="border rounded-md border-black px-2 w-3/2"
                  placeholder="email"
                  type="email"
                />
                <label className="my-2" htmlFor="email">
                  Password
                </label>
                <input
                  className="border rounded-md border-black px-2 w-3/2"
                  placeholder="Password"
                  type="password"
                />
                <div className="flex flex-row justify-between mt-2">
                  <p className="text-black text-xs/8">Forget password</p>

                  <h5 className="text-red-500 text-xs/8 hover:text-black">
                    <Link to="/signup">Register-here</Link>
                  </h5>
                </div>
              </div>
              <button className="my-5 ml-36 text-white rounded-md bg-black hover:bg-gray-200 p-2 w-1/2 flex justify-center  hover:text-black hover:border hover:border-red ">
                <a className="">Sing In</a>
              </button>
            </div>
          </div>
        </div>
        <Footter />
      </div>
    </>
  );
}
