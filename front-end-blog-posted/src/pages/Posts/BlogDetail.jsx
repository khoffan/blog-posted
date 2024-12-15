import React from "react";
import { useParams } from "react-router-dom";
import CardDeatil from "../../components/BlogComponents/CardDeatil";
export default function BlogDetail() {
	const { id } = useParams();
	return (
		<>
			<CardDeatil id={id} />
		</>
	);
}
