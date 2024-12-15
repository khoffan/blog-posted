import React from "react";
import Dropdown from "../Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function Profile({
    user,
    isImage,
    handleDropdown,
    isDropdown,
    handleProfileNvigate,
    handleLogout,
    handletoblogpage,
}) {
    return (
        <>
            <div className="flex flex-row justify-center items-center mx-5">
                <div className="hidden md:flex items-center">
                    <button
                        id="dropdownButton"
                        onClick={handleDropdown}
                        className="relative inline-block text-left"
                    >
                        <img
                            className="w-[60px] h-[50px] mx-2 bg-transparent rounded-full"
                            src={
                                isImage
                                    ? `http://localhost:3001/${user.image_path}`
                                    : "https://via.placeholder.com/150"
                            }
                            alt=""
                        />
                        {isDropdown && (
                            <Dropdown
                                navProfile={handleProfileNvigate}
                                logoutevent={handleLogout}
                                yourBlog={handletoblogpage}
                                user={user}
                                isImage={isImage}
                            />
                        )}
                    </button>
                    <p className="text-white outline-none cursor-default text-lg">
                        {user.first_name}
                    </p>
                </div>
            </div>
            <div className="absolute left-[150px] flex flex-col justify-center items-center  md:hidden">
                <div className="w-[25px] h-[4px] bg-black mb-1"></div>
                <div className="w-[25px] h-[4px] bg-black mb-1"></div>
                <div className="w-[25px] h-[4px] bg-black mb-1"></div>
            </div>
        </>
    );
}

function UserMenu({
    handletoWriteblog,
    user = {},
    handleDropdown,
    isImage,
    isDropdown,
    handleProfileNvigate,
    handleLogout,
    handletoblogpage,
    alertMessage,
    isCreateBlog,
    publicState,
}) {
    return (
        <>
            {isCreateBlog && user != null ? (
                <div className="relative flex flex-row justify-center items-center ">
                    <ul className="flex flex-row justify-center space-x-4">
                        <button
                            className="text-white cursor-pointer text-center rounded-full px-6 p-2 mx-2 transition ease-in-out hover:-translate-y-1 hover:duration-500 hover:bg-blue-700 "
                            onClick={(e) => publicState(e)}
                        >
                            Public
                        </button>
                    </ul>

                    <Profile
                        handleDropdown={handleDropdown}
                        handleLogout={handleLogout}
                        handleProfileNvigate={handleProfileNvigate}
                        handletoblogpage={handletoWriteblog}
                        isDropdown={isDropdown}
                        isImage={isImage}
                        user={user}
                    />
                </div>
            ) : (
                <div className="relative flex flex-row justify-center items-center ">
                    <ul className="flex flex-row justify-center space-x-4 mx-3">
                        <li
                            className="md:mx-5 hover:text-white outline-none cursor-pointer"
                            onClick={handletoWriteblog}
                        >
                            Write Blog <FontAwesomeIcon icon={faPenToSquare} />
                        </li>
                    </ul>

                    <Profile
                        handleDropdown={handleDropdown}
                        handleLogout={handleLogout}
                        handleProfileNvigate={handleProfileNvigate}
                        handletoblogpage={handletoWriteblog}
                        isDropdown={isDropdown}
                        isImage={isImage}
                        user={user}
                    />
                </div>
            )}
        </>
    );
}

export default UserMenu;
