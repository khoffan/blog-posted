import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "../components/Blog.jsx";
import Nav from "../components/Nav.jsx";
import Footter from "../components/Footter.jsx";
import Tagbar from "../components/Tagbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

function Home({ ImageUrl }) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/blogs");
      //console.log(response.data.blogs);
      setContent(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Nav />
      <div className="h-screen pt-[20px] grid grid-row-3 grid-flow-col row-auto gab-4">
        <Sidebar />
        <Tagbar />

        <div className="row-span-2 h-full col-span-2 border border-black ">
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
      </div>
      <Footter />
    </>
  );
}

export default Home;
