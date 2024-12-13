import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-litium.png";
import UserMenu from "./Usermenu";
import Authbutton from "./Authbutton";

function Header({
    sreach,
    isCreateBlog,
    isLogin,
    user = {},
    publicState,
    handleDropdown,
    isImage,
    isDropdown,
    handleCheckLogin,
    handleLogout,
    handleProfileNvigate,
    handleSreaching,
    handletoWriteblog,
    handletoblogpage,
    alertMessage,
    toggleSearch,
    isSearchOpen,
}) {
    console.log(user);
    return (
        <>
            {isCreateBlog == true && user != null ? (
                <div className="z-[102] top-0 left-0 w-full flex flex-row items-center justify-evenly p-6 bg-red-500">
                    <div className="flex items-center gap-4">
                        <Link to="/">
                            <div className="flex items-center">
                                <img
                                    src={logo}
                                    alt="profile"
                                    className="w-[60px] h-[50px] mx-2 bg-transparent rounded-full"
                                />
                                <span className="text-3xl font-bold text-white">
                                    Litium
                                </span>
                            </div>
                        </Link>
                        <span className="text-base text-gray-400 pt-[10px]">
                            Write by {user.first_name}
                        </span>
                    </div>

                    {isLogin ? (
                        <UserMenu
                            handleDropdown={handleDropdown}
                            handleProfileNvigate={handleProfileNvigate}
                            handleLogout={handleLogout}
                            handletoWriteblog={handletoWriteblog}
                            handletoblogpage={handletoblogpage}
                            alertMessage={alertMessage}
                            isDropdown={isDropdown}
                            isImage={isImage}
                            user={user}
                            isCreateBlog={isCreateBlog}
                            publicState={publicState}
                        />
                    ) : (
                        <Authbutton handleCheckLogin={handleCheckLogin} />
                    )}
                </div>
            ) : (
                <div className="z-[102] top-0 left-0 w-full flex flex-row items-center justify-between pl-[50px] pr-[80px] p-6 bg-red-500">
                    <div className="text-3xl font-bold text-white px-2 flex  justify-center items-center">
                        <Link to="/">
                            <div className="flex items-center">
                                <img
                                    src={logo}
                                    alt="profile"
                                    className="w-[60px] h-[50px] mx-2 bg-transparent rounded-full"
                                />
                                <span className="text-3xl font-bold text-white">
                                    Litium
                                </span>
                            </div>
                        </Link>
                        <div className="mx-5">
                            <div className="hidden md:flex items-center gap-2 rounded-full bg-gray-100 text-base font-light px-4 py-1 focus-within:border focus-within:border-gray-500 shadow-sm transition-all">
                                {/* ไอคอนค้นหา */}
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="text-gray-500"
                                />

                                {/* ช่อง Input */}
                                <input
                                    className="w-full bg-transparent text-sm font-light h-full py-1 px-2 focus:bg-white focus:outline-none text-gray-700 rounded-full placeholder-gray-400"
                                    id="search"
                                    name="search"
                                    type="text"
                                    placeholder="Search..."
                                    value={sreach}
                                    onChange={handleSreaching}
                                />
                            </div>

                            <button
                                className="md:hidden p-2 rounded-full"
                                onClick={toggleSearch}
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>

                            {isSearchOpen && (
                                <>
                                    <input
                                        className="transition-all duration-300 bg-inherite rounded-full mx-4 px-5 text-white w-1/2 py-1 px-2 text-lg outline-2 ouline-black focus:shadow-outline"
                                        id="search"
                                        name="search"
                                        type="text"
                                        placeholder="Search..."
                                        value={sreach}
                                        onChange={handleSreaching}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    {isLogin ? (
                        <UserMenu
                            handleDropdown={handleDropdown}
                            handleProfileNvigate={handleProfileNvigate}
                            handleLogout={handleLogout}
                            handletoWriteblog={handletoWriteblog}
                            handletoblogpage={handletoblogpage}
                            isDropdown={isDropdown}
                            isImage={isImage}
                            user={user}
                        />
                    ) : (
                        <Authbutton handleCheckLogin={handleCheckLogin} />
                    )}
                </div>
            )}
        </>
    );
}

export default Header;
