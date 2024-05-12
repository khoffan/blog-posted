import React from "react";

export default function Sidebar() {
  return (
    <>
      <div className="relative row-span-3 h-full border border-black max-w-[300px]">
        <h1 className="text-3xl text-start ml-[20px]">blog</h1>
        <div className="absolute left-[50px] top-[50px]">
          <ul>
            <li>menu1</li>
            <li>menu2</li>
            <li>menu3</li>
            <li>menu4</li>
          </ul>
        </div>
      </div>
    </>
  );
}
