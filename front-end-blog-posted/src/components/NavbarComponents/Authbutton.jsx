import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

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

function Authbutton({ handleCheckLogin }) {
    const [isOpen, setIsopen] = useState(false);

    const togglePopup = () => {
        setIsopen(!isOpen);
    };

    return (
        <>
            <div className="hidden md:flex flex-row justify-center items-center">
                <ul className="flex flex-row justify-center space-x-4">
                    <li
                        className="cursor-pointer text-lg p-2 transition-all duration-500 transfrom hover:text-white"
                        onClick={togglePopup}
                    >
                        Write Your Story
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
            <button className="md:hidden">
                <div className="w-[30px] h-[4px] mb-2 bg-black"></div>
                <div className="w-[30px] h-[4px] mb-2 bg-black"></div>
                <div className="w-[30px] h-[4px] mb-2 bg-black"></div>
            </button>
        </>
    );
}

export default Authbutton;
