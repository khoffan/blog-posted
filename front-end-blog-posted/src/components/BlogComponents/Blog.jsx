export default function Blog({
    index,
    imageUrl,
    name,
    title,
    content,
    creatDate,
    isUser,
}) {
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
                <div
                    key={index}
                    className="z-10 block mx-auto max-w-full h-1/4 border rounded-md p-3 my-2 shadow-md "
                >
                    <div className="flex flex-row items-center justify-between mx-[30px] p-[10px]">
                        <div>
                            <h1 className="text-start text-3xl">{title}</h1>
                        </div>
                        <div>
                            <div className="flex flex-row items-center mx-5">
                                <img
                                    src={`${
                                        import.meta.env.VITE_BASE_API_URI
                                    }/${imageUrl}`}
                                    width={40}
                                    className="rounded-full object-cover"
                                />
                                <p className="text-base font-bold">{name}</p>
                            </div>
                            <p className="text-[10px] font-thin">
                                {formatDate}
                            </p>
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
