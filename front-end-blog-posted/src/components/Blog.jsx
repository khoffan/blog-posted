import React from "react";

export default function Blog({ imageUrl, name, title, content, creatDate }) {
  const date = new Date(creatDate);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const formatDate = date.toLocaleDateString("en-US", options);

  return (
    <>
      <div className="block mx-auto max-w-[600px] h-[200px] border rounded-md p-[10px] mb-[10px] shadow-md hober:outline-offset-0 hover:outline">
        <div className="flex flex-row items-center mx-5">
          <div className="mx-4 my-4">
            <img
              src={imageUrl}
              width="80px"
              alt="name"
              className="rounded-full border-2 border-black invisible"
            />
          </div>
          <p>{name}</p>
        </div>
        <div className="flex flex-row items-center justify-between mx-[30px] p-[10px]">
          <div>
            <h1 className="text-3xl">{title}</h1>
            <p>{content}</p>
          </div>
          <div>
            <p className="text-[10px]">{formatDate}</p>
          </div>
        </div>
      </div>
    </>
  );
}
