import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "../components/Blog.jsx";
import Nav from "../components/Nav.jsx";
import Footter from "../components/Footter.jsx";

function Home({ ImageUrl }) {
  const [content, setContent] = useState([
    {
      title: "My Title",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque vel, quas nesciunt quae, perferendis obcaecati quo voluptatum, ratione possimus iusto atque reprehenderit architecto nisi itaque. Repellat vero cumque incidunt. Expedita at facere temporibus vitae, repellat aliquid fugiat illum iure? Modi eos ratione ipsa sed repellendus recusandae, cumque quidem, nostrum ex consequuntur natus eius ut libero, pariatur maxime optio vel corporis beatae dignissimos. Praesentium, rem quod consequuntur consequatur doloremque deleniti enim minus aliquam ratione accusamus laborum nobis quaerat? Sit aperiam repellendus odio, expedita doloremque, sint aut incidunt dolore perspiciatis quidem, illum dicta vero nam tempore suscipit harum culpa quas molestiae porro",
    },
  ]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/blogs");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Nav />
      <div className="mx-60 my 100 py-20 flex flex-col justify-center gap-10"></div>
      <Footter />
    </>
  );
}

export default Home;
