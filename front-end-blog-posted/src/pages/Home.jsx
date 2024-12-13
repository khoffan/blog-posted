import React from "react";
import Nav from "../components/NavbarComponents/Nav";
import Content from "../components/BlogComponents/Content";

export default function Home() {
    return (
        <>
            <div className="min-h-screen flex flex-col gap-4">
                <Nav />
                <Content />
            </div>
        </>
    );
}
