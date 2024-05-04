import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../../components/Nav";

function CreatePost() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/profile/${id}`
      );
      const autherRes = response.data.user;

      setAuthor({
        name: autherRes.firstname + " " + autherRes.last_name,
        email: autherRes.email,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangtitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmitBlog = async (event) => {
    event.preventDefault();
    try {
      if (title === "" || description === "" || author === null) {
        alert("Please fill all the fields");
        return;
      }
      const response = await axios.post(
        "http://localhost:3001/api/creatBlogs",
        {
          title: title,
          description: description,
          author,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-red-400">
        <Nav />
        <div className="w-1/2 border rounded-md p-2 mx-auto my-2 bg-white">
          <h1 className="text-3xl">Create Post</h1>
          <form className="mt-4 flex flex-col" onSubmit={handleSubmitBlog}>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-black "
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="border rounded-md border-black px-2 w-full"
                id="title"
                type="text"
                placeholder="title"
                onChange={handleChangtitle}
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-black "
                htmlFor="descriptions"
              >
                Description
              </label>
              <textarea
                name="descriptions"
                id="descriptions"
                cols="30"
                rows="10"
                className="border rounded-md border-black p-2 w-full"
                placeholder="description"
                onChange={handleChangeDescription}
              ></textarea>
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-black "
                htmlFor="image"
              >
                Image
              </label>
              <img
                src={image}
                className="w-[100px] h-[100px] mx-auto invisible"
              />
              <input
                className="hidden"
                type="file"
                id="image"
                onChange={(event) => setImage(event.target.files[0])}
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="author"
              >
                Author
              </label>
              <input
                className="border rounded-md border-black px-2 w-full"
                id="author" // Unique ID for the input
                type="text"
                value={author.email} // Show the email in the input field
                readOnly // Optional: to make it read-only if you don't want it to be editable
              />
            </div>
            <div className="mb-4 mx-4 flex justify-center">
              <button
                type="submit"
                className="w-[250px] bg-black text-white border rounded-md border-black py-2 hover:bg-gray-200 hover:text-black"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
