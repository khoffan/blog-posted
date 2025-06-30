import { useState } from "react";
import Nav from "../components/NavbarComponents/Nav";
import Content from "../components/BlogComponents/Content";
import Footter from "../components/Footter";

export default function Home() {
	const [sreachInput, setSreachInput] = useState("");
	const [sreach, setSreach] = useState("");

	const handleSreaching = (event) => {
		setSreachInput(event.target.value);
	};

	const handleSearchParams = (event) => {
		try {
			if (event.key === "Enter") {
				event.preventDefault();
				setSreach(sreachInput.trim());
				const searchParams = new URLSearchParams();
				searchParams.set("search", sreach);
				window.location.href = `?${searchParams.toString()}`;
			}
		} catch (error) {
			console.error("Error handling search params:", error);
		}
	};

	return (
		<>
			<div className="min-h-screen flex flex-col">
				<Nav
					sreach={sreach}
					handleSreaching={handleSreaching}
					handleSearchParams={handleSearchParams}
				/>
				<Content search={sreach} />
				<Footter />
			</div>
		</>
	);
}
