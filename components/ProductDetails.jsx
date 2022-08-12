/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Store } from "../utils/Store";
import { useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const ProductDetail = ({ product }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  console.log(product);

  const addToCartHandler = async () => {
    const existItem = state.cart?.cartItems?.find(
      (item) => item.slug === product.slug
    );

    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      alert("Sorry, Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });

    toast.success("Product added to the cart");
    router.push("/cart");
  };

  return (
    <>
      <div className='my-2'>
        <Link href='/'>back to products</Link>
        <Link href='/cart'>
          <a>Go to cart</a>
        </Link>
      </div>
      <div className='grid md:grid-cols-4 md:gap-3'>
        <div className='md:col-span-2'>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout='responsive'
          />
        </div>
        <ul>
          <li>
            <h1 className='text-lg'>{product.name}</h1>
          </li>
          <li>Category: {product.category}</li>
          <li>Brand: {product.brand}</li>
          <li>
            {product.rating} of {product.numReviews} reviews
          </li>
          <li>Description: {product.description}</li>
        </ul>

        <div>
          <div className='card p-5 mb-2 flex justify-between '>
            <div className='mb-2 flex justify-between'>
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className='mb-2 flex justify-between'>
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In Stock" : "Unavailable"}</div>
            </div>
            <button
              className='primary-button w-full'
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
