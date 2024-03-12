import React from "react";
import Navbar from "../Components/Navbar";

function About() {
  return (
    <div>
      <Navbar />
      <div className="sm:flex items-center max-w-screen-xl ">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png" />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">
              About us
            </span>
            <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
              About <span className="text-indigo-600">Our Company</span>
            </h2>
            <p className="text-gray-700">
              Welcome to NovoSkill, your premier destination for comprehensive
              courses in every domain of technology. At NovoSkill, we're
              committed to empowering individuals with the knowledge and skills
              necessary to thrive in today's dynamic tech landscape.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
