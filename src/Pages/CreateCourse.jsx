import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import InternalServer from "../Components/InternalServer";

function CreateCourse({ route }) {
  const categories = [
    { value: "web development", label: "Web Development" },
    { value: "android development", label: "Android Development" },
    { value: "game development", label: "Game Development" },
    { value: "finance", label: "Finance" },
    { value: "graphic design", label: "Graphic Design" },
    { value: "digital marketing", label: "Digital Marketing" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [poster, setPoster] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const handleCategory = (val) => {
    setSelectedCategory(val.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      data.append("_id", localStorage.getItem("_id"));
      data.append("createrName", createdBy);
      data.append("category", selectedCategory);
      data.append("description", description);

      data.append("title", title);
      data.append("poster", poster);
      data.append("price", Number(price));

      const response = await fetch(`${route}/createCourse`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      });

      const result = await response.json();
      setLoading(false);
      if (result.success != true) {
        toast.error(result.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success(result.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setTitle("");
      setDescription("");
      setCreatedBy("");
      setSelectedCategory(null);
      setPoster(null);
      setPrice("");
      setSelectedCategory(null);
    } catch (error) {
      setError(true);
    }
  };

  if (error) {
    return <InternalServer />;
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      <div>
        <Navbar />
        <div className="mt-16 sm:mt-0 flex items-center justify-center p-8">
          <div className="mx-auto w-full max-w-[550px]">
            <form onSubmit={handleSubmit} method="POST">
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
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
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
                  value={description}
                  placeholder="Enter description"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  defaultValue={""}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Category
                </label>
                <Select
                  name="category"
                  options={categories}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleCategory}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="subject"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Created By
                </label>
                <input
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter your name"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="subject"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="subject"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Poster
                </label>
                <input
                  type="file"
                  name="poster"
                  id="poster"
                  placeholder="Enter your name"
                  onChange={(e) => setPoster(e.target.files[0])}
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div>
                <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none w-full">
                  {loading === true ? (
                    <ClipLoader color="white" />
                  ) : (
                    "Create Course"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
