import React, { useState } from "react";
import {
  FiArrowLeft,
  FiSearch,
  FiPhone,
  FiMail,
  FiMessageSquare,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function HelpSupport() {
  const [searchQuery, setSearchQuery] = useState("");
  const { userRole } = useAuth();
  const faqs = [
    {
      question: "How to book a ride?",
      answer:
        'Open the Ridemate app, enter your destination, choose your ride type, and tap "Book Now". You\'ll be matched with a nearby driver.',
    },
    {
      question: "What to do if I left something in the car?",
      answer:
        "Contact our support team immediately. We'll help you get in touch with your driver to retrieve your lost item.",
    },
    {
      question: "How to cancel a ride?",
      answer:
        'To cancel a ride, open your active trip and tap on "Cancel Ride". Please note that cancellation fees may apply depending on the timing.',
    },
    {
      question: "Payment issues and refunds",
      answer:
        "For payment issues or refund requests, please contact our support team with your trip details. We'll investigate and resolve the issue promptly.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header Section */}
      <header className="p-4 flex items-center justify-between">
        <Link to={`/${userRole}/profile`}>
          <button className="text-2xl" aria-label="Go back">
            <FiArrowLeft />
          </button>
        </Link>
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <div className="w-8"></div> {/* Spacer for centering */}
      </header>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help topics"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* FAQs Section */}
      <section className="p-4">
        <h2 className="text-xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-plus border border-gray-200 rounded-lg"
            >
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="p-4">
        <div className="bg-gray-100 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <FiPhone className="mr-2" />
              <span>+1 (800) 123-4567</span>
            </div>
            <div className="flex items-center">
              <FiMail className="mr-2" />
              <a href="mailto:support@ridemate.com" className="underline">
                support@ridemate.com
              </a>
            </div>
            <div className="flex items-center">
              <FiMessageSquare className="mr-2" />
              <button className="underline">Open Support Chat</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="p-4 text-center">
        <div className="space-x-4">
          <a href="#" className="underline">
            Terms of Service
          </a>
          <a href="#" className="underline">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
