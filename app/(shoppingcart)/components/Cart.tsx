"use client";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import Checkout from "./Checkout";
import Button from "@/components/ui/Button";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import formatPrice from "@/utils/formatPrice";

const Cart = () => {
  const { cartDetails, removeItem, totalPrice, decrementItem, incrementItem } =
    useShoppingCart();

  const checkoutStore = useCheckoutStore();

  const items = Object.values(cartDetails ?? {});

  return (
    <div className="py-20">
      <div className="main-container">
        {checkoutStore.onCheckout === "checkout" && (
          <button
            className="text-sm font-bold mb-5 hover:text-blue-500 transition"
            onClick={() => checkoutStore.setCheckout("cart")}
          >
            &#8592; Back to cart
          </button>
        )}
        {items.length < 1 && checkoutStore.onCheckout === "cart" ? (
          <div className="h-screen flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              Your cart is empty!
            </h2>
            <p className="text-gray-500">
              Looks like you haven't added anything yet.
            </p>
          </div>
        ) : null}

        {checkoutStore.onCheckout === "cart" && (
          <div className="grid gap-10 lg:grid-cols-2">
            <ul className="space-y-6">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex p-6 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg transition"
                >
                  <div className="h-24 w-24 flex justify-center items-center overflow-hidden rounded-md border border-gray-300">
                    <Image
                      src={item.image as string}
                      alt={`image of ${item.name}`}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <div>
                          <h3>{item.name}</h3>
                          <h4 className="text-sm text-gray-500">{item.size}</h4>
                        </div>
                        <p>{item.formattedValue}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => decrementItem(item.id, { count: 1 })}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                      >
                        <FiMinus className="text-gray-600" />
                      </button>
                      <span className="text-gray-900 font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementItem(item.id, { count: 1 })}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                      >
                        <IoMdAdd className="text-gray-600" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 font-medium hover:text-red-700 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {items.length > 0 && (
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">
                  Order Summary
                </h2>
                <div className="flex justify-between text-gray-700 mt-4">
                  <p>Subtotal:</p>
                  <p>{totalPrice ? formatPrice(totalPrice) : "-"}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Shipping and taxes are calculated at checkout.
                </p>
                <div className="mt-6 w-full flex justify-center">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      checkoutStore.setCheckout("checkout");
                    }}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {checkoutStore.onCheckout === "checkout" && (
          <Checkout items={items} totalPrice={totalPrice} />
        )}
      </div>
    </div>
  );
};

export default Cart;
