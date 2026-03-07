import Dropdown from "../Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"; // Used regular instead of solid for cleaner look

const API = import.meta.env.VITE_BASE_API_URI;

function ProfileAvatar({
	user,
	isImage,
	handleDropdown,
	isDropdown,
	handleProfileNavigate,
	handleLogout,
	handleToBlogPage,
}) {
	return (
		<div className="relative flex items-center ml-2 border-l border-gray-200 pl-4">
			<button
				onClick={handleDropdown}
				className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
			>
				<img
					className="w-9 h-9 object-cover rounded-full border border-gray-200"
					src={
						isImage
							? `${API}/${user.image_path}`
							: "https://api.dicebear.com/7.x/initials/svg?seed=" + (user.first_name || "U")
					}
					alt={user.first_name}
				/>
			</button>
			
			{isDropdown && (
				<div className="absolute right-0 top-12">
					<Dropdown
						navProfile={handleProfileNavigate}
						logoutevent={handleLogout}
						yourBlog={handleToBlogPage}
						user={user}
						isImage={isImage}
					/>
				</div>
			)}
		</div>
	);
}

function UserMenu({
	handleToWriteBlog,
	user = {},
	handleDropdown,
	isImage,
	isDropdown,
	handleProfileNavigate,
	handleLogout,
	handleToBlogPage,
	isCreateBlog,
	publicState,
}) {
	return (
		<div className="flex items-center gap-4">
			{isCreateBlog && user != null ? (
				<button
					className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors shadow-sm"
					onClick={(e) => publicState(e)}
				>
					Publish
				</button>
			) : (
				<button
					className="hidden sm:flex items-center gap-2 text-gray-500 hover:text-black font-medium text-sm transition-colors"
					onClick={handleToWriteBlog}
				>
					<FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
					<span>Write</span>
				</button>
			)}

			<ProfileAvatar
				handleDropdown={handleDropdown}
				handleLogout={handleLogout}
				handleProfileNavigate={handleProfileNavigate}
				handleToBlogPage={handleToBlogPage}
				isDropdown={isDropdown}
				isImage={isImage}
				user={user}
			/>
		</div>
	);
}

export default UserMenu;
