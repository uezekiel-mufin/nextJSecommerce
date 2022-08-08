import React from "react";
import ProductItem from "./ProductItem";
import { useRouter } from "next/router";
import ProductDetail from "./ProductDetails";

const Products = ({ children }) => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div
      className={`grid grid-cols-1 gap-4 ${
        slug ? "md:grid-cols-1" : "md:grid-cols-3 lg:grid-cols-4"
      }  `}
    >
      {children.map((item) => (
        <div key={item.slug}>
          {slug ? (
            <ProductDetail product={item} />
          ) : (
            <ProductItem product={item} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Products;
