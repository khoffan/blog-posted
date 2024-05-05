import React from "react";

export default function Tagbar() {
  return (
    <>
      <div className="relative col-span-2 border border-black">
        <h1>Tag</h1>
        <div className="absolute left-[50px] top-[20px]">
          <ul className="grid grid-cols-10 gap-4">
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
          </ul>
        </div>
      </div>
    </>
  );
}
