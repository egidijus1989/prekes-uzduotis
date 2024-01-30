import React from "react";
import { Link, useParams } from "react-router-dom";
import ProductPage from "../productPage/ProductPage";

export default function (props) {
  return (
    <div>
      <div
        className="card border border-dark rounded"
        style={{ width: "18rem", height: "35rem", overflow: "auto" }}
      >
        <img
          src={
            props.image_url ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoE0zLabFrxYyaVJ-BZsuUdFNCo2iOTnGKyVFfGr_AYQ&s"
          }
          className="card-img-top"
          alt={props.title}
          style={{ width: "17rem", height: "17rem", objectFit: "cover" }}
        ></img>
        <div className="card-body">
          <h1>{props.title}</h1>
          <p className="card-text">{props.description}</p>
          <p>{props.price}</p>
          <Link to={`/product-page/${props.id}`} className="card-link">
            Plačiau
          </Link>
        </div>
      </div>
    </div>
  );
}
