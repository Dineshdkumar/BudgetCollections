"use client";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { mainLinks } from "@/constants";
import { userLinks } from "@/constants";
import { User } from "@prisma/client";

//icons
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { TbBracketsAngle } from "react-icons/tb";
import CartIcon from "@/app/(shoppingcart)/components/ui/CartIcon";
import WishlistIcon from "@/app/(wishlist)/components/WishlistIcon";

interface NavbarProps {
  user: User;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const mobileMenuHandler = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const userMenuHandler = () => {
    setOpenUserMenu(!openUserMenu);
  };
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-700 p-4 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link href={"/"}>
          <div className="flex items-center text-white text-2xl font-semibold gap-2 hover:text-yellow-300 transition-colors">
            <h1>Budget Collections</h1>
            <TbBracketsAngle className="text-xl" />
          </div>
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-10 hidden md:flex">
          {mainLinks.map((link, index) => (
            <Link key={index} href={link.route}>
              <li className="text-white text-lg font-medium hover:text-yellow-300 transition-colors cursor-pointer">
                {link.label}
              </li>
            </Link>
          ))}
        </ul>

        {/* Icons and User Menu */}
        <div className="flex items-center gap-6 text-white text-2xl">
          <CartIcon className="hover:text-yellow-300 transition-colors cursor-pointer" />
          <WishlistIcon className="hover:text-yellow-300 transition-colors cursor-pointer" />

          {/* User Menu Icon */}
          <div
            className="hidden md:block hover:text-yellow-300 cursor-pointer"
            onClick={userMenuHandler}
          >
            <AiOutlineUser />
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden" onClick={mobileMenuHandler}>
            {openMobileMenu ? (
              <MdClose className="text-white" />
            ) : (
              <FiMenu className="text-white" />
            )}
          </div>
        </div>

        {/* USER MENU */}
        {openUserMenu && (
          <div className="absolute right-0 top-[50px] w-40 bg-gray-800 shadow-lg rounded-md p-4 text-white max-md:hidden text-center">
            {!user ? (
              <ul>
                <Link onClick={() => setOpenUserMenu(false)} href={"/sign-in"}>
                  <li className="py-2 hover:bg-purple-600 rounded-md">
                    Log In
                  </li>
                </Link>
                <Link onClick={() => setOpenUserMenu(false)} href={"/sign-up"}>
                  <li className="py-2 hover:bg-purple-600 rounded-md">
                    Sign Up
                  </li>
                </Link>
              </ul>
            ) : (
              <ul>
                {userLinks.map((link, index) => (
                  <Link
                    onClick={() => setOpenUserMenu(false)}
                    key={index}
                    href={link.route}
                  >
                    <li className="py-2 hover:bg-purple-600 rounded-md">
                      {link.label}
                    </li>
                  </Link>
                ))}
                <li
                  className="cursor-pointer py-2 hover:bg-purple-600 rounded-md"
                  onClick={() => signOut()}
                >
                  Sign Out
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* MOBILE MENU */}
      {openMobileMenu && (
        <div className="absolute top-0 right-0 w-64 bg-gray-800 text-white shadow-lg z-50 md:hidden">
          <div className="py-6 px-4">
            <ul className="flex flex-col gap-6">
              {mainLinks.map((link, index) => (
                <Link key={index} href={link.route}>
                  <li className="text-xl font-medium hover:text-yellow-300">
                    {link.label}
                  </li>
                </Link>
              ))}
              {!user ? (
                <>
                  <Link href={"/sign-in"}>
                    <li className="text-xl font-medium hover:text-yellow-300">
                      Log In
                    </li>
                  </Link>
                  <Link href={"/sign-up"}>
                    <li className="text-xl font-medium hover:text-yellow-300">
                      Sign Up
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  {userLinks.map((link, index) => (
                    <Link key={index} href={link.route}>
                      <li className="text-xl font-medium hover:text-yellow-300">
                        {link.label}
                      </li>
                    </Link>
                  ))}
                  <li
                    className="text-xl font-medium cursor-pointer hover:text-yellow-300"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
