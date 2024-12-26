import { BiWorld } from "react-icons/bi";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { GiTrophy } from "react-icons/gi";

const Info = () => {
  return (
    <section className="py-6 bg-gray-50">
      <div className="main-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <BiWorld className="text-4xl text-blue-600" />
          <span className="text-lg font-semibold text-gray-800">
            Free Shipping Worldwide
          </span>
          <p className="text-sm text-gray-600">
            Enjoy free shipping on all orders, wherever you are.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <FaArrowRotateLeft className="text-4xl text-green-600" />
          <span className="text-lg font-semibold text-gray-800">
            Money Back Guaranteed
          </span>
          <p className="text-sm text-gray-600">
            Risk-free shopping with our refund policy.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <IoIosLock className="text-4xl text-red-600" />
          <span className="text-lg font-semibold text-gray-800">
            Secure Online Payments
          </span>
          <p className="text-sm text-gray-600">
            Your transactions are 100% secure and protected.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <GiTrophy className="text-4xl text-yellow-600" />
          <span className="text-lg font-semibold text-gray-800">
            Best Premium Quality
          </span>
          <p className="text-sm text-gray-600">
            Top-notch products with premium quality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Info;
