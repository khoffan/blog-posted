import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DetailProfile from "../../components/DetailProfile";

export default function Profile() {
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <DetailProfile id={id} />
    </>
  );
}
