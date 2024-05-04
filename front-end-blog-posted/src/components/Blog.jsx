import React from "react";

export default function Blog({ imageUrl, name, title, content }) {
  return (
    <>
      <div className="flex flex-row items-center mx-5">
        <div className="mx-4 my-4">
          <img
            src={imageUrl}
            width="80px"
            alt="name"
            className="rounded-full border-2 border-black"
          />
        </div>
        <p>{name}</p>
      </div>
      <div>
        <h1 className="text-3xl">{title}</h1>
        <p>{content}</p>
      </div>
    </>
  );
}
