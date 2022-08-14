import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import CheckoutWizard from "../components/CheckoutWizard";
import { Store } from "../utils/Store";
import { useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const ShippingScreen = () => {
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm();
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const cart = state.cart;
  const shippingAddress = cart.shippingAddress;

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });

    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );
    router.push("/payment");
  };
  return (
    <div>
      <Head>
        <title>Shipping Address</title>
        <meta name='description' content='Zicomm' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex min-h-screen justify-between flex-col'>
        <header>
          <Navbar />
        </header>
        <main className='container m-auto mt-4 px-4 '>
          <CheckoutWizard activeStep={1} />
          <form
            className='mx-auto max-w-screen-md'
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className='mb-4 text-xl '>Shipping Address</h1>
            <div className='mb-4'>
              <label htmlFor='fullName'>Full Name</label>
              <input
                className='w-full'
                id='fullName'
                autoFocus
                {...register("fullName", {
                  required: "Please enter full name",
                })}
              />
              {errors.fullName && (
                <p className='text-red-500'>{errors.fullName.message}</p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='address'>Address</label>
              <input
                id='address'
                className='w-full'
                {...register("address", {
                  minLength: {
                    value: 3,
                    message: "Address should be more than 3 characters",
                  },
                })}
              />
              {errors.address && (
                <p className='text-red-500'>{errors.address.message}</p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='city'>City</label>
              <input
                id='city'
                className='w-full'
                {...register("city", {
                  required: "Please enter a city",
                })}
              />
              {errors.city && (
                <p className='text-red-500'>{errors.city.message}</p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='country'>Country</label>
              <input
                id='country'
                className='w-full'
                {...register("country", {
                  required: "Please enter your country",
                })}
              />
              {errors.country && (
                <p className='text-red-500'>{errors.country.message}</p>
              )}
            </div>

            <div className='mb-4'>
              <label htmlFor='postalCode'>Postal Code</label>
              <input
                id='postalCode'
                className='w-full'
                {...register("postalCode", {
                  required: "Please enter postal code",
                })}
              />

              {errors.postalCode && (
                <p className='text-red-500'>{errors.postalCode.message}</p>
              )}
            </div>
            <div className='mb-4 flex justify-between'>
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

export default ShippingScreen;

ShippingScreen.auth = true;
