"use client";

import Map from "@/components/Map";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    comments: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    mobile: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    // Clear the error message when the user starts typing
    if (e.target.id === "email") {
      setErrors((prev) => ({ ...prev, email: "" }));
    } else if (e.target.id === "mobile") {
      setErrors((prev) => ({ ...prev, mobile: "" }));
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile: string) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    if (id === "email" && !validateEmail(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
    } else if (id === "mobile" && !validateMobile(value)) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Mobile number must be 10 digits.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all required fields are filled

    // Ensure there are no errors before submitting
    if (errors.email || errors.mobile) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    try {
      // Send WhatsApp Message
      const whatsappMessage = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMobile: ${formData.mobile}%0ASubject: ${formData.subject}%0AComments: ${formData.comments}`;
      const whatsappLink = `https://wa.me/919491915275?text=${whatsappMessage}`;
      window.open(whatsappLink, "_blank");

      // Notify User
      toast.success("Your message has been sent via WhatsApp!");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send your message. Please try again.");
    }
  };

  return (
    <>
      <Map />
      <section className="lg:py-24 py-16 bg-gray-100">
        <div className="main-container">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-12">
            {/* Left Image Section */}
            <div className="lg:col-span-5 md:col-span-6">
              <Image
                src={"/homeImg2.jpg"}
                width={500}
                height={500}
                alt="Contact Image"
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Form Section */}
            <div className="lg:col-span-7 md:col-span-6">
              <div className="lg:ms-5">
                <div className="bg-white shadow-md rounded-lg p-8 border border-gray-200">
                  <h3 className="mb-6 text-3xl font-semibold text-gray-800">
                    Get in touch
                  </h3>
                  <form onSubmit={handleFormSubmit}>
                    <div className="grid lg:grid-cols-12 grid-cols-1 gap-4">
                      <div className="lg:col-span-6">
                        <Input
                          type="text"
                          id="name"
                          label="Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="lg:col-span-6">
                        <Input
                          type="email"
                          id="email"
                          label="Email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          error={errors.email}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                      </div>
                      <div className="lg:col-span-6">
                        <Input
                          type="text"
                          id="mobile"
                          label="Mobile Number"
                          value={formData.mobile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          error={errors.mobile}
                        />
                        {errors.mobile && (
                          <p className="text-red-500 text-sm">
                            {errors.mobile}
                          </p>
                        )}
                      </div>
                      <div className="lg:col-span-12">
                        <Input
                          type="text"
                          id="subject"
                          label="Subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="lg:col-span-12">
                        <label
                          htmlFor="comments"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Your Comment:
                        </label>
                        <textarea
                          id="comments"
                          name="comments"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                          rows={4}
                          value={formData.comments}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button type="submit" className="w-full py-3 text-lg">
                        Send Message via WhatsApp
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
