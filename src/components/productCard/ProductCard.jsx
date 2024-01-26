import React from "react";

export default function (props) {
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={props.image_url}
          className="card-img-top"
          alt={props.title}
        ></img>
        <div className="card-body">
          <h1>{props.title}</h1>
          <p className="card-text">{props.description}</p>
          <p>{props.price}</p>
          <a href="#" className="card-link">
            Plačiau
          </a>
        </div>
      </div>
    </div>
  );
}
