import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CreateBlog from "../../components/BlogComponents/CreateBlog";

function CreatePost() {
	const { id } = useParams();

	return (
		<>
			<CreateBlog id={id} />
		</>
	);
}

export default CreatePost;
