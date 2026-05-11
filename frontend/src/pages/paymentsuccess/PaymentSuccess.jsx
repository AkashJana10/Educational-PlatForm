import React from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, ArrowRight, Receipt } from "lucide-react";
import "./paymentsuccess.css";

const PaymentSuccess = ({ user }) => {
  const params = useParams();
  return (
    <div className="payment-success-page min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 flex items-center justify-center">
      {user && (
        <div className="success-message max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 animate-fade-in-up">
          <div className="flex flex-col items-center text-center">
            {/* Animated check circle */}
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-green-500 rounded-full p-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Success heading */}
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Payment Successful!
            </h2>

            {/* Message */}
            <p className="text-gray-600 mb-2">
              Your course subscription has been activated
            </p>

            {/* Reference number */}
            <div className="mt-4 mb-6 bg-gray-50 rounded-lg p-3 flex items-center justify-center gap-2">
              <Receipt className="w-4 h-4 text-gray-500" />
              <p className="text-sm text-gray-600">
                Reference no:{" "}
                <span className="font-mono font-semibold text-gray-800">
                  {params.id}
                </span>
              </p>
            </div>

            {/* Dashboard button */}
            <Link
              to={`/${user._id}/dashboard`}
              className="common-btn inline-flex items-center gap-4 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
