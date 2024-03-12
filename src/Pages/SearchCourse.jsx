import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import Courses from "../Components/Courses";
import { ClipLoader } from "react-spinners";

function SearchCourse({ route }) {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courses = searchParams.get("courses");

  const fetchCourses = async () => {
    try {
      let url = `${route}/course?category=${courses}`;

      setLoading(true);
      const response = await fetch(`${url}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();
      setCourse(result.courses);
      setLoading(false);
    } catch (error) {
      setError(true);
      return;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [courses]);
  return (
    <>
      <Navbar />
      {loading === false ? (
        <Courses
          courses={course}
          category={`${courses.toUpperCase()} COURSES`}
        />
      ) : (
        <div className="flex justify-center items-center h-screen">
          {" "}
          <ClipLoader size={50} color="blue" />
        </div>
      )}
    </>
  );
}

export default SearchCourse;
