"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { mainLinks } from "@/constants";
import { userLinks } from "@/constants";
import { User } from "@prisma/client";

// icons
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
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
    <>
      {/* Header */}
      <nav className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 p-2 shadow-lg">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <Link href={"/"}>
            <div className="flex items-center gap-4">
              <Image
                src="/Budget-mobile.jpg"
                alt="Budget Collections Logo"
                width={250}
                height={60}
                className="rounded-lg shadow-lg object-contain"
              />
            </div>
          </Link>

          {/* Navigation Links for Desktop */}
          <ul className="flex gap-10 hidden md:flex">
            {mainLinks.map((link, index) => (
              <Link key={index} href={link.route}>
                <li className="text-white text-lg font-medium relative group">
                  {link.label}
                  <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                </li>
              </Link>
            ))}
          </ul>

          {/* Icons and User Menu */}
          <div className="flex items-center gap-6 text-white text-2xl">
            <CartIcon className="hover:text-gray-300 transition-colors cursor-pointer" />
            <WishlistIcon className="hover:text-gray-300 transition-colors cursor-pointer" />

            {/* User Menu Icon */}
            <div
              className="hidden md:block hover:text-gray-300 cursor-pointer"
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
        </div>

        {/* Mobile Menu */}
        {openMobileMenu && (
          <div
            className="bg-white shadow-md absolute top-[70px] left-0 w-full md:hidden z-10"
            style={{ animation: "fadeIn 0.3s ease-in-out" }}
          >
            <ul className="flex flex-col items-start p-4 gap-4">
              {mainLinks.map((link, index) => (
                <Link key={index} href={link.route}>
                  <li
                    className="text-gray-800 text-lg font-medium w-full hover:bg-purple-200 p-2 rounded-md"
                    onClick={() => setOpenMobileMenu(false)}
                  >
                    {link.label}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}

        {/* USER MENU */}
        {openUserMenu && (
          <div
            style={{ zIndex: 2 }}
            className="absolute right-0 top-[70px] w-40 bg-white shadow-lg rounded-md p-4 text-gray-800 max-md:hidden text-center"
          >
            {!user ? (
              <ul>
                <Link onClick={() => setOpenUserMenu(false)} href={"/sign-in"}>
                  <li className="py-2 hover:bg-purple-200 rounded-md">
                    Log In
                  </li>
                </Link>
                <Link onClick={() => setOpenUserMenu(false)} href={"/sign-up"}>
                  <li className="py-2 hover:bg-purple-200 rounded-md">
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
                    <li className="py-2 hover:bg-purple-200 rounded-md">
                      {link.label}
                    </li>
                  </Link>
                ))}
                <li
                  className="cursor-pointer py-2 hover:bg-purple-200 rounded-md"
                  onClick={() => signOut()}
                >
                  Sign Out
                </li>
              </ul>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
