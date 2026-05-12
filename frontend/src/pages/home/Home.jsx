import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";
import { MessageCircle } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Welcome to our E-learning Platform</h1>
          <p>Learn, Grow, Excel</p>
          <button onClick={() => navigate("/courses")} className="common-btn">
            Get Started
          </button>
        </div>
      </div>
      <button
        onClick={() => navigate("/chart")}
        className="fixed left-360 -bottom-20 z-50 
    group relative
    flex items-center gap-2
    px-6 py-3 
    bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
    hover:from-blue-700 hover:via-purple-700 hover:to-pink-700
    text-white font-semibold
    rounded-full
    shadow-lg hover:shadow-2xl
    transform transition-all duration-300
    hover:scale-110 active:scale-95
    hover:rotate-3
    border-2 border-white/20
    backdrop-blur-sm
    overflow-hidden"
      >
        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Icon */}
        <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />

        {/* Text */}
        <span className="text-sm">Chat with AI</span>

        {/* Badge */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </button>
      <Testimonials />
    </div>
  );
};

export default Home;
