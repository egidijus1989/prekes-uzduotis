import React, { useEffect, useState } from "react";
import * as service from "../../servises/ProductServices";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductPage() {
  let { id } = useParams();
  const [product, setProduct] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.data.access_token;

  useEffect(() => {
    const getProduct = () => {
      service.fetchProduct(setProduct, id, token);
    };
    getProduct();
  }, []);
  return (
    <>
      {product ? (
        <div className="container my-5 d-flex align-items-center gap-3 border border-dark border-4 rounded">
          <div className="border-end border-dark border-2">
            <img
              src={
                product.image_url ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoE0zLabFrxYyaVJ-BZsuUdFNCo2iOTnGKyVFfGr_AYQ&s"
              }
              alt=""
              style={{ width: "18rem" }}
            />
          </div>
          <div className="">
            <h3 className="align-middle">
              <span className="fw-bold">Produkto pavadinimas:</span>{" "}
              {product.title}
            </h3>
            <p>
              <span className="fw-bold">Kaina:</span> {product.price}
            </p>
            <p>
              <span className="fw-bold">Produkto aprašymas:</span>{" "}
              {product.description}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
