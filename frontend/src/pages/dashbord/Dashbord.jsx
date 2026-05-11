import React from "react";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Dashbord = () => {
  const { mycourse } = CourseData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100  py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-600 bg-orange-100 px-4 py-1.5 rounded-full mb-5">
            My Learning
          </span>

          <h2 className="text-5xl md:text-6xl font-black text-stone-900 leading-tight tracking-tight mb-4">
            Enrolled{" "}
            <span className="italic text-violet-600">Courses</span>
          </h2>

          <p className="text-stone-500 text-base max-w-md mx-auto leading-relaxed">
            Pick up where you left off — all your courses in one place.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-7">
            <div className="w-12 h-px bg-stone-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <div className="w-12 h-px bg-stone-200" />
          </div>
        </div>

        {/* ── Course Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mycourse && mycourse.length > 0 ? (
            mycourse.map((e) => <CourseCard key={e._id} course={e} />)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-24">
              <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                <svg
                  className="w-11 h-11 text-violet-600/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <p className="text-2xl font-black text-stone-800 mb-2 tracking-tight">
                No Courses Enrolled Yet!
              </p>
              <p className="text-stone-400 text-sm text-center max-w-xs leading-relaxed">
                Browse available courses and start learning today.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashbord;