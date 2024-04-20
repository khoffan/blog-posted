import React, { useState } from "react";
import { useLocation } from "react-router-dom";
export default function Profile() {
  const location = useLocation();
  const { user } = location.state;

  return (
    <div className="w-full h-screen py-4 bg-red-400">
      <div className="flex flex-col w-1/2 h-full mx-auto p-2 border rounded-md bg-white">
        <div className="block rounded-full w-32 h-32 m-auto border border-black mt-10 mb-10">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="profile"
            className="rounded-full"
          />
        </div>
        <div className="mx-auto mb-4">
          <button className="border rounded-md border-black px-2">Edit</button>
        </div>
        <div className="grid grid-cols-2 gap-4 mx-10">
          <div className="col-span-1">Name: {user.first_name}</div>
          <div className="col-span-1">Last Name: {user.last_name}</div>
          <div className="col-span-1">Email: {user.email}</div>
        </div>
      </div>
    </div>
  );
}
