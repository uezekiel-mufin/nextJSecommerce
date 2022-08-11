import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Navbar from "../components/navbar";

const Unauthorized = () => {
  const router = useRouter();
  const { message } = router.query;
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
          <h1 className='text-xl '>Access Denied</h1>
          {message && <div className='mb-4 text-red-500'>{message}</div>}
        </main>
        <footer className='flex justify-center items-center h-10 shadow-inner'>
          Copyright &copy; 2022 Zicomm
        </footer>
      </div>
    </div>
  );
};

export default Unauthorized;
