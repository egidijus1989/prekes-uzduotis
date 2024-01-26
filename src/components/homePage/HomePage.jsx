import React, { useState, useEffect } from "react";
import ProductCard from "../productCard/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://demo-api.ideabridge.lt/api/products/view/all`
        );
        const data = await res.json();
        if (res.ok) {
          setProducts(data.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div className="my-5 container d-flex flex-wrap gap-5 me-auto justify-content-around">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image_url={product.image_url}
          title={product.title}
          description={product.description}
          price={product.price}
        />
      ))}
    </div>
  );
}
