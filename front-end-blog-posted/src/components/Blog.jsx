import React from "react";

export default function Blog({ imageUrl }) {
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
        <p>name</p>
      </div>
      <div>
        <h1 className="text-3xl">Lorem, ipsum.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores iste
          dolor placeat nulla cupiditate quo. Rerum sunt doloremque pariatur
          rem, earum laborum non ut quibusdam, laboriosam aspernatur libero
          harum in.
        </p>
      </div>
    </>
  );
}
