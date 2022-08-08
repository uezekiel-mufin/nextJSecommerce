import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { Store } from "../utils/Store";

const Navbar = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  console.log(cart);

  return (
    <div>
      <nav className='flex justify-between shadow-md px-4 items-center h-12'>
        <Link href='/'>
          <a className='text-lg font-bold'>Zicomm</a>
        </Link>
        <div>
          <Link href='/cart'>
            <a className='mx-2 relative'>
              Cart
              {cart?.cartItems?.length > 0 && (
                <span className=' ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                  {cart?.cartItems?.reduce((a, c) => a + c.quantity, 0)}
                </span>
              )}
            </a>
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
