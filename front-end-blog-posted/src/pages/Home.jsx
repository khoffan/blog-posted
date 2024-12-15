import React from "react";
import Nav from "../components/NavbarComponents/Nav";
import Content from "../components/BlogComponents/Content";
import Footter from "../components/Footter";

export default function Home() {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Nav />
                <Content />
                <Footter />
            </div>
        </>
    );
}
