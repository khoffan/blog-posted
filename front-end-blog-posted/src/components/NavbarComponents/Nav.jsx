import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

function Nav({ isCreateBlog, publicState }) {
    const [sreach, setSreach] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [isImage, setIsIMage] = useState(false);
    const [isDropdown, setIsDropdown] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const navigate = useNavigate();
    const handleSreaching = (event) => {
        setSreach(event.target.value);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleResponse = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_API_URI}/api/user`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.status === 200) {
                if (res.data.auth == true) {
                    setIsLogin(true);
                }
                const userData = res.data.user;
                setUser(userData);
                if (res.data.user.image_path) {
                    setIsIMage(true);
                }
            }
            //console.log(res.data.user.image_path);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/");
                // Handle token expiration here, for example, by redirecting to the login page
                setIsLogin(false); // You can also call your alertToken function here if needed
            } else {
                // Handle other types of errors
                console.log("Error:", error);
            }
        }
    };

    const handleProfileNvigate = () => {
        if (isLogin) {
            navigate(`/user/profile/`, { state: { user } });
            //console.log(user.email);
        } else {
            navigate("/login");
        }
    };
    const handletoWriteblog = () => {
        if (isLogin) {
            navigate(`/create-blog/${user.authid}`);
            //console.log(user.email);
        } else {
            navigate("/");
        }
    };
    const handletoblogpage = () => {
        if (isLogin) {
            navigate(`/blog/${user.authid}`);
        } else {
            navigate("/");
        }
    };

    const handleCheckLogin = () => {
        if (!isLogin) {
            navigate("/login");
        }
    };

    const handleDropdown = () => {
        setIsDropdown(!isDropdown);
    };

    const handleLogout = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3001/api/logout",
                null,
                {
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                setIsLogin(false);
                setAlertMessage(res.data.message);
                setTimeout(() => {
                    navigate("/", { state: { isLogin: true } });
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleResponse();
    }, []);

    return (
        <>
            <Header
                handleCheckLogin={handleCheckLogin}
                handleDropdown={handleDropdown}
                handleLogout={handleLogout}
                handleProfileNvigate={handleProfileNvigate}
                handleSreaching={handleSreaching}
                handletoWriteblog={handletoWriteblog}
                handletoblogpage={handletoblogpage}
                publicState={publicState}
                isCreateBlog={isCreateBlog}
                isDropdown={isDropdown}
                isImage={isImage}
                isLogin={isLogin}
                user={user}
                sreach={sreach}
                toggleSearch={toggleSearch}
                isSearchOpen={isSearchOpen}
                alertMessage={alertMessage}
            />
        </>
    );
}

export default Nav;
