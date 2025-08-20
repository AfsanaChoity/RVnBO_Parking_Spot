import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import GoogleMap from "../../components/Shared/GoogleMap";

import toast from "react-hot-toast";
import { useContactAdminMutation } from "../../redux/api/userApi";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    // email: "",
    subject: "",
    message: "",
  });

  const [contactAdmin, { isLoading }] = useContactAdminMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    contactAdmin(formData)
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Message sent successfully ✅");
        setFormData({ name: "", subject: "", message: "" });
      })
      .catch((err) => {
        // error coming from backend
        toast.error(err?.data?.message || "Something went wrong ❌");
      });
  };

  return (
    <div className="container mx-auto pt-20">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-10 lg:items-center px-4">
        <div className="lg:w-2/5">
          <h2 className=" font-medium text-[#004D6E]">Who we are</h2>
          <h3 className="text-2xl lg:text-4xl text-gray-700 mt-2 font-semibold">
            We care about customer services
          </h3>
          <p className="text-lg text-gray-600 mt-4">
            Want to chat? We’d love to hear from you! Get in touch with our
            Customer Success Team to inquire about speaking events, advertising
            rates, or just say hello.
          </p>
          <button className="mt-6 px-6 py-2 bg-[#8AC197] cursor-pointer font-semibold text-white rounded-lg hover:bg-teal-600 transition duration-300">
            Email Support
          </button>
        </div>

        {/* Contact Form Section */}
        <div className="border border-gray-200 p-6 rounded-lg shadow-md lg:w-3/5 mb-10 lg:mb-0">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
            {/* <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            /> */}
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-2 bg-[#468F9D] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-teal-600 transition duration-300"
            >
              Send Message
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Find Us on the Map</h3>
        <div>
          <GoogleMap text="RVnBO.com" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
