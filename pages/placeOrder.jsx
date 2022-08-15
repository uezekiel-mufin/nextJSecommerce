import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import  { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Navbar from "../components/navbar";
import { Store } from "../utils/Store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getError } from "../utils/error";
import axios from "axios";
import Cookies from "js-cookie";

const PlaceOrderScreen = () => {
  const { state, dispatch } = useContext(Store);
  const [loading, setLoading] = useState(false);
  const { cart } = state;
  const { shippingAddress, paymentMethod, cartItems } = cart;
  const router = useRouter();

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
  );
  const taxPrice = round2(itemsPrice * 0.15);
  const shippingPrice = round2(itemsPrice > 200 ? 0 : 15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const placeOrderHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (error) {
      setLoading(false);
      toast.error(getError(error));
    }
  };
  return (
    <div>
      <Head>
        <title>Place Order</title>
        <meta name='description' content='Zicomm' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ToastContainer position='top-center' />
      <div className='flex min-h-screen justify-between flex-col'>
        <header>
          <Navbar />
        </header>
        <main className='container m-auto mt-4 px-4 '>
          <CheckoutWizard activeStep={3} />
          <h1 className='mb-4 text-xl'>Place Order</h1>
          {cartItems?.length === 0 ? (
            <div>
              Cart is empty. <Link href='/'>Go Shopping</Link>
            </div>
          ) : (
            <div className='grid md:grid-cols-4 md:gap-5'>
              <div className='overflow-x-auto md:col-span-3'>
                <div className='card p-5'>
                  <h2 className='mb-2 text-lg'>Shipping Address</h2>
                  <div>
                    {shippingAddress.fullName}, {shippingAddress.address},{" "}
                    {shippingAddress.city}, {shippingAddress.postalCode},
                    {shippingAddress.country}
                  </div>
                  <div>
                    <Link href='/shipping'>Edit</Link>
                  </div>
                </div>
                <div className='card p-5'>
                  <h2 className='mb-2 text-lg'>Payment Method</h2>
                  <div>{paymentMethod}</div>
                  <div>
                    <Link href='/payment'>Edit</Link>
                  </div>
                </div>
                <div className='card overflow-x-auto p-5'>
                  <h2 className='mb-2 text-lg'>Order Items</h2>
                  <table className='min-w-full'>
                    <thead className='border-b'>
                      <tr>
                        <th className='px-5 text-left'>Item</th>
                        <th className='p-5 text-right'>Quantity</th>
                        <th className='p-5 text-right'>Price</th>
                        <th className='p-5 text-right'>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item._id} className='border-b'>
                          <td>
                            <Link href={`/product/${item.slug}`}>
                              <a className='flex items-center'>
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
                          <td className='p-5 text-right '> {item.quantity}</td>
                          <td className='p-5 text-right '> {item.price}</td>
                          <td className='p-5 text-right '>
                            {" "}
                            {item.price * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div>
                    <Link href='/cart'>Edit</Link>
                  </div>
                </div>
              </div>
              <div>
                <div className='card p-5'>
                  <h2 className='mb-2 text-lg '>Order Summary</h2>
                  <ul>
                    <li>
                      <div className='mb-2 flex justify-between'>
                        <div>Items</div>
                        <div>${itemsPrice}</div>
                      </div>
                    </li>
                    <li>
                      <div className='mb-2 flex justify-between'>
                        <div>Tax</div>
                        <div>${taxPrice}</div>
                      </div>
                    </li>
                    <li>
                      <div className='mb-2 flex justify-between'>
                        <div>Shipping</div>
                        <div>${shippingPrice}</div>
                      </div>
                    </li>
                    <li>
                      <div className='mb-2 flex justify-between'>
                        <div>Total </div>
                        <div>${totalPrice}</div>
                      </div>
                    </li>
                    <li>
                      <button
                        disabled={loading}
                        onClick={placeOrderHandler}
                        className='primary-button w-full'
                      >
                        {loading ? "loading..." : "Place Order"}
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

export default PlaceOrderScreen;

PlaceOrderScreen.auth = true;
