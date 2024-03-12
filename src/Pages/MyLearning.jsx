import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import CourseCard from "../Components/CourseCard";
import { ClipLoader } from "react-spinners";
import InternalServer from "../Components/InternalServer";

function MyLearning({ route }) {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUser = async (_id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${route}/mycourses`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ _id }),
      });

      const result = await response.json();
      console.log(result);
      setCourses(result.courses);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(localStorage.getItem("_id"));
  }, []);

  if (error === true) {
    return <InternalServer />;
  }

  return (
    <div>
      <Navbar />
      {isLoading === false ? (
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-8 mx-auto">
            <div class="flex flex-wrap w-full mb-16">
              <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                  My Learning
                </h1>
                <div class="h-1 w-20 bg-indigo-500 rounded"></div>
              </div>
            </div>
            <section class="text-gray-600 body-font">
              <div class="container px-5 mx-auto">
                {courses.length === 0 ? (
                  <div class="flex flex-wrap -m-4">
                    <h2 className="text-2xl font-bold text-black">
                      Nothing to Show Buy some courses to start your journey..
                    </h2>
                  </div>
                ) : (
                  <div class="flex flex-wrap -m-4">
                    {courses &&
                      courses.map((item) => {
                        return (
                          <CourseCard
                            key={item._id}
                            title={item.title}
                            description={item.description}
                            category={item.category}
                            image={item.poster}
                            _id={item._id}
                            bought={true}
                          />
                        );
                      })}
                  </div>
                )}
              </div>
            </section>
          </div>
        </section>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader size={30} color="blue" />
        </div>
      )}
    </div>
  );
}

export default MyLearning;
