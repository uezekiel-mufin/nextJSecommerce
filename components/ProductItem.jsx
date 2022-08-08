/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";


const ProductItem = ({ product }) => {
  return (
    <div className='card'>
      <Link href={`/product/${product.slug}.js`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className='rounded shadow'
          />
        </a>
      </Link>

      <div className='flex flex-col items-center justify-center p-5'>
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className='text-lg'>{product.name}</h2>
          </a>
        </Link>
        <p className='mb-2'>{product.brand}</p>
        <p>${product.price}</p>
        <Link href={`/product/${product.slug}`}>
          <a>
            <button className='primary-button ' type='button'>
              Add to Cart
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
