import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "./Blog.jsx";
import Footter from "../Footter.jsx";

import Sidebar from "../Sidebar.jsx";
import Tagbar from "../Tagbar.jsx";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading.jsx";

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
            if (response.data.blog != undefined) {
                setIsloading(false);
            }
            console.log(response.data.blogs);
            setContent(response.data.blogs);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setIsloading(false);
            }, 1000);
        }
    };

    const blogDeatil = (id) => {
        navigate(`/blog/deatil/${id}`);
        return false;
    };
    console.log(content);
    return (
        <>
            {isLoading == false ? (
                <>
                    <div className="flex flex-row w-full h-full gap-2 justify-center ">
                        <div className="w-full px-8 overflow-auto h-full md: px-8 w-full overflow-auto h-screen">
                            {content.length > 0 ? (
                                <>
                                    <Tagbar />
                                    {content.map((blog) => {
                                        return (
                                            <>
                                                <button
                                                    key={blog._id}
                                                    className="w-3/4 mx-auto hover:bg-gray-100 hover:transition-all hover:duration-500 hover:ease-in-out hover:scale-105"
                                                    onClick={() =>
                                                        blogDeatil(blog._id)
                                                    }
                                                >
                                                    <Blog
                                                        name={blog.author.name}
                                                        title={blog.title}
                                                        content={
                                                            blog.description
                                                        }
                                                        creatDate={
                                                            blog.createdAt
                                                        }
                                                        imageUrl={
                                                            blog.author.image
                                                        }
                                                        isUser={false}
                                                    />
                                                </button>
                                            </>
                                        );
                                    })}
                                </>
                            ) : (
                                <div className="w-full h-full flex flex-col justify-center items-center">
                                    <div className="text-2xl">
                                        No Blog Found
                                    </div>
                                </div>
                            )}
                        </div>
                        <Sidebar />
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Home;
