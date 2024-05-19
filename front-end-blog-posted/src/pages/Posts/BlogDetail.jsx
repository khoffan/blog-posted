import React from "react";
import { useParams } from "react-router-dom";
import CardDeatil from "../../components/CardDeatil";
export default function BlogDetail() {
  const { id } = useParams();
  return (
    <>
      <CardDeatil id={id} />
    </>
  );
}
