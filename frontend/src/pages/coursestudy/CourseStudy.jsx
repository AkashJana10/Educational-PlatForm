import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  return (
    <>
      {course && (
        <div className="min-h-screen from-gray-50 to-gray-100 px-4 text-black relative overflow-hidden">

          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-80px] left-[-80px] w-[420px] h-[420px] bg-indigo-900/25 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] bg-violet-900/20 rounded-full blur-[90px]" />
            {/* Subtle grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">

            {/* Top label */}
            <div className="flex items-center gap-2 mb-10">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.3em] text-indigo-400 font-semibold">
                Your Enrolled Course
              </span>
            </div>

            {/* Main card */}
            <div className="relative rounded-3xl border border-black/[0.07] bg-black/[0.03] backdrop-blur-sm overflow-hidden">

              {/* Top gradient bar */}
              <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />

              <div className="flex flex-col lg:flex-row gap-0">

                {/* Image Section */}
                <div className="lg:w-[420px] flex-shrink-0 relative">
                  <div className="relative h-64 lg:h-full min-h-[320px] overflow-hidden">
                    <img
                      src={`${server}/${course.image}`}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#060608] hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/30 to-transparent lg:hidden" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center gap-6">

                  {/* Title */}
                  <h2 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                    {course.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-400 text-sm lg:text-base leading-relaxed border-l-2 border-indigo-600/40 pl-4">
                    {course.description}
                  </p>

                  {/* Meta pills */}
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                      <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-xs text-gray-400">
                        by <span className="text-gray-700 font-semibold">{course.createdBy}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                      <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs text-gray-400">
                        <span className="text-gray-700 font-semibold">{course.duration}</span> weeks
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-white/10 via-indigo-500/20 to-transparent" />

                  {/* CTA */}
                  <Link to={`/lectures/${course._id}`}>
                    <button className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-950/60 hover:shadow-indigo-800/50 hover:scale-[1.02] active:scale-[0.98]">
                      {/* Play icon */}
                      <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                        <svg className="w-4 h-4 translate-x-px" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      Go to Lectures
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </Link>

                  {/* Footer note */}
                  <p className="text-xs text-gray-600 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    You have full lifetime access to this course
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;