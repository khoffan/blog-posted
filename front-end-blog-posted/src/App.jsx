import React, { useState } from "react";
import Home from "./pages/Home.jsx";
import Nav from "./components/Nav.jsx";
import Footter from "./components/Footter.jsx";
import image from "./assets/profile-icon-9.png";

function App() {
  return (
    <>
      <Nav />
      <Home ImageUrl={image} />
      <Footter />
    </>
  );
}

export default App;
