import PropTypes from "prop-types";

export default function Blog({
    index,
    imageUrl,
    name,
    title,
    creatDate,
    isUser,
    tags = [],
}) {
    Blog.propTypes = {
        index: PropTypes.number,
        imageUrl: PropTypes.string,
        name: PropTypes.string,
        title: PropTypes.string,
        creatDate: PropTypes.string,
        isUser: PropTypes.bool,
        tags: PropTypes.array,
    };
    const date = new Date(creatDate);
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    const formatDate = date.toLocaleDateString("en-US", options);

    // const truncateText = (text, wordLimit) => {
    // 	if (text.length > wordLimit) {
    // 		return text.substring(0, wordLimit) + "...";
    // 	}
    // 	return text;
    // };
    // let contenttrim = truncateText(content, 40);
    return (
        <>
            {isUser == false ? (
                <div className="z-10 w-full h-auto border border-gray-300 rounded-md p-3 my-2 shadow-md hover:shadow-lg hover:bg-gray-100">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-2 md:p-[10px] space-y-4 md:space-y-0">
                        <div className="flex flex-col gap-4 items-start w-full md:w-2/3">
                            <h1 className="text-start text-xl md:text-3xl">
                                {title}
                            </h1>
                            <div className="flex flex-row flex-wrap items-center gap-2">
                                {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="text-xs md:text-sm py-1 px-2 md:px-4 border border-gray-600 text-black rounded-lg"
                                    >
                                        {tag.tagname}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="w-full md:w-auto">
                            <div className="flex flex-row items-center gap-2 md:gap-4">
                                <img
                                    src={`${
                                        import.meta.env.VITE_BASE_API_URI
                                    }/${imageUrl}`}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                    alt={name}
                                />
                                <div>
                                    <p className="text-sm md:text-base font-bold">
                                        {name}
                                    </p>
                                    <p className="text-[10px] font-thin">
                                        {formatDate}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    key={index}
                    className="w-1/2 p-4 mx-auto border border-gray-300 rounded-md showdow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                    <div className="flex flex-row gap-4 items-center justify-between my-4">
                        <div className="flex flex-row items-center justify-between gap-2">
                            <div>
                                <h1 className="text-start text-3xl">{title}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end">
                            <div className="flex flex-row items-center">
                                <img
                                    src={`${
                                        import.meta.env.VITE_BASE_API_URI
                                    }/${imageUrl}`}
                                    width={30}
                                    className="rounded-full object-cover"
                                />
                                <p className="text-base font-bold">{name}</p>
                            </div>
                            <div>
                                <p className="text-[15px]">{formatDate}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 justify-end mx-5 p-2">
                        <button className="p-2 bg-blue-500 w-32 rounded-lg">
                            Edit
                        </button>
                        <button className="p-2 bg-red-500 w-32 rounded-lg">
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
