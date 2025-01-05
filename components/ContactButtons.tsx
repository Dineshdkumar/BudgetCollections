import { FaSquareInstagram, FaSquareWhatsapp } from "react-icons/fa6";

const ContactButtons = () => {
  return (
    <div className="flex justify-center mt-6 space-x-4">
      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/919491915275"
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110"
        title="Chat on WhatsApp"
      >
        <FaSquareWhatsapp size={28} />
      </a>

      {/* Instagram Icon */}
      <a
        href="https://www.instagram.com/budget.collections_?igsh=YzJqNXZ5NGJmaGNu"
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-transform transform hover:scale-110"
        title="Follow on Instagram"
      >
        <FaSquareInstagram size={28} />
      </a>
    </div>
  );
};

export default ContactButtons;
