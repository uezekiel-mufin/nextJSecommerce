import Head from "next/head";
import Link from "next/link";
import React from "react";
import Navbar from "../components/navbar";
import { useForm } from "react-hook-form";
import signIn from "next-auth/react";
import { getError } from "../utils/error";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

const LoginScreen = () => {
  console.log(useSession());
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const formHandler = async ({ email, password }) => {
    console.log(email, password);
    console.log(session);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log(result);
      // if (result.error) {
      //   toast.error(result.error);
      // }
    } catch (err) {
      toast.error(getError(err));
    }
    console.log(session);
  };

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name='description' content='Zicomm' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ToastContainer position='bottom-center' />
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
                    value: 6,
                    message: "password should be more than 6 chars",
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
