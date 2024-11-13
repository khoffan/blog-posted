//import React, { useState } from "react";
import Content from "./components/BlogComponents/Content.jsx";
//import image from "./assets/profile-icon-9.png";
import Nav from "./components/Nav.jsx";

function App() {
	return (
		<>
			<div className="flex flex-col gap-4">
				<Nav />
				<Content />
			</div>
		</>
	);
}

export default App;
