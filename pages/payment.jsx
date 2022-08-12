import Head from "next/head";
import React, { useEffect } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { Store } from "../utils/Store";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    router.push("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
      return;
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);
  return (
    <div>
      <Head>
        <title>Payment</title>
        <meta name='description' content='Zicomm' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex min-h-screen justify-between flex-col'>
        <header>
          <Navbar />
        </header>
        <main className='container m-auto mt-4 px-4 '>
          <CheckoutWizard activeStep={2} />
          <form className='mx-auto max-w-screen-md' onSubmit={submitHandler}>
            <h1 className='mb-4 text-xl'>Payment Method</h1>
            {["Paypal", "Stripe", "CashOnDelivery"].map((payment) => (
              <div key={payment} className='mb-4'>
                <input
                  name='paymentMethod'
                  className='p-2 outline-none focus:ring-0'
                  id={payment}
                  type='radio'
                  checked={selectedPaymentMethod === payment}
                  onChange={() => setSelectedPaymentMethod(payment)}
                />
                <label htmlFor={payment} className='p-2'>
                  {payment}
                </label>
              </div>
            ))}
            <div className='mb-4 flex justify-between'>
              <button
                onClick={() => router.push("/shipping")}
                type='button'
                className='default-button'
              >
                Back
              </button>
              <button className='primary-button'>Next</button>
            </div>
          </form>
        </main>
        <footer className='flex justify-center items-center h-10 shadow-inner'>
          Copyright &copy; 2022 Zicomm
        </footer>
      </div>
    </div>
  );
};

export default Payment;
