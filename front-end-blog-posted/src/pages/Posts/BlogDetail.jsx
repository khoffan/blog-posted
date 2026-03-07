import React, { useEffect, useState } from "react";
import Nav from "../../components/NavbarComponents/Nav";
import { useParams } from "react-router-dom";
import CardDetail from "../../components/BlogComponents/CardDetail";

export default function BlogDetail() {
	const { id } = useParams();

	return (
		<div className="min-h-screen bg-white">
			<Nav />
			<main className="w-full">
				<CardDetail id={id} />
			</main>
		</div>
	);
}
