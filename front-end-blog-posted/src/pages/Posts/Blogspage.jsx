import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "../../components/Blog";

export default function Blogspage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);
  const getBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URI}/api/blogs/`
      );

      setBlogs(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  const blogDeatil = (id) => {
    navigate(`/blog/deatil/${id}`);
    return false;
  };

  return (
    <>
      {blogs.map((blog) => (
        <button
          key={blog._id}
          className="w-full h-full pt-[20px]"
          //onClick={() => blogDeatil(blog._id)}
        >
          <Blog
            name={blog.author.name}
            title={blog.title}
            content={blog.description}
            creatDate={blog.createdAt}
            imageUrl={blog.author.image}
            isUser={true}
          />
        </button>
      ))}
    </>
  );
}
