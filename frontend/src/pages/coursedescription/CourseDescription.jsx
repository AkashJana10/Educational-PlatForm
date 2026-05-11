import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      { headers: { token } },
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "E learning",
      description: "Learn with us",
      order_id: order.id,
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            { razorpay_order_id, razorpay_payment_id, razorpay_signature },
            { headers: { token } },
          );
          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: { color: "#6d28d9" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="min-h-screen  bg-gradient-to-br from-gray-50 to-gray-100 px-4bg-[#0a0a0f] text-black font-[system-ui]">
              {/* Hero Section */}
              <div className="relative overflow-hidden">
                {/* Ambient glow background */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-700/20 rounded-full blur-3xl" />
                  <div className="absolute top-10 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-12">
                  <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Course Image */}
                    <div className="w-full lg:w-2/5 flex-shrink-0">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500" />
                        <div className="relative rounded-2xl overflow-hidden border border-white/10">
                          <img
                            src={`${server}/${course.image}`}
                            alt={course.title}
                            className="w-full h-64 lg:h-80 object-cover"
                          />
                          {/* Overlay shimmer */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 via-transparent to-transparent" />
                        </div>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="flex-1 space-y-6">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
                        Online Course
                      </div>

                      {/* Title */}
                      <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                        {course.title}
                      </h1>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                          <svg
                            className="w-4 h-4 text-violet-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span className="text-sm text-gray-300">
                            <span className="text-gray-500 mr-1">by</span>
                            <span className="font-semibold text-gray-500">
                              {course.createdBy}
                            </span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                          <svg
                            className="w-4 h-4 text-violet-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-sm text-gray-300">
                            <span className="font-semibold text-gray-500">
                              {course.duration}
                            </span>
                            <span className="text-gray-500 ml-1">weeks</span>
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-base leading-relaxed border-l-2 border-violet-600/50 pl-4">
                        {course.description}
                      </p>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-violet-600/30 via-white/10 to-transparent" />

                      {/* Pricing & CTA */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                            Course Price
                          </p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-gray-700">
                              ₹{course.price}
                            </span>
                            <span className="text-gray-500 text-sm">
                              one-time
                            </span>
                          </div>
                        </div>

                        {user && user.subscription.includes(course._id) ? (
                          <button
                            onClick={() =>
                              navigate(`/course/study/${course._id}`)
                            }
                            className="group relative flex items-center gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-violet-900/40 hover:shadow-violet-700/50 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Continue Learning
                            <svg
                              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        ) : (
                          <button
                            onClick={checkoutHandler}
                            className="group relative flex items-center gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-violet-900/40 hover:shadow-violet-700/50 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            Enroll Now
                            <svg
                              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* Trust badges */}
                      <div className="flex flex-wrap gap-4 pt-2">
                        {[
                          {
                            icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                            label: "Secure Payment",
                          },
                          {
                            icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                            label: "Lifetime Access",
                          },
                          {
                            icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                            label: "Certificate",
                          },
                        ].map(({ icon, label }) => (
                          <div
                            key={label}
                            className="flex items-center gap-1.5 text-xs text-gray-500"
                          >
                            <svg
                              className="w-3.5 h-3.5 text-violet-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={icon}
                              />
                            </svg>
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
