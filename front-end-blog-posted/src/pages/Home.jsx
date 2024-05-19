import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "../components/Blog.jsx";
import Footter from "../components/Footter.jsx";
import Tagbar from "../components/Tagbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Home({ isLogin }) {
  const [content, setContent] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isToken, setIsToken] = useState(false);

  const navigate = useNavigate();
  //console.log(token);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setIsloading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/blogs", {
        withCredentials: true,
      });
      //console.log(response.data.blogs);
      setContent(response.data.blogs);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const blogDeatil = (id) => {
    navigate(`/blog/deatil/${id}`);
    return false;
  };

  return (
    <>
      <div className="h-screen pt-[20px] grid grid-row-3 grid-flow-col row-auto gab-4">
        <Sidebar />
        {content.map((blog) => (
          <button
            key={blog._id}
            className="block row-span-1 col-span-3 h-full max-w-full pt-[20px]"
            onClick={() => blogDeatil(blog._id)}
          >
            <Blog
              name={blog.author.name}
              title={blog.title}
              content={blog.description}
              creatDate={blog.createdAt}
            />
          </button>
        ))}
        =<div className="col-span-3"></div>
      </div>
      <Footter />
    </>
  );
}

export default Home;
