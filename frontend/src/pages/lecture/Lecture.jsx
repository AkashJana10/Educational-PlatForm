import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);
    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        { headers: { token: localStorage.getItem("token") } }
      );
      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setvideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progress, setProgress] = useState([]);

  async function fetchProgress() {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      setCompleted(data.courseProgressPercentage);
      setCompletedLec(data.completedLectures);
      setLectLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      console.log(error);
    }
  }

  const addProgress = async (id) => {
    try {
      const { data } = await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(data.message);
      fetchProgress();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(progress);

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-black">
          {/* ── Enhanced Progress Bar Header (Dark Theme) ── */}
          <div className="sticky top-0 z-30 bg-black/90 backdrop-blur border-b border-white/10 px-6 py-4">
            <div className="max-w-screen-2xl mx-auto flex items-center gap-5">
              <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
                <span className="text-xs font-medium text-white">
                  <span className="font-bold">{completedLec}</span>
                  <span className="text-gray-500"> / {lectLength}</span>
                </span>
                <span className="text-[11px] text-gray-400 uppercase tracking-wide">Lectures</span>
              </div>

              <div className="flex-1">
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out shadow-lg shadow-blue-500/20"
                    style={{ width: `${completed}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-3 py-1.5">
                <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
                  {completed}%
                </span>
                <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          {/* ── Fixed Two-Column Layout ── */}
          <div className="flex h-[calc(100vh-73px)] overflow-hidden">
            {/* ── LEFT: Video Player (Black Background) ── */}
            <div className="flex-1 bg-black flex flex-col overflow-y-auto">
              {lecLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <Loading />
                </div>
              ) : (
                <>
                  {lecture.video ? (
                    <div className="flex flex-col">
                      {/* Video Player Area */}
                      <div className="relative bg-black w-full aspect-video">
                        <video
                          src={`${server}/${lecture.video}`}
                          width="100%"
                          controls
                          controlsList="nodownload noremoteplayback"
                          disablePictureInPicture
                          disableRemotePlayback
                          autoPlay
                          onEnded={() => addProgress(lecture._id)}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Lecture Details */}
                      <div className="px-8 py-6 border-b border-white/10">
                        <div className="flex items-start gap-4">
                          <div className="w-1.5 h-12 rounded-full bg-gradient-to-b from-blue-500 to-purple-600 flex-shrink-0" />
                          <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
                              {lecture.title}
                            </h1>
                            <p className="text-gray-400 leading-relaxed text-sm">
                              {lecture.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8 text-center">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          <svg className="w-10 h-10 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm max-w-xs">
                        Select a lecture from the sidebar to start watching
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── RIGHT: Sidebar (White Background) ── */}
            <div className="w-full lg:w-96 flex-shrink-0 bg-white border-l border-gray-200 flex flex-col overflow-hidden shadow-xl">
              {/* Sidebar Header */}
              <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-10">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                  Course Content
                </h2>
                {user && user.role === "admin" && (
                  <button
                    onClick={() => setShow(!show)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${
                      show
                        ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                        : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                    }`}
                  >
                    {show ? "✕ Close" : "+ Add Lecture"}
                  </button>
                )}
              </div>

              {/* Add Lecture Form (Light Mode) */}
              {show && (
                <div className="px-5 py-5 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-bold text-gray-800 mb-4">Create New Lecture</h3>
                  <form onSubmit={submitHandler} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Lecture title..."
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Short description..."
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Video File
                      </label>
                      <label className="cursor-pointer flex items-center gap-2 bg-white border border-dashed border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 hover:border-blue-400 hover:text-blue-500 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        {video ? video.name : "Choose video file"}
                        <input type="file" onChange={changeVideoHandler} required className="hidden" />
                      </label>
                    </div>

                    {videoPrev && (
                      <video src={videoPrev} controls className="w-full rounded-lg border border-gray-200 mt-1" />
                    )}

                    <button
                      disabled={btnLoading}
                      type="submit"
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-200"
                    >
                      {btnLoading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Uploading...
                        </>
                      ) : (
                        "Add Lecture"
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* Lecture List (Light Mode) */}
              <div className="flex-1 overflow-y-auto">
                {lectures && lectures.length > 0 ? (
                  <div className="py-2">
                    {lectures.map((e, i) => {
                      const isActive = lecture._id === e._id;
                      const isDone =
                        progress[0] &&
                        progress[0].completedLectures.includes(e._id);

                      return (
                        <div key={i} className="px-3 py-1">
                          <div
                            onClick={() => fetchLecture(e._id)}
                            className={`group flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                              isActive
                                ? "bg-blue-50 border border-blue-200 shadow-sm"
                                : "hover:bg-gray-50 border border-transparent"
                            }`}
                          >
                            {/* Status Badge */}
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${
                                isDone
                                  ? "bg-green-100 border border-green-300 text-green-600"
                                  : isActive
                                  ? "bg-blue-100 border border-blue-300 text-blue-600"
                                  : "bg-gray-100 border border-gray-200 text-gray-500"
                              }`}
                            >
                              {isDone ? <TiTick className="w-4 h-4" /> : i + 1}
                            </div>

                            {/* Title */}
                            <span
                              className={`text-sm leading-snug flex-1 transition-colors ${
                                isActive
                                  ? "text-blue-700 font-semibold"
                                  : "text-gray-700 group-hover:text-gray-900"
                              }`}
                            >
                              {e.title}
                            </span>

                            {isActive && (
                              <svg className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </div>

                          {/* Admin Delete Button */}
                          {user && user.role === "admin" && (
                            <button
                              onClick={() => deleteHandler(e._id)}
                              className="mt-1 ml-10 flex items-center gap-1.5 text-xs text-red-500/70 hover:text-red-600 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 gap-3 text-center px-6">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                    <p className="text-sm text-gray-400">No lectures added yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;