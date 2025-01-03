"use client";
import { useState } from "react";
import ProductsCard from "./ProductsCard";
import { ProductType } from "@/types/ProductTypes";

const Products: React.FC<{
  allProducts: ProductType[];
}> = ({ allProducts }) => {
  const [sortBy, setSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Updated categories
  const categories = [
    "Formal shirts",
    "Plain shirts",
    "Printed shirts",
    "Checks shirts",
    "Jeans",
    "Trousers",
    "Polo",
    "Round Neck",
  ];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Normalize category for comparison
  const normalize = (value: string | undefined) =>
    value ? value.trim().toLowerCase() : "";

  const sortProducts = (products: ProductType[]) => {
    if (sortBy === "Price Low-High") {
      return products.slice().sort((a, b) => a.unit_amount - b.unit_amount);
    } else if (sortBy === "Price High-Low") {
      return products.slice().sort((a, b) => b.unit_amount - a.unit_amount);
    } else {
      return products;
    }
  };

  const filteredProducts = selectedCategory
    ? allProducts.filter(
        (product) =>
          normalize(product.metadata?.category) === normalize(selectedCategory)
      )
    : allProducts;

  const sortedProducts = sortProducts(filteredProducts);

  return (
    <section className="relative md:py-24 py-16 bg-gray-50">
      <div className="main-container flex flex-col md:flex-row">
        {/* Dropdown for mobile view */}
        <div className="block md:hidden w-full mb-6">
          <div className="flex flex-col gap-4">
            {/* Category Dropdown */}
            <div>
              <label className="block font-medium text-lg text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                value={selectedCategory ?? ""}
                onChange={(e) =>
                  handleCategoryChange(
                    e.target.value === "All Products" ? null : e.target.value
                  )
                }
                className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
              >
                <option value="All Products">All Products</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="block font-medium text-lg text-gray-700 mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option value="">Select</option>
                <option value="Price Low-High">Price Low-High</option>
                <option value="Price High-Low">Price High-Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sidebar for Desktop */}
        <aside className="hidden md:block w-1/4 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
          <ul className="space-y-4">
            <li
              className={`cursor-pointer text-lg font-medium rounded-lg p-2 ${
                !selectedCategory
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:bg-purple-200"
              }`}
              onClick={() => handleCategoryChange(null)}
            >
              All Products
            </li>
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer text-lg font-medium rounded-lg p-2 ${
                  normalize(selectedCategory ?? undefined) ===
                  normalize(category)
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-purple-200"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Product Section */}
        <div className="md:w-3/4 w-full md:pl-6">
          {/* Heading Section */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Showing {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "item" : "items"}
          </h2>

          {/* Filter Section */}
          <div className="hidden md:flex justify-between items-center mb-8">
            <span className="font-semibold text-xl text-gray-800">
              Showing 1-{filteredProducts.length} of {allProducts.length} items
            </span>

            {/* Custom Filter Container */}
            <div className="md:flex items-center mt-4 md:mt-0">
              <label className="font-medium text-lg text-gray-700 mr-3">
                Sort by:
              </label>
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ProductsCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-lg text-gray-600">
                No products available for this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
