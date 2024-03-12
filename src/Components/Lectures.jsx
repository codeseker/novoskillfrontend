import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import InternalServer from "./InternalServer";

function Lectures({ route }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [courseLoading, setCourseLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(false);

  const [data, setData] = useState({});

  const fetchLectures = async () => {
    setLoading(true);
    const response = await fetch(`${route}/getCourse?id=${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = await response.json();
    setLoading(false);
    if (result.success != true) {
      setError(true);
      return;
    }
    setData(result);
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  if (error) {
    return <InternalServer />;
  }

  const addLecture = async (e) => {
    setCourseLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("video", video);
    data.append("_id", id);
    const response = await fetch(`${route}/addLectures`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data,
    });

    const result = await response.json();
    setCourseLoading(false);
    if (result.success != true) {
      setCourseLoading(false);
      return;
    }
    setData(result);
    setTitle("");
    setDescription("");
    setVideo(null);
    e.target.reset();
  };

  const deleteLecture = async (lectureId) => {
    const response = await fetch(`${route}/deleteLecture`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        _id: id,
        lect_id: lectureId,
      }),
    });
    const result = await response.json();
    setData(result);
  };

  return (
    <div>
      <Navbar />
      {loading === true ? (
        <div className="flex justify-center items-center w-[95vw] h-[99vh] sm:h-[80vh]">
          <ClipLoader size={40} color="blue" />
        </div>
      ) : (
        <div className="mt-20 sm:mt-0">
          <p className="text-black px-6 py-4 text-2xl font-bold">
            Course: {data.course ? data.course.title : "Loading..."}
          </p>
          <div className="grid sm:grid-cols-12 gap-4 m-3 h-full bg-white">
            <div className="min-h-[100px] bg-white sm:col-span-8 rounded sm:h-full">
              <div className="h-full p-4">
                <h1 className="text-black text-2xl font-bold mb-4">Lectures</h1>
                {data.course.lectures.map((item, index) => (
                  <div
                    key={item._id}
                    className="bg-white shadow-md shadow-indigo-300 py-2 px-4 rounded-md flex items-center justify-between min-h-[100px] mb-7"
                  >
                    <div className="flex flex-col">
                      <p className="text-1xl font-medium">
                        #{index + 1} {item.title || "Intro"}
                      </p>
                      <p className="text-1xl font-normal ml-4">
                        {item.description || "Description"}
                      </p>
                    </div>
                    <button
                      className="text-slate-800 hover:text-red-700 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                      onClick={() => deleteLecture(item._id)}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </span>
                      <span>Delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="min-h-[100px] sm:col-span-4 rounded sm:h-full p-4">
              <form onSubmit={addLecture} method="POST">
                <p className="font-bold text-xl mb-4">Add Lecture</p>
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="message"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Description
                  </label>
                  <textarea
                    rows={4}
                    name="description"
                    id="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    defaultValue={""}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="subject"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Video
                  </label>
                  <input
                    type="file"
                    name="poster"
                    id="poster"
                    required
                    onChange={(e) => setVideo(e.target.files[0])}
                    placeholder="Enter your name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div>
                  <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none w-full">
                    {courseLoading === true ? (
                      <div className="flex justify-center items-center w-full h-full">
                        <ClipLoader size={20} color="white" />
                      </div>
                    ) : (
                      "Add Lecture"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lectures;
