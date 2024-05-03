import React from "react";
import { useParams } from "react-router-dom";
import UpdateProfileDetail from "../../components/UpdateProfileDetail";

export default function EditProfile() {
  const { id } = useParams();

  return (
    <>
      <UpdateProfileDetail id={id} />
    </>
  );
}
