import React from "react";
import Blog from "../components/Blog.jsx";
import Nav from "../components/Nav.jsx";
import Footter from "../components/Footter.jsx";

function Home({ ImageUrl }) {
  return (
    <>
      <Nav />
      <div className="mx-60 my 100 py-20 flex flex-col justify-center gap-10">
        <Blog imageUrl={ImageUrl} />
        <Blog imageUrl={ImageUrl} />
        <Blog imageUrl={ImageUrl} />
        <Blog imageUrl={ImageUrl} />
        <Blog imageUrl={ImageUrl} />
        <Blog imageUrl={ImageUrl} />
        <Blog imageUrl={ImageUrl} />
      </div>
      <Footter />
    </>
  );
}

export default Home;
