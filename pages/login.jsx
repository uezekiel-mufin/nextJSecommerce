import Head from "next/head";
import Link from "next/link";
import React from "react";
import Navbar from "../components/navbar";
import { useForm } from "react-hook-form";

const LoginScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const formHandler = ({ email, password }) => {
    console.log(email, password);
  };

  return (
    <div>
      <Head>
        <title>Cart</title>
        <meta name='description' content='Zicomm' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex min-h-screen justify-between flex-col'>
        <header>
          <Navbar />
        </header>
        <main className='container m-auto mt-4 px-4 '>
          <form
            className='mx-auto max-w-screen-md'
            onSubmit={handleSubmit(formHandler)}
          >
            <h1 className='mb-4 text-xl '>Login</h1>
            <div className='mb-4'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                className='w-full'
                autoFocus
                {...register("email", {
                  required: "Please enter email address",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: "Please enter valid email",
                  },
                })}
              />
              {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                className='w-full'
                autoFocus
                {...register("password", {
                  required: "Please enter your password",
                  minLength: {
                    value: 8,
                    message: "password should be more than 8 chars",
                  },
                })}
              />
              {errors.password && (
                <p className='text-red-500'>{errors.password.message}</p>
              )}
            </div>
            <div className='mb-4'>
              <button className='primary-button'>Login</button>
            </div>
            <div className='mb-4'>
              Dont&apos;t have an account? &nbsp;
              <Link href='/register'>Register</Link>
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

export default LoginScreen;
