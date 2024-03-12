import React from "react";

function Home() {
  return (
    <div className="mx-60 my 100 py-20">
      <div className="flex flex-row items-center">
        <div className="mx-4 my-4">
          <img src="../assets/profile-icon-9.png" />
        </div>
        <p>author </p>
      </div>
      <div>
        <h1 className="text-3xl">title</h1>
        <p>content</p>
      </div>
    </div>
  );
}

export default Home;
