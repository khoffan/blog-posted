import React, { useState } from "react";
import Home from "./pages/Home.jsx";
import image from "./assets/profile-icon-9.png";

function App() {
  return (
    <>
      <Home ImageUrl={image} />
    </>
  );
}

export default App;
