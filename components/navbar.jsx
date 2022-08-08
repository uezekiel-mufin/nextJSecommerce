import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between shadow-md px-4 items-center h-12'>
        <Link href='/'>
          <a className='text-lg font-bold'>Zicomm</a>
        </Link>
        <div>
          <Link href='/cart'>
            <a className='mx-2'>Cart</a>
          </Link>
          <Link href='/login'>
            <a className='mx-2'>Login</a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
