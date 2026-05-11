import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const { courses, fetchCourses } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: { token: localStorage.getItem("token") },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen  bg-amber-50 py-12">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-10 items-start">

          {/* ── Left: All Courses ── */}
          <div className="w-full xl:flex-1">

            {/* Section header */}
            <div className="mb-10">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-600 bg-orange-100 px-4 py-1.5 rounded-full mb-4">
                Manage
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight tracking-tight">
                All <span className="italic text-orange-500">Courses</span>
              </h1>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-12 h-px bg-stone-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <div className="w-12 h-px bg-stone-200" />
              </div>
            </div>

            {/* Course grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses && courses.length > 0 ? (
                courses.map((e) => <CourseCard key={e._id} course={e} />)
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20">
                  <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-5">
                    <svg
                      className="w-10 h-10 text-orange-400"
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
                  <p className="text-xl font-black text-stone-700 tracking-tight">No Courses Yet</p>
                  <p className="text-stone-400 text-sm mt-1">Add your first course using the form.</p>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Add Course Form ── */}
          <div className="w-full xl:w-96 shrink-0">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden sticky top-8">

              {/* Form header */}
              <div className="bg-stone-900 px-6 py-5">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full mb-3">
                  Admin Panel
                </span>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Add <span className="italic text-orange-400">Course</span>
                </h2>
              </div>

              {/* Form body */}
              <form onSubmit={submitHandler} className="px-6 py-6 space-y-4">

                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="e.g. React for Beginners"
                    className="w-full bg-amber-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5">
                    Description
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Short course description"
                    className="w-full bg-amber-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    placeholder="e.g. 999"
                    className="w-full bg-amber-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
                  />
                </div>

                {/* Created By */}
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5">
                    Instructor
                  </label>
                  <input
                    type="text"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    required
                    placeholder="Instructor name"
                    className="w-full bg-amber-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-amber-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition appearance-none cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    {categories.map((e) => (
                      <option value={e} key={e}>{e}</option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5">
                    Duration (weeks)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                    placeholder="e.g. 8"
                    className="w-full bg-amber-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5">
                    Course Thumbnail
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-stone-200 rounded-xl bg-amber-50 cursor-pointer hover:border-orange-300 hover:bg-orange-50 transition">
                    <svg className="w-7 h-7 text-stone-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs text-stone-400">Click to upload image</span>
                    <input
                      type="file"
                      required
                      onChange={changeImageHandler}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Image Preview */}
                {imagePrev && (
                  <div className="rounded-xl overflow-hidden border border-stone-100">
                    <img
                      src={imagePrev}
                      alt="Preview"
                      className="w-full h-40 object-cover"
                    />
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={btnLoading}
                  className="w-full bg-stone-900 hover:bg-orange-500 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                >
                  {btnLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Please Wait...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      Add Course
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;