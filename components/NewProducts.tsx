import { FetchProducts } from "@/app/actions/getStripeProducts";
import ProductsCard from "./ProductsCard";
import Link from "next/link";

const NewProducts = async () => {
  console.log("NewProducts component called");
  const products = await FetchProducts();
  console.log("Fetched products:", products);
  const newArrivals = products.filter(
    (product) => product.metadata?.new === "true"
  );
  return (
    <section className="py-10 border-t">
      <div className="main-container">
        <div className="flex justify-between items-center">
          <h1 className="text-xl uppercase border-b border-gray-900 text-gray-900">
            New Arrivals
          </h1>
          <Link href={"/shop"} className="hover:underline">
            <span>View More &#8594;</span>
          </Link>
        </div>
        {/* Adjusting the grid layout */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {newArrivals.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
