import React, { useState, useEffect } from "react";
import axios from "axios";
import Footter from "../components/Footter";
import Fromfeild from "../components/Fromfeild";
export default function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [massage, setMassage] = useState("");

  const clearValue = () => {
    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/register",
        {
          first_name: fname,
          last_name: lname,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMassage(response.data.message);
      clearValue();
    } catch (error) {
      setMassage(error.response.data.message);
    }
  };

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
                <Fromfeild
                  title="Name"
                  value={fname}
                  onChange={(value) => setFname(value)}
                />
                <Fromfeild
                  title="Last Name"
                  value={lname}
                  onChange={(value) => {
                    setLname(value);
                  }}
                />
                <Fromfeild
                  title="Email"
                  value={email}
                  onChange={(value) => setEmail(value)}
                />
                <Fromfeild
                  title="Password"
                  value={password}
                  onChange={(value) => setPassword(value)}
                />
                <label className="inline-flex mt-3 items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700 text-sm">
                    กดที่นี่เพื่อยื่นยันข้อตกลง
                  </span>
                </label>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="my-5  text-white rounded-md bg-black hover:bg-gray-200 p-2 w-1/2 flex justify-center  hover:text-black hover:outline-black "
                >
                  Sign Up
                </button>
                {massage && <p>{massage}</p>}
              </div>
            </div>
          </div>
        </div>
        <Footter />
      </div>
    </>
  );
}
