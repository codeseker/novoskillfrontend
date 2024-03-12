import React, { useEffect, useState } from "react";
import CourseDetail from "../Components/CourseDetail";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import InternalServer from "../Components/InternalServer";

export default function CourseDetailPage({ route }) {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [bought, setBought] = useState(false);
  const [error, setError] = useState(false);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`${route}/getCourse?id=${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      setCourse(result.course);
      setLoading(false);
    } catch (error) {
      setError(true);
      return;
    }
  };

  const fetchUser = async (userId, courseId) => {
    try {
      const response = await fetch(`${route}/auth/getProfile`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ _id: userId }),
      });

      const user = await response.json();
      if (user.user.role === "admin") {
        setBought(true);
        return;
      }
      const lectures = user.user.courses;
      const isIdPresent = lectures.some(
        (course) => course.courseId === courseId
      );

      if (isIdPresent) {
        setBought(true);
        return;
      }
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    fetchUser(localStorage.getItem("_id"), id);
    fetchCourse();
  }, []);

  if (error) {
    return <InternalServer />;
  }
  return (
    <div>
      <Navbar />
      {loading === false ? (
        <CourseDetail course={course} route={route} bought={bought} />
      ) : (
        <div className="w-full h-screen container flex items-center justify-center">
          <ClipLoader size={40} color="blue" />
        </div>
      )}
      <Footer />
    </div>
  );
}
