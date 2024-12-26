"use client";

import Map from "@/components/Map";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    comments: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Send Email via EmailJS
    try {
      await emailjs.send(
        "your_service_id", // Replace with your EmailJS service ID
        "your_template_id", // Replace with your EmailJS template ID
        {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          subject: formData.subject,
          comments: formData.comments,
        },
        "ktjE1Kk_wg1H_PXtr" // Replace with your EmailJS user ID
      );

      // Send WhatsApp Message
      const whatsappMessage = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMobile: ${formData.mobile}%0ASubject: ${formData.subject}%0AComments: ${formData.comments}`;
      const whatsappLink = `https://wa.me/916302944423?text=${whatsappMessage}`;
      window.open(whatsappLink, "_blank");

      // Notify User
      toast.success("Your message has been sent successfully!");
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
                          required
                        />
                      </div>
                      <div className="lg:col-span-6">
                        <Input
                          type="text"
                          id="mobile"
                          label="Mobile Number"
                          value={formData.mobile}
                          onChange={handleChange}
                          required
                        />
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
                          rows="4"
                          value={formData.comments}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button type="submit" className="w-full py-3 text-lg">
                        Send Message
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
