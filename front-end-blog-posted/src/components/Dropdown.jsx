import { PropTypes } from "prop-types";

function LiComponent({ navTraffic, name }) {
    LiComponent.propTypes = {
        navTraffic: PropTypes.func,
        name: PropTypes.string,
    };

    return (
        <li className="mb-2 border border-1 border-gray-200">
            <button
                className="block px-4 py-2 w-full text-gray-800 hover:bg-gray-100"
                onClick={() => navTraffic()}
            >
                {name}
            </button>
        </li>
    );
}

export default function Dropdown({
    navProfile,
    logoutevent,
    yourBlog,
    alertMessage,
    user,
    isImage,
}) {
    Dropdown.propTypes = {
        navProfile: PropTypes.func,
        logoutevent: PropTypes.func,
        yourBlog: PropTypes.func,
        alertMessage: PropTypes.string,
        user: PropTypes.object,
        isImage: PropTypes.bool,
    };
    return (
        <>
            <div
                id="dropdown"
                className="absolute bg-white top-0 inset-x-0 mt-2 w-[200px] h-[300px] border border-2 border-gray-300 rounded-md z-100"
            >
                <div>
                    <img
                        className="w-[60px] h-[50px] mx-2 bg-transparent rounded-full"
                        src={
                            isImage
                                ? `http://localhost:3001/${user.image_path}`
                                : "https://via.placeholder.com/150"
                        }
                        alt=""
                    />
                </div>
                <ul className="py-1">
                    <LiComponent navTraffic={navProfile} name={"Profile"} />
                    <LiComponent
                        navTraffic={logoutevent}
                        name={"Log Out"}
                        alertMessage={alertMessage}
                    />
                    <LiComponent navTraffic={yourBlog} name={"Your Blog"} />
                </ul>
            </div>
        </>
    );
}
