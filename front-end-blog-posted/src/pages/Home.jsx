import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "../components/Blog.jsx";
import Footter from "../components/Footter.jsx";

import Sidebar from "../components/Sidebar.jsx";

import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading.jsx";

function Home() {
  const [content, setContent] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  //console.log(token);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setIsloading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URI}/api/blogs`,
        {
          withCredentials: true,
        }
      );
      //console.log(response.data.blogs);
      setContent(response.data.blogs);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsloading(false);
      }, 500);
    }
  };

  const blogDeatil = (id) => {
    navigate(`/blog/deatil/${id}`);
    return false;
  };

  return (
    <>
      {isLoading == true ? (
        <Loading />
      ) : (
        <div className="h-screen pt-[20px] grid grid-row-3 grid-flow-col row-auto gab-4">
          <Sidebar />
          {content.map((blog) => (
            <button
              key={blog._id}
              className="block col-span-2 row-span-2 h-full max-w-full pt-[20px]"
              onClick={() => blogDeatil(blog._id)}
            >
              <Blog
                name={blog.author.name}
                title={blog.title}
                content={blog.description}
                creatDate={blog.createdAt}
                imageUrl={blog.author.image}
              />
            </button>
          ))}
          =<div className="col-span-2"></div>
        </div>
      )}
      <Footter />
    </>
  );
}

export default Home;
