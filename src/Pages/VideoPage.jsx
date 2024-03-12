import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import InternalServer from "../Components/InternalServer";

function VideoPage({ route }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [lectures, setLectures] = useState([]);
  const [selectedLectureIndex, setSelectedLectureIndex] = useState(0);
  const videoRef = useRef(null);
  const [error, setError] = useState(false);
  const fetchCourse = async (id) => {
    const response = await fetch(`${route}/getCourse?id=${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = await response.json();
    if (result.success) {
      setLectures(result.course.lectures);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    fetchCourse(id);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [selectedLectureIndex]);

  const handleLectureClick = (index) => {
    setSelectedLectureIndex(index);
  };

  if (error) {
    return <InternalServer />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 m-4">
        {lectures.length > 0 && selectedLectureIndex !== null && (
          <div className="md:col-span-9 rounded-lg container aspect-ratio-16/9 overflow-hidden">
            <video
              key={selectedLectureIndex}
              className="w-full md:h-[94vh] bg-zinc-700"
              controls
              autoPlay
              muted
              ref={videoRef}
            >
              <source
                src={lectures[selectedLectureIndex].video}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <div className="bg-white md:col-span-3 p-2 rounded-md overflow-y-auto h-[93vh]">
          <div>
            <div className="h-full">
              {lectures.map((item, index) => (
                <div
                  key={index}
                  className="mb-2 bg-gray-100 hover:bg-gray-200 rounded-md p-3 cursor-pointer shadow"
                  onClick={() => handleLectureClick(index)}
                >
                  <div className="flex flex-col">
                    <p className="text-1xl font-medium">
                      #{index + 1} {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;
