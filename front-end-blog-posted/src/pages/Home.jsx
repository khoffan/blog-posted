import React from "react";
import Blog from "../components/Blog.jsx";

function Home({ ImageUrl }) {
  return (
    <div className="mx-60 my 100 py-20 flex flex-col justify-center gap-10">
      <Blog imageUrl={ImageUrl} />
      <Blog imageUrl={ImageUrl} />
      <Blog imageUrl={ImageUrl} />
      <Blog imageUrl={ImageUrl} />
      <Blog imageUrl={ImageUrl} />
      <Blog imageUrl={ImageUrl} />
      <Blog imageUrl={ImageUrl} />
    </div>
  );
}

export default Home;
