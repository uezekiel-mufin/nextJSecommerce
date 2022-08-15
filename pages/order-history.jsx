import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { getError } from "../utils/error";
import Navbar from "../components/navbar";
import Head from "next/head";
import Link from "next/link";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST": {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case "FETCH_SUCCESS": {
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: "",
      };
    }

    case "FETCH_FAIL": {
      return {
        ...state,
        loading: false,
        orders: [],
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

const OrderHistroyScreen = () => {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    orders: [],
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/orders/history");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchOrders();
  }, []);
  return (
    <div>
      <Head>
        <title>Order History</title>
        <meta name='description' content='Zicomm' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex min-h-screen justify-between flex-col'>
        <header>
          <Navbar />
        </header>
        <main className='container m-auto mt-4 px-4 '>
          <h1 className='text-xl mb-4'>Order History</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className='alert-error'>{error}</div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full'>
                <thead>
                  <tr>
                    <th className='px-5 text-left'>ID</th>
                    <th className='p-5 text-left'>DATE</th>
                    <th className='p-5 text-left'>TOTAL</th>
                    <th className='p-5 text-left'>PAID</th>
                    <th className='p-5 text-left'>DELIVERED</th>
                    <th className='p-5 text-left'>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className='border-b'>
                      <td className='p-5'>{order._id.substring(20, 24)}</td>
                      <td className='p-5'>
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className='p-5'>{order.totalPrice}</td>
                      <td className='p-5'>
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : "not paid"}
                      </td>

                      <td className='p-5'>
                        {order.isDelivered
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : "not delivered"}
                      </td>

                      <td className='p-5'>
                        <Link href={`/order/${order._id}`} passHref>
                          <a>Details</a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
OrderHistroyScreen.auth = true;
export default OrderHistroyScreen;
