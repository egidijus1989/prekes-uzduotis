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
  console.log(product);
  return (
    <>
      {product ? (
        <div className="container">
          <h1 className="">{product.title}</h1>
          <img
            src={
              product.image_url ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoE0zLabFrxYyaVJ-BZsuUdFNCo2iOTnGKyVFfGr_AYQ&s"
            }
            alt=""
          />
          <p>{product.price}</p>
          <p>{product.description}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
