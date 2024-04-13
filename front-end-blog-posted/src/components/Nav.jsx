import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import axios from "axios";

function Nav() {
  const [sreach, setSreach] = useState("");

  const handleSreaching = (event) => {
    setSreach(event.target.value);
    console.log(sreach);
  };

  const ModifyButtonLogin = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    "&:hover": {
      backgroundColor: grey[700],
    },
  }));
  const ModifyButtonSignUp = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[50],
    "&:hover": {
      backgroundColor: grey[700],
    },
  }));

  return (
    <div className="flex flex-row items-center justify-between p-6 bg-red-500">
      <div className="text-3xl font-bold text-white px-2 flex  justify-center items-center">
        <Link to="/">Litium</Link>
        <div className="mx-5">
          <input
            className="rounded-full px-5 text-l text-black input-field w-full py-1 px-2 text-lg focus:outline-none focus:shadow-outline "
            id="search"
            name="search"
            type="text"
            placeholder="Search..."
            value={sreach}
            onChange={handleSreaching}
          />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center mx-5">
        <ul className="flex flex-row justify-center space-x-4">
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
              Blog
            </a>
          </li>
        </ul>
        <div className="mx-5 flex flex-row justify-center space-x-4">
          <ModifyButtonLogin variant="contained">
            <Link to="/login">login</Link>
          </ModifyButtonLogin>
          <ModifyButtonSignUp variant="contained">
            <Link to="/signup">signup</Link>
          </ModifyButtonSignUp>
        </div>
      </div>
    </div>
  );
}

export default Nav;
