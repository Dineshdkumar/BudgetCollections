"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import Image from "next/image";
import AddToCart from "@/app/(shoppingcart)/components/ui/AddToCart";

const page = () => {
  const wishlistStore = useWishlistStore();

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="main-container mx-auto px-6 lg:px-20">
        {wishlistStore.wishList.length > 0 ? (
          <>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-800">
                Your Wishlist
              </h1>
              <p className="text-gray-600 mt-2">
                You have {wishlistStore.wishList.length} items in your wishlist.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {wishlistStore.wishList.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center text-center border hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="rounded-md object-cover mb-5"
                  />
                  <h2 className="font-bold text-lg text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mb-5">
                    ${product.unit_amount.toFixed(2)}
                  </p>
                  <div className="flex gap-4">
                    <AddToCart
                      name={product.name}
                      image={product.image}
                      price={product.unit_amount}
                      id={product.price_id!}
                      currency="INR"
                    />
                    <button
                      onClick={() =>
                        wishlistStore.removeFromWishlist({ ...product })
                      }
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full flex justify-center items-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Your Wishlist is Empty
              </h1>
              <p className="text-gray-600 mb-6">
                Explore our products and add items to your wishlist!
              </p>
              <a
                href="/shop"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-600 transition-colors"
              >
                Browse Products
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
