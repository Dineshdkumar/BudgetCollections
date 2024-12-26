"use client";
import { useShoppingCart } from "use-shopping-cart";
import { Product } from "use-shopping-cart/core";
import toast from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa6";

const AddToCart = ({
  currency,
  name,
  image,
  price,
  id,
  size,
  sizeSelect,
  onClick,
}: Product & {
  onClick?: () => void;
}) => {
  const { addItem } = useShoppingCart();
  const productId = `${id}-${size}`;
  const product = {
    currency: currency,
    name: name,
    image: image,
    price: price,
    id: productId,
    size: size,
  };

  return (
    <button
      className={`w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all ${
        !sizeSelect ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={() => {
        if (!sizeSelect && onClick) {
          onClick();
        } else {
          addItem(product as any);
          toast.success(`${name} has been added to cart`);
        }
      }}
    >
      <FaCartPlus size={20} />
      Add to Cart
    </button>
  );
};

export default AddToCart;
