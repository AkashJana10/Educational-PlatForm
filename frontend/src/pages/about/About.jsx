import React from "react";
import {
  BookOpen,
  Layout,
  Video,
  Megaphone,
  Sparkles,
  Code,
  Shield,
  Users,
  Calendar,
  Clock,
  MessageCircle,
  BarChart,
  Award,
  Zap,
  GraduationCap,
  CheckCircle,
  TrendingUp,
  Bot,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const highlights = [
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Structured Platform",
      description:
        "All courses organized in one place. No more confusion—students can easily find and enroll in their preferred courses.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Integrated Live Classes",
      description:
        "Live classes hosted directly on our platform. No dependency on Zoom or Google Meet—everything in one seamless experience.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Megaphone className="w-6 h-6" />,
      title: "Built-in Announcements",
      description:
        "No more WhatsApp chaos. All course announcements and updates are shared directly on the platform.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Educational Shorts",
      description:
        "Engaging bite-sized educational content for entertainment and better student engagement.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Online Code Editor",
      description:
        "Built-in code editor with test cases for solving coding problems during live classes.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Dual Admin System",
      description:
        "Super Admin & Admin roles with comprehensive management capabilities for teachers, courses, students, and exams.",
      gradient: "from-slate-600 to-slate-800",
    },
  ];

  const features = [
    {
      icon: <Calendar />,
      title: "Course Scheduling",
      description:
        "Upcoming and currently running courses displayed prominently",
    },
    {
      icon: <Clock />,
      title: "Timed Examinations",
      description: "Exams with timers and random question arrangement",
    },
    {
      icon: <Award />,
      title: "Course Certificates",
      description: "Certificates awarded upon course completion",
    },
    {
      icon: <BarChart />,
      title: "Performance Dashboard",
      description:
        "Student dashboard showing progress, activity, and activeness",
    },
    {
      icon: <Bot />,
      title: "AI Chatbot",
      description: "Technical support chatbot for instant assistance",
    },
    {
      icon: <Users />,
      title: "Attendance Tracking",
      description: "Class attendance and activity monitoring with alerts",
    },
    {
      icon: <TrendingUp />,
      title: "Smart Recommendations",
      description:
        "AI/ML based recommendation system for personalized learning",
    },
    {
      icon: <MessageCircle />,
      title: "Feedback Analysis",
      description: "Student feedback analysis for continuous improvement",
    },
  ];

  const adminFeatures = [
    {
      icon: <Shield />,
      role: "Super Admin",
      features: [
        "Admin management",
        "Teachers management",
        "Course management",
        "Payment & refund overview",
      ],
    },
    {
      icon: <Users />,
      role: "Admin",
      features: [
        "Student management",
        "Course scheduling",
        "Exam management",
        "Performance monitoring",
        "Feedback analysis",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-slate-900/80"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm font-medium">
                Introducing EduSmart
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Revolutionizing Online
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Learning Experience
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We are dedicated to providing high-quality online courses that
              help individuals learn and grow. Our all-in-one platform
              eliminates fragmentation, making education seamless, engaging, and
              effective.
            </p>
          </div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative w-full h-12 md:h-16 text-gray-50"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            To create a unified, intelligent, and engaging learning ecosystem
            that empowers students and educators alike, breaking down barriers
            to quality education through technology.
          </p>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduSmart
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlike traditional platforms that rely on fragmented tools, we
            provide everything in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent"
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${item.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features Grid */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Modern Learning
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed, all in one intelligent platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-purple-600 mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin System Highlight */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dual Admin{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Management System
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Robust administration for seamless platform management
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {adminFeatures.map((admin, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${index === 0 ? "bg-gradient-to-br from-slate-800 to-slate-900 text-white" : "bg-gradient-to-br from-blue-50 to-indigo-50"}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2 rounded-xl ${index === 0 ? "bg-slate-700" : "bg-indigo-200"}`}
                >
                  {admin.icon}
                </div>
                <h3
                  className={`text-2xl font-bold ${index === 0 ? "text-white" : "text-gray-900"}`}
                >
                  {admin.role}
                </h3>
              </div>
              <ul className="space-y-3">
                {admin.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle
                      className={`w-5 h-5 ${index === 0 ? "text-blue-400" : "text-green-500"}`}
                    />
                    <span
                      className={
                        index === 0 ? "text-gray-300" : "text-gray-700"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Unique Features Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">No Skipping</div>
              <p className="text-purple-200">
                First-time lecture watching cannot be skipped
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Random Questions</div>
              <p className="text-purple-200">
                Exams with timer & randomized question arrangement
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Mock Tests</div>
              <p className="text-purple-200">
                Practice with realistic mock examination environment
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Transform Your Learning Journey?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of students who are already experiencing the future of
          online education with EduSmart.
        </p>
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all hover:scale-105"
          onClick={() => navigate("/courses")}
        >
          Get Started Today
        </button>
      </div>
    </div>
  );
};

export default About;
