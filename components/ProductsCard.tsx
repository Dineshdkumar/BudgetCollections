"use client";
import { useState } from "react";
import Image from "next/image";
import { FaCartPlus, FaHeart, FaEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import { ProductType } from "@/types/ProductTypes";
import AddToCart from "@/app/(shoppingcart)/components/ui/AddToCart";
import formatPrice from "@/utils/formatPrice";
import AddToWishlistButton from "@/app/(wishlist)/components/AddToWishlistButton";

const ProductsCard = ({ product }: { product: ProductType }) => {
  const [selectedSize, setSelectedSize] = useState("");

  const isSizeSelected = selectedSize !== "";

  const showToast = () => {
    toast.error("Please choose a size first");
  };

  const category = product.metadata?.category;

  const normalizeCategory = (category: string | undefined) =>
    category ? category.trim().toLowerCase() : "";

  const getSizeOptions = (category: string | undefined) => {
    const normalizedCategory = normalizeCategory(category);

    switch (normalizedCategory) {
      case "jeans":
      case "trousers":
        return ["30", "32", "34", "36", "38"];
      case "polo":
      case "round neck":
        return ["Small", "Medium", "Large", "XL"];
      case "formals shirts":
      case "plain shirts":
      case "printed shirts":
      case "checks shirts":
        return ["Small", "Medium", "Large", "XL"];
      default:
        return [];
    }
  };

  const sizeOptions = getSizeOptions(category);

  return (
    <div className="relative flex flex-col items-center bg-white p-4 shadow-md rounded-lg border border-gray-300 transition-transform transform hover:scale-105 overflow-hidden">
      <div className="relative group w-full mb-4">
        <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden relative rounded-md">
          <Image
            src={product.image}
            width={300}
            height={300}
            alt={`image of ${product.name}`}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="hidden absolute inset-0 bg-black/50 items-center justify-center group-hover:flex gap-3 transition-all">
          <button className="p-3 bg-white rounded-full shadow-md hover:bg-gray-200">
            <AddToWishlistButton
              name={product.name}
              image={product.image}
              id={product.id}
              unit_amount={product.unit_amount}
              quantity={product.quantity}
            />
          </button>
          <button className="p-3 bg-white rounded-full shadow-md hover:bg-gray-200">
            <FaEye className="text-gray-700" size={20} />
          </button>
        </div>
      </div>
      <h3 className="font-bold text-lg mt-3 text-center">{product.name}</h3>
      <span className="text-gray-600 text-sm mb-2">
        {formatPrice(product.unit_amount)}
      </span>

      <select
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
        className="p-2 border rounded-md w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-3"
      >
        <option value="">Select Size</option>
        {/* Display sizes based on category */}
        {sizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <AddToCart
        name={product.name}
        image={product.image}
        price={product.unit_amount}
        id={product.price_id!}
        sizeSelect={isSizeSelected}
        size={selectedSize}
        onClick={!isSizeSelected ? showToast : undefined}
        currency="INR"
      />
    </div>
  );
};

export default ProductsCard;
