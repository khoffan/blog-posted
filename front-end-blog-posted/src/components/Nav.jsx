import React from "react";

function Nav() {
  return (
    <div className="flex flex-row items-center justify-between p-4 bg-red-500">
      <div className="text-3xl font-bold text-white px-2 flex flex-row">
        Litium
        <from className="mx-5 ">
          <div className="absolute rounded-full overflow-hidden border border-gray-300">
            <input
              className="w-full py-2 px-4 text-lg focus:outline-none focus:shadow-outline"
              id="search"
              type="text"
              placeholder="ค้นหา..."
            />
          </div>
        </from>
      </div>

      <ul className="flex flex-row space-x-4">
        <li>
          <a href="#" className="text-white hover:text-gray-300">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-gray-300">
            About
          </a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-gray-300">
            Contact
          </a>
        </li>
        <button>
          <a
            href="#"
            className="text-white hover:text-gray-300 bg-black hover:bg-gray-300 px-4 py-2"
          >
            Login
          </a>
        </button>
      </ul>
    </div>
  );
}

export default Nav;
