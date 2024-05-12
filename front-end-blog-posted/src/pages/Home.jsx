import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "../components/Blog.jsx";
import Footter from "../components/Footter.jsx";
import Tagbar from "../components/Tagbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Cookies from "js-cookie";

function Home({ isLogin }) {
  const [content, setContent] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isToken, setIsToken] = useState(false);

  const token = Cookies.get();
  console.log(token);
  useEffect(() => {
    if (token) {
      setIsToken(true);
    }
    if (isToken || isLoading == false) {
      getData();
    }
  }, [isToken]);
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
  return (
    <>
      <div className="h-screen pt-[20px] grid grid-row-4 grid-flow-col row-auto gab-4">
        <Sidebar />
        <Tagbar />

        <div className="row-span-2 h-full col-span-2 border border-black max-w-full pt-[20px]">
          {content.map((blog) => (
            <Blog
              key={blog._id}
              name={blog.author.name}
              title={blog.title}
              content={blog.description}
              creatDate={blog.createdAt}
            />
          ))}
        </div>
        <div></div>
      </div>
      <Footter />
    </>
  );
}

export default Home;
