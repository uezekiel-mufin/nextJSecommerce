import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useContext } from "react";
import { Store } from "../utils/Store";
import { signOut, useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";

const Navbar = () => {
  const { status, data: session } = useSession();
  const [cartItemsCount, setCartItemsCount] = useState();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  console.log(cart);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems, state.cart.cartItems]);

  const logoutClickHandler = () => {
    dispatch({ type: "CART_RESET" });
    Cookies.remove("cart");
    signOut({ callbackUrl: "/login" });
  };
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
              {cartItemsCount > 0 && (
                <span className=' ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                  {cartItemsCount}
                </span>
              )}
            </a>
          </Link>

          {status === "loading" ? (
            "loading"
          ) : session?.user ? (
            <Menu as='div' className='relative inline-block'>
              <Menu.Button className='text-blue-600'>
                {session?.user.name}
              </Menu.Button>
              <Menu.Items className='absolute right-0 w-56 origin-top-right shadow-lg bg-white'>
                <Menu.Item>
                  <DropdownLink className='dropdown-link ' href='/profile'>
                    Profile
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink
                    className='dropdown-link '
                    href='/order-history'
                  >
                    Order history
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <a
                    className='dropdown-link '
                    href='#'
                    onClick={logoutClickHandler}
                  >
                    Logout
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link href='/login'>
              <a className='mx-2'>Login</a>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
