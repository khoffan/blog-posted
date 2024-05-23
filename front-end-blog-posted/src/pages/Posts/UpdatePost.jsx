import React from "react";

import { useParams } from "react-router-dom";

export default function UpdatePost() {
  const { id } = useParams();

  return (
    <>
      <BlogUpdate id={id} />
    </>
  );
}
