import React, { useState } from "react";
import Home from "./pages/Home.jsx";
//import image from "./assets/profile-icon-9.png";
import Nav from "./components/Nav.jsx";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const { isLogin } = location.state || {};
  console.log(isLogin);

  return (
    <>
      <Nav />
      <Home isLogin={isLogin} />
    </>
  );
}

export default App;
