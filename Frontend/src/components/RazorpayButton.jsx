import React from "react";
import { replace, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";
import { baseUrl } from "../config/Api";
const RazorpayButton = ({ rideData }) => {
  const navigate = useNavigate();
  // Function to handle payment
  const handlePayment = async () => {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

    // Make an API call to your backend to create an order
    try {
      const response = await axios.post(
        `${baseUrl}/user/create-order`,
        { amount: 500 }, // Example amount (₹5)
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass token in header
          },
        }
      );

      const data = response.data;

      if (!data.orderId) {
        alert("Failed to create order.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
        amount: data.amount, // Amount in paise (100 = ₹1)
        currency: "INR", // Currency code
        order_id: data.orderId, // Order ID received from backend
        name: "RideMate",
        description: "Payment for ride",
        image: "https://your-logo-url.com/logo.png", // Optional logo
        handler: async function (response) {
          // Handle successful payment
          alert(`Payment successful: ${response.razorpay_payment_id}`);

          // Optionally, send the payment details to your backend for verification
          try {
            const paymentVerificationResponse = await axios.post(
              `${baseUrl}/user/payment-callback`,
              {
                payment_id: response.razorpay_payment_id,
                order_id: data.orderId,
                signature: response.razorpay_signature,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, // Pass token in header
                },
              }
            );

            if (paymentVerificationResponse.status === 200) {
              alert("Payment verified successfully.");
            } else {
              alert(
                `Payment verification failed: ${paymentVerificationResponse.data.message}`
              );
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Error verifying payment.");
          }
        },
        prefill: {
          name: rideData?.fullName,
          email: "customer@example.com",
          contact: "9876543210",
        },
        notes: {
          address: "Customer address",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order.");
    }
  };

  return (
    <>
      <Button
        onClick={handlePayment}
        disabled={false}
        loading={false}
        name={"Pay with Razorpay"}
        style={"bg-green-500 text-white cursor-pointer font-bold text-md"}
      />
    </>
  );
};

export default RazorpayButton;
