// src/pages/OrderSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";
import successImage from "../assets/success.png";

const OrderSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center gap-6">
                <img
                    src={successImage}
                    alt="Success"
                    className="w-40 h-40 object-contain"
                />
                <h1 className="text-3xl font-bold text-green-600">
                    Order Placed Successfully!
                </h1>
                <p className="text-gray-600 text-center">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>
                <Link
                    to="/"
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
