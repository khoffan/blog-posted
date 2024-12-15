import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../NavbarComponents/Nav";
import Footter from "../Footter";
import FeildDataProfile from "./FeildDataProfile";
export default function UpdateProfileDetail({ id, oldData }) {
    return (
        <>
            <div className="w-full h-full">
                <Nav />

                <div className="w-full h-full my-2">
                    <FeildDataProfile
                        id={id}
                        oldData={oldData}
                        isUpdate={true}
                    />
                </div>
                <Footter />
            </div>
        </>
    );
}
