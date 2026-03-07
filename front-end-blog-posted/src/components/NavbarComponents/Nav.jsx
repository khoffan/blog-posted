import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import useAuthStore from "../../store/useAuthStore";

function Nav({ isCreateBlog, publicState }) {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isDropdown, setIsDropdown] = useState(false);

	const { user, isLogin, isImage, fetchUser, logout } = useAuthStore();
	const navigate = useNavigate();

	const toggleSearch = () => {
		setIsSearchOpen(!isSearchOpen);
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const handleProfileNavigate = () => {
		if (isLogin) {
			navigate(`/user/profile/`);
		} else {
			navigate("/login");
		}
	};

	const handleToWriteBlog = () => {
		if (isLogin && user) {
			navigate(`/create-blog/${user.authid}`);
		} else {
			navigate("/");
		}
	};

	const handleToBlogPage = () => {
		if (isLogin && user) {
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
		const result = await logout();
		if (result.success) {
			setTimeout(() => {
				navigate("/");
			}, 500);
		}
	};

	return (
		<Header
			handleCheckLogin={handleCheckLogin}
			handleDropdown={handleDropdown}
			handleLogout={handleLogout}
			handleProfileNavigate={handleProfileNavigate}
			handleToWriteBlog={handleToWriteBlog}
			handleToBlogPage={handleToBlogPage}
			publicState={publicState}
			isCreateBlog={isCreateBlog}
			isDropdown={isDropdown}
			isImage={isImage}
			isLogin={isLogin}
			user={user}
			toggleSearch={toggleSearch}
			isSearchOpen={isSearchOpen}
		/>
	);
}

export default Nav;
