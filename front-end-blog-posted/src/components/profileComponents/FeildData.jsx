import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FeildData({ id, oldData }) {
    const navigate = useNavigate();

    const [newProfile, setNewProfile] = useState({
        name: oldData.first_name + " " + oldData.last_name,
        email: oldData.email,
        address: "ไม่มีข้อมูล",
        phone: "ไม่มีข้อมูล",
        blog_count: oldData.blogs_count,
    });

    const [imageurl, setImageurl] = useState("");

    const handleChangImage = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const formData = new FormData();
        console.log(file);
        formData.append("file", file);
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BASE_API_URI}/api/uploadimage/${id}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data.image_path);
            setImageurl(response.data.image_path);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BASE_API_URI}/api/updateprofile/${id}`,
                {
                    first_name: newProfile.first_name,
                    last_name: newProfile.last_name,
                    email: newProfile.email,
                    address: newProfile.address,
                    phone_nuumber: newProfile.phone,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            navigate(-1);
        }
    };

    const changeName = (event) => {
        setNewProfile({ ...newProfile, name: event.target.value });
    };

    const changeEmail = (event) => {
        setNewProfile({ ...newProfile, email: event.target.value });
    };

    const changeAddress = (event) => {
        setNewProfile({ ...newProfile, address: event.target.value });
    };

    const changePhone = (event) => {
        setNewProfile({ ...newProfile, phone: event.target.value });
    };

    const changeBlogcount = (event) => {
        setNewProfile({ ...newProfile, blog_count: event.target.value });
    };

    return (
        <>
            <div>
                <input
                    type="file"
                    id="file"
                    className="hidden rounded-full w-[80] h-[80]"
                    value=""
                    onChange={handleChangImage}
                />
                <label
                    htmlFor="file"
                    className="mx-auto mt-[20px] w-20 h-20 rounded-full flex items-center justify-center cursor-pointer"
                >
                    {imageurl ? (
                        <img
                            src={`${
                                import.meta.env.VITE_BASE_API_URI
                            }/${imageurl}`}
                            alt="profile"
                        />
                    ) : (
                        <img
                            src={`${import.meta.env.VITE_BASE_API_URI}/${
                                oldData.image_path
                            }`}
                            alt="profile"
                        />
                    )}
                </label>
                <form onSubmit={handleSubmit}>
                    <span className="relative py-[30px] mb-[10px] px-auto block text-xl hover:border hover:border-orange-400">
                        Name:
                        <input
                            type="text"
                            id="name"
                            className="absolute left-[80px] top-[20px] min-w-[500px] max-w-full ml-[80px] px-[10px] rounded-md outline-none h-[50px] border caret-orange-400 focus:outline-none focus:border-gray-400"
                            value={newProfile.name}
                            onChange={changeName}
                        />
                    </span>
                    <span className="relative py-[30px] my-[10px] text-xl px-auto  block hover:border hover:border-orange-400 ">
                        Email:
                        <input
                            type="text"
                            id="email"
                            className="absolute left-[80px] top-[20px] min-w-[500px] max-w-full ml-[80px] px-[10px] rounded-md outline-none h-[50px] border caret-orange-400 focus:outline-none focus:border-gray-400"
                            value={newProfile.email}
                            onChange={changeEmail}
                        />
                    </span>
                    <span className="relative py-[30px] mb-[10px] text-xl px-auto mt-[10px] block hover:border hover:border-orange-400 ">
                        Address:
                        <input
                            type="text"
                            id="address"
                            className="absolute left-[80px] top-[20px] ml-[80px] min-w-[500px] max-w-full px-[10px] rounded-md outline-none h-[50px] border caret-orange-400 focus:outline-none focus:border-gray-400"
                            value={newProfile.address}
                            onChange={changeAddress}
                        />
                    </span>
                    <span className="relative py-[30px] my-[10px] text-xl px-[20px]  block hover:border hover:border-orange-400  ">
                        Phone:
                        <input
                            type="text"
                            id="phone"
                            className="absolute left-[80px] top-[20px] ml-[80px] px-[10px] min-w-[500px] max-w-full rounded-md outline-none  h-[50px] border caret-orange-400 focus:outline-none focus:border-gray-400"
                            value={newProfile.phone}
                            onChange={changePhone}
                        />
                    </span>
                    <span className="relative py-[30px] my-[10px] text-xl px-auto  block  hover:border hover:border-orange-400 ">
                        Blogs count:
                        <input
                            type="number"
                            id="phone"
                            className="absolute left-[80px] top-[20px] ml-[80px] px-[10px] min-w-[500px] max-w-full rounded-md outline-none  h-[50px] border caret-orange-400 focus:outline-none focus:border-gray-400"
                            value={newProfile.blog_count}
                            onChange={changeBlogcount}
                        />
                    </span>
                    <button type="submit">Update</button>
                </form>
            </div>
        </>
    );
}
