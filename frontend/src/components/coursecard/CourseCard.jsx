import React from "react";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1.5">
      {/* ── Thumbnail ── */}
      <div className="relative overflow-hidden h-48 bg-amber-50">
        <img
          src={`${server}/${course.image}`}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Price badge overlay */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-stone-900 text-sm font-bold px-3 py-1 rounded-full shadow-sm border border-stone-100">
          ₹{course.price}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-5 flex-grow flex flex-col gap-3">
        <h3 className="text-lg font-black text-stone-900 leading-snug tracking-tight line-clamp-2">
          {course.title}
        </h3>

        <div className="space-y-2">
          {/* Instructor */}
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 shrink-0">
              <svg
                className="w-3.5 h-3.5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </span>
            <span className="truncate">
              <span className="text-stone-400">By </span>
              <span className="font-semibold text-stone-700">
                {course.createdBy}
              </span>
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 shrink-0">
              <svg
                className="w-3.5 h-3.5 text-gary-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span>
              <span className="font-semibold text-stone-700">
                {course.duration} weeks
              </span>
              <span className="text-stone-400"> duration</span>
            </span>
          </div>
        </div>

        {/* Tag strip */}
        <div className="mt-auto pt-3 border-t border-stone-100">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gray-600 bg-orange-50 px-3 py-1 rounded-full">
            Course
          </span>
        </div>
      </div>

      {/* ── Footer / Actions ── */}
      <div className="px-5 pb-5 flex flex-col gap-2">
        {isAuth ? (
          <>
            {user && user.role !== "admin" ? (
              <>
                {user.subscription.includes(course._id) ? (
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="w-full bg-green-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Study
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="w-full common-btn active:scale-95 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Get Started
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Study
              </button>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="w-full common-btn active:scale-95 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Get Started
          </button>
        )}

        {user && user.role === "admin" && (
          <button
            onClick={() => deleteHandler(course._id)}
            className="w-full bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Delete Course
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
