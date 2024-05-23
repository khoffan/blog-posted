import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../../components/Nav";
export default function BlogIpdate({ id }) {
  const [olddetail, setOlddetail] = useState({
    name: "",
    title: "",
    content: "",
    createDate: "",
    imageurl: "",
  });
  const [newDetail, setNewdetail] = useState({});
  const fetchdataforupdate = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_API_URI}/api/updateprofile/${id}`
      );
      setNewdetail(response.data.blog);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-red-400">
        <Nav />
        <div className="w-1/2 border rounded-md p-2 mx-auto my-2 bg-white">
          <h1 className="text-3xl">Update Post</h1>
          <form className="mt-4 flex flex-col ">
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-black "
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="border rounded-md border-black px-2 w-full"
                id="title"
                type="text"
                placeholder="title"
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-black "
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                name="descriptions"
                id="descriptions"
                cols="30"
                rows="10"
                className="border rounded-md border-black p-2 w-full"
                placeholder="description"
              ></textarea>
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-black "
                htmlFor="image"
              >
                Image
              </label>
              <input
                className="border rounded-md border-black"
                type="file"
                id="image"
              />
            </div>
            <div className="mb-4 mx-4">
              <button
                type="submit"
                className="w-1/2 bg-black text-white border rounded-md border-black py-2"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
