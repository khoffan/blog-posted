import React from "react";

export default function Blog({ imageUrl, name, title, content, creatDate, isUser }) {
	const date = new Date(creatDate);
	const options = {
		year: "numeric",
		month: "numeric",
		day: "numeric"
	};
	const formatDate = date.toLocaleDateString("en-US", options);

	const truncateText = (text, wordLimit) => {
		if (text.length > wordLimit) {
			return text.substring(0, wordLimit) + "...";
		}
		return text;
	};
	let contenttrim = truncateText(content, 40);

	return (
		<>
			{isUser == false ? (
				<div className="z-10 block mx-auto max-w-[700px] h-[250px] border rounded-md p-[10px] mb-[5px] mt-[10px] shadow-md hober:outline-offset-0 hover:outline">
					<div className="block flex flex-row items-center mx-5">
						<div className="mx-4 my-4">
							<img
								src={`${import.meta.env.VITE_BASE_API_URI}/${imageUrl}`}
								width="80px"
								className="rounded-full w-[80px]"
							/>
						</div>
						<p>{name}</p>
					</div>
					<div className="flex flex-row items-center justify-between mx-[30px] p-[10px]">
						<div>
							<h1 className="text-start text-3xl">{title}</h1>
							<p className="text-start">{contenttrim}</p>
						</div>
						<div>
							<p className="text-[10px]">{formatDate}</p>
						</div>
					</div>
				</div>
			) : (
				<div className="z-10 relative block mx-auto max-w-[700px] min-h-[250px] border rounded-md p-[10px] mb-[10px] mt-[150px] shadow-md hover:outline-offset-0 hover:outline">
					<div className="block flex flex-row justify-between items-center mx-5">
						<div className="inline mx-4 my-4">
							<img
								src={`${import.meta.env.VITE_BASE_API_URI}/${imageUrl}`}
								width="80px"
								className="inline rounded-full w-[80px]"
							/>
							<p className="inline">{name}</p>
						</div>
					</div>
					<div className="flex flex-row items-center justify-between mx-[30px] p-[10px]">
						<div>
							<h1 className="text-start text-3xl">{title}</h1>
							<p className="text-start">{contenttrim}</p>
						</div>
						<div>
							<p className="text-[15px]">{formatDate}</p>
						</div>
					</div>
					<div className="absolute flex flex-row left-[400px]">
						<button className="inline mx-2 border px-2 w-[100px] bg-gray-400 hover:bg-black hover:text-white">
							Edit
						</button>
						<button className="inline mx-2 border px-2 w-[100px] bg-red-400 hover:bg-red-500">
							Delete
						</button>
					</div>
				</div>
			)}
		</>
	);
}
