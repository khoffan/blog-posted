import React from "react";
import Footter from "../components/Footter";
export default function Register() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="grid grid-cols-2 flex-grow">
          <h2 className="text-9xl text-black bg-red-400 p-auto flex flex-col justify-center items-center">
            Litium <p className="text-black text-lg">Blog Post Sing Up</p>
          </h2>
          <div className=" flex flex-col justify-center bg-slate-200">
            <div className="mx-36">
              <h1 className="text-3xl text-blod flex justify-center items-center">
                Sing Up
              </h1>
              <div className="border boerder-black p-5 flex flex-col justify-center items-center">
                <label className="my-2" htmlFor="Name">
                  <span className="flex flex-col">Name</span>
                  <input
                    className="border rounded-md border-black my-1 px-2 w-full"
                    placeholder="name"
                    type="text"
                  />
                </label>
                <label className="my-2" htmlFor="Name">
                  <span className="flex flex-col">Last name</span>
                  <input
                    className="border rounded-md border-black px-2 my-1 w-full"
                    placeholder="lastname"
                    type="text"
                  />
                </label>
                <label className="my-2" htmlFor="email">
                  <span className="flex flex-col">Email</span>
                  <input
                    className="border rounded-md border-black my-1 px-2 w-full"
                    placeholder="email"
                    type="email"
                  />
                </label>
                <label className="my-2" htmlFor="password">
                  <span className="flex flex-col">Password</span>
                  <input
                    className="border rounded-md border-black my-1  px-2 w-full"
                    placeholder="Password"
                    type="password"
                  />
                </label>
                <label className="inline-flex mt-3 items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700 text-sm">
                    กดที่นี่เพื่อยื่นยันข้อตกลง
                  </span>
                </label>
                <button className="my-5  text-white rounded-md bg-black hover:bg-gray-200 p-2 w-1/2 flex justify-center  hover:text-black hover:border hover:border-red ">
                  <a className="">Sing Up</a>
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
