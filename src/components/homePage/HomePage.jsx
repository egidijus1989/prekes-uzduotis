import React, { useState, useEffect } from "react";
import ProductCard from "../productCard/ProductCard";
import * as service from "../../servises/ProductServices";
import { useParams } from "react-router-dom";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState([]);
  const [url, SetUrl] = useState("");
  let { id } = useParams();

  useEffect(() => {
    const getProducts = () => {
      service.fetchProducts(setProducts, setPages, url);
    };
    getProducts();
  }, []);
  return (
    <>
      <div className="my-5 container d-flex flex-wrap gap-5 me-auto justify-content-around">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image_url={product.image_url}
            title={product.title}
            description={product.description}
            price={product.price}
            id={product.id}
          />
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {pages.map((page) => (
              <li className="page-item" key={page.label}>
                <button
                  className="page-link"
                  type="button"
                  onClick={() => {
                    SetUrl(page.url),
                      service.fetchProducts(setProducts, setPages, url);
                  }}
                >
                  {page.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
