import React from "react";
import { useParams } from "react-router-dom";
import CardDeatil from "../../components/BlogComponents/CardDeatil";
import Nav from "../../components/NavbarComponents/Nav";
export default function BlogDetail() {
    const { id } = useParams();
    return (
        <>
            <Nav />
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <CardDeatil id={id} />
            </div>
        </>
    );
}
