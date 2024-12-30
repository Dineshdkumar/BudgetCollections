"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

const Hero = () => {
  return (
    <section className="mt-6 relative">
      <div className="main-container">
        {/* Hero Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={500}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg"
        >
          <SwiperSlide>
            <img
              src="/homeImg1.jpg"
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-in-out transform hover:scale-105"
              alt="Hero Image 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/homeImg2.jpg"
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-in-out transform hover:scale-105"
              alt="Hero Image 2"
            />
          </SwiperSlide>
        </Swiper>

        {/* Centered Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 md:top-[30%] md:right-[10%] md:transform-none md:-translate-x-0 md:-translate-y-0">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md">
            Welcome to Our Store
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-2 drop-shadow-md">
            Find the best products for your needs
          </p>
        </div>

        {/* Promotional Banner */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-20 bg-gradient-to-r from-red-500 to-yellow-500 px-8 py-4 rounded-full shadow-lg">
          <p className="text-xl md:text-2xl font-bold text-white animate-pulse">
            🎉 Flat 60% OFF for Limited Members, Order Fast! 🎉
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
