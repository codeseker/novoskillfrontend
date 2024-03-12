import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CourseDetail({ course, route, bought }) {
  const buyCourse = async (amt, courseId) => {
    let res = await fetch(`${route}/payment/buy`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        price: amt,
      }),
    });
    let result = await res.json();
    const { order_id } = result;

    res = await fetch(`${route}/payment/razorkey`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    result = await res.json();
    const { key } = result;

    let options = {
      key: key,
      amount: amt * 100,
      name: "NovoSkill",
      order_id,
      handler: async (response) => {
        const r = await fetch(`${route}/payment/verifypayment`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            courseId,
          }),
        });
        const jr = await r.json();
      },
      prefill: {
        name: "NovoSkill",
        email: "@novoskillhelp.com",
        contact: "9887153864",
      },
      theme: {
        color: "#528ff0",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  return (
    <section className="text-gray-600 body-font overflow-hidden my-8">
      <div className="container px-5 py-12 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={course.poster}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
              {`${course.category}`}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {course.title}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <span className="text-gray-600">
                  Created by{" "}
                  <span className="font-bold text-black">
                    {course.createrName}
                  </span>
                </span>
              </span>
            </div>
            <p className="leading-relaxed">{course.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                {course.price}₹
              </span>
              {bought === false ? (
                <button
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  onClick={() => buyCourse(course.price, course._id)}
                >
                  Buy Now
                </button>
              ) : (
                <Link className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Already Bought
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
