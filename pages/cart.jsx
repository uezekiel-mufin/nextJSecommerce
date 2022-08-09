/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useContext } from "react";
import { Store } from "../utils/Store";
import Link from "next/link";
import Head from "next/head";
import Navbar from "../components/navbar";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

const CartScreen = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  console.log(state.cart.cartItems);

  const handleDeleteFromCart = (product) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: product });
  };
  return (
    <div>
      <Head>
        <meta name='description' content='Zicomm' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex min-h-screen justify-between flex-col'>
        <header>
          <Navbar />
        </header>
        <main className='container m-auto mt-4 px-4 '>
          <h1 className='mb-4 text-xl'>Shopping Cart</h1>
          {state.cart.cartItems.length === 0 ? (
            <div>
              Cart is Empty. <Link href='/'>Go Shopping</Link>
            </div>
          ) : (
            <div className='grid md:grid-cols-4 md:gap-5'>
              <div className='overflow-x-auto md:col-span-3'>
                <table className='min-w-full'>
                  <thead className='border-b'>
                    <tr>
                      <th className='px-5 text-left'>Item</th>
                      <th className='p-5 text-right'>Quantity</th>
                      <th className='p-5 text-right'>Price</th>
                      <th className='p-5 '>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.cart.cartItems.map((item) => (
                      <tr className='border-b ' key={item.slug}>
                        <td>
                          <Link href={`/product/${item.slug}`}>
                            <a className='flex items-center  text-center'>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                              />
                              &nbsp;
                              {item.name}
                            </a>
                          </Link>
                        </td>
                        <td className='p-5 text-right'>{item.quantity}</td>
                        <td className='p-5 text-right'>{item.price}</td>
                        <td className='p-5 text-center'>
                          <button onClick={() => handleDeleteFromCart(item)}>
                            <XCircleIcon className='h-5 w-5' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <div className='card p-5'>
                  <ul>
                    <li>
                      <div className='pb-3 text-lg font-bold'>
                        Subtotal (
                        {state.cart.cartItems.reduce(
                          (acc, cur) => acc + cur.quantity,
                          0
                        )}
                        ) : &nbsp; $
                        {state.cart.cartItems.reduce(
                          (acc, cur) => acc + cur.price * cur.quantity,
                          0
                        )}
                      </div>
                    </li>
                    <li>
                      <button
                        onClick={() => router.push("/shipping")}
                        className='primary-button w-full '
                      >
                        Checkout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </main>
        <footer className='flex justify-center items-center h-10 shadow-inner'>
          Copyright &copy; 2022 Zicomm
        </footer>
      </div>
    </div>
  );
};

export default CartScreen;
