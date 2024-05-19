import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
export default function CardDeatil({ id }) {
  const [blogDeatil, setBlogDetail] = useState({});
  //  console.log(id);
  useEffect(() => {
    getBlogbyId();
  }, []);

  const getBlogbyId = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/blog/${id}`);
      //  console.log(response.data.blog);
      setBlogDetail(response.data.blog);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogbyId();
  }, []);

  return (
    <>
      <Nav />
      <div className="block w-full h-screen border-box bg-red-200">
        <div className="p-10 h-full flex flex-col justify-center items-center gap-4 ">
          <div
            id="user-and-title"
            className="p-10 bg-red-400 max-w-[600px] w-full h-[100px]"
          >
            {blogDeatil.title}
          </div>
          <div
            id="tag"
            className="p-10 bg-red-400 max-w-[600px] w-full h-[100px]"
          >
            tag
          </div>
          <div
            id="content"
            className="p-10 bg-red-400 max-w-[600px] w-full h-[500px]"
          >
            {blogDeatil.description}
          </div>
        </div>
      </div>
    </>
  );
}
