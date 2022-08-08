import React from "react";
import ProductItem from "./ProductItem";

const Products = ({ children }) => {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {children.products.map((item) => (
        <div key={item.slug}>
          <ProductItem product={item} />
        </div>
      ))}
    </div>
  );
};

export default Products;
