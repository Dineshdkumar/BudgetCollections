import Image from "next/image";

const Banner = () => {
  return (
    <section className="main-container flex justify-center my-5">
      <div className="max-w-7xl w-full mx-auto rounded-lg overflow-hidden shadow-lg">
        <Image
          src="/bannerImg.webp"
          width={1600} // Ensure this width is similar to your hero image width
          height={400} // Adjust the height as needed
          alt="Shirt Banner"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default Banner;
