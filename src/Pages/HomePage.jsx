import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Courses from "../Components/Courses";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import InternalServer from "../Components/InternalServer";

function HomePage({ route }) {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const fetchCourses = async () => {
    try {
      let url = `${route}/allCourses`;

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
    if (!localStorage.getItem("token") && !localStorage.getItem("_id")) {
      navigate("/login");
    }

    fetchCourses();
  }, []);

  if (error) {
    return <InternalServer />;
  }

  const webDevelopmentCourses = course.filter(
    (c) => c.category === "web development"
  );
  const androidDevelopmentCourses = course.filter(
    (c) => c.category === "android development"
  );
  const gameDevelopmentCourses = course.filter(
    (c) => c.category === "game development"
  );

  return (
    <div>
      <Navbar />
      <Banner />
      {loading === false ? (
        <>
          <Courses courses={course} category={"Explore Courses"} />
          <Courses category="Web Development" courses={webDevelopmentCourses} />
          <Courses
            category="Android Development"
            courses={androidDevelopmentCourses}
          />
          <Courses
            category="Game Development"
            courses={gameDevelopmentCourses}
          />
          <Footer />
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color="blue" />
        </div>
      )}
    </div>
  );
}

export default HomePage;
