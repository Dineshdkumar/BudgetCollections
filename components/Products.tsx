"use client";
import { useState } from "react";
import ProductsCard from "./ProductsCard";
import { ProductType } from "@/types/ProductTypes";

const Products: React.FC<{
  allProducts: ProductType[];
}> = ({ allProducts }) => {
  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const sortProducts = () => {
    if (sortBy === "Price Low-High") {
      return allProducts.slice().sort((a, b) => a.unit_amount - b.unit_amount);
    } else if (sortBy === "Price High-Low") {
      return allProducts.slice().sort((a, b) => b.unit_amount - a.unit_amount);
    } else {
      return allProducts;
    }
  };

  const sortedProducts = sortProducts();

  return (
    <section className="relative md:py-24 py-16 bg-gray-50">
      <div className="main-container">
        {/* Filter Section */}
        <div className="md:flex justify-between items-center mb-8">
          <span className="font-semibold text-xl text-gray-800">
            Showing 1-12 of {allProducts.length} items
          </span>

          {/* Custom Filter Container */}
          <div className="md:flex items-center mt-4 md:mt-0">
            <label className="font-medium text-lg text-gray-700 mr-3">
              Sort by:
            </label>

            {/* Custom Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="peer w-48 py-2 px-4 h-10 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-md transition-all appearance-none"
              >
                <option value="">Select</option>
                <option value="Price Low-High">Price Low-High</option>
                <option value="Price High-Low">Price High-Low</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {sortedProducts.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
