import React from "react";
import CourseCard from "./CourseCard";

export default function Courses({ courses, category }) {
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-8 mx-auto">
        <div class="flex flex-wrap w-full mb-16">
          <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              {category}
            </h1>
            <div class="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
        </div>
        <section class="text-gray-600 body-font">
          <div class="container px-5 mx-auto">
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
                      bought={false}
                    />
                  );
                })}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
