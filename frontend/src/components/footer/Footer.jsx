import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBookOpen,
  FaVideo,
  FaFileAlt,
  FaTrophy,
  FaRobot,
  FaUser,
  FaUsers,
  FaCog,
  FaChartLine,
  FaComments,
  FaGift,
  FaShieldAlt,
  FaClock,
  FaAward,
  FaCode,
} from "react-icons/fa";
import {useLocation} from "react-router-dom"
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  if(location.pathname === "/chart") return null;

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaGraduationCap className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EduSmart
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Revolutionizing online learning with structured courses, live classes, and AI-powered features for an enhanced educational experience.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-400 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-pink-600 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-red-600 transition-colors">
                <FaYoutube className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Features - Based on Documentation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Platform Features
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-500 rounded-full"></span>
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FaBookOpen className="w-4 h-4" />
                  Structured Courses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FaVideo className="w-4 h-4" />
                  Live Classes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FaFileAlt className="w-4 h-4" />
                  Exams & Mock Tests
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FaTrophy className="w-4 h-4" />
                  Course Certificates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FaRobot className="w-4 h-4" />
                  AI Chatbot Support
                </a>
              </li>
            </ul>
          </div>

          {/* User Roles - Based on Dual Admin System */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              User Roles
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-500 rounded-full"></span>
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FaShieldAlt className="w-4 h-4" />
                  Super Admin
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FaUsers className="w-4 h-4" />
                  Admin
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FaUser className="w-4 h-4" />
                  Teachers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FaGraduationCap className="w-4 h-4" />
                  Students
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FaCog className="w-4 h-4" />
                  Course Management
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Get in Touch
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-500 rounded-full"></span>
            </h3>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-center gap-3">
                <FaEnvelope className="w-5 h-5 text-blue-400" />
                <a href="mailto:support@edusmart.com" className="hover:text-blue-400 transition-colors">
                  support@edusmart.com
                </a>
              </p>
              <p className="flex items-center gap-3">
                <FaPhone className="w-5 h-5 text-blue-400" />
                <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </p>
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-blue-400" />
                <span>Online Learning Platform</span>
              </p>
            </div>
            
            {/* Educational Shorts Badge */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2 text-sm">
                <FaGift className="w-4 h-4 text-green-400" />
                <span className="text-gray-400">Educational Shorts Available</span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-2">
                <FaCode className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">Online Code Editor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} EduSmart Learning Platform. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Made with <span className="text-red-500">❤️</span> by Edusmart Team
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-700">|</span>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <span className="text-gray-700">|</span>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Refund Policy
              </a>
              <span className="text-gray-700">|</span>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Unique Features Strip - Based on Documentation */}
      <div className="bg-black/30 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <FaClock className="w-3 h-3" />
              <span>No Lecture Skipping</span>
            </div>
            <div className="flex items-center gap-1">
              <FaAward className="w-3 h-3" />
              <span>Timed Examinations</span>
            </div>
            <div className="flex items-center gap-1">
              <FaChartLine className="w-3 h-3" />
              <span>Performance Tracking</span>
            </div>
            <div className="flex items-center gap-1">
              <FaComments className="w-3 h-3" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;