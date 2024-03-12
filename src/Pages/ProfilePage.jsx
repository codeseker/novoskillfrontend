import React, { useEffect, useState } from "react";
import Select from "react-select";
import Navbar from "../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import InternalServer from "../Components/InternalServer";

function ProfilePage({ route }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(null);
  const [profile, setProfile] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [updateLoad, setUpdateLoad] = useState(false);
  const openModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    if (!e.target.closest(".bg-white.rounded-md")) {
      setIsModalOpen(false);
    }
  };

  const updateUser = async () => {
    setUpdateLoad(true);
    const bodyData = {
      _id: localStorage.getItem("_id"),
    };

    // Check if fullName is not empty before including it in the request body
    if (fullName.trim() !== "") {
      bodyData.fullname = fullName;
    }

    // Check if role is selected before including it in the request body
    if (role) {
      bodyData.role = role;
    }

    if (email.trim() !== "") {
      bodyData.email = email;
    }

    const response = await fetch(`${route}/auth/updateProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(bodyData),
    });

    const result = await response.json();

    if (!result.success) {
      setError(true);
    } else if (result.updatedUser) {
      setUser(result.updatedUser);
      setEmail("");
      setFullName("");
      setProfile(null);
      setUpdateLoad(false);
    }
  };

  const updateProfilePic = async () => {
    setUpdateLoad(true);
    const data = new FormData();

    data.append("image", profile);

    const resposne = await fetch(`${route}/auth/profilePic`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data,
    });

    const result = await resposne.json();

    if (result.success) {
      setUpdateLoad(false);
      setUser(result.updatedUser);
      return;
    } else {
      setError(true);
      return;
    }
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      if (profile !== "") {
        await updateProfilePic();
        toast.success("Profile Picture Updated Successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (email || fullName || role) {
        await updateUser();
        toast.success("Profile Updated Successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      e.target.reset();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleRole = (val) => {
    setRole(val.value);
  };

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${route}/auth/getProfile`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ _id: localStorage.getItem("_id") }),
      });

      const result = await response.json();
      if (result.success === true) {
        console.log(result);
        setUser(result.user);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (error) {
    return <InternalServer />;
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      <Navbar />
      {loading === false ? (
        <div className="flex flex-col justify-between p-8 items-center">
          <div className="lg:max-w-lg lg:mx-4 my-10 bg-white rounded-lg shadow-md p-5">
            <img
              className="w-32 h-32 rounded-full mx-auto object-cover"
              src={user.profile_url}
              alt="Profile picture"
            />
            <h2 className="text-center text-2xl font-semibold mt-3">
              {user.fullname}
            </h2>
            <p className="text-center text-gray-600 mt-1">
              You are: {user.role}
            </p>
            <div className="mt-5">
              <h3 className="text-xl font-semibold">Details</h3>
              <p className="text-gray-600 mt-2">Email: {user.email}</p>
              <p className="text-gray-600 mt-2">
                Contact: {user.contactNumber}
              </p>
            </div>
          </div>
          <div className="mx-4 p-1">
            <button
              onClick={openModal}
              className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border rounded-sm border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center"
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <span>Update Profile</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="blue" size={40} />
        </div>
      )}

      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 mt-9 ${
          isModalOpen ? "opacity-100 mt-24" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeModal}
      >
        <div className="absolute w-full h-full p-4 bg-white rounded-lg shadow-md lg:p-0 lg:right-0 lg:mx-8 lg:w-3/12 lg:h-[81%]">
          <button onClick={closeModal} className="absolute top-0 right-0 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="w-full h-full p-8 bg-white rounded-md">
            <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>
            <form action="#" onSubmit={handleUpdateProfile} method="POST">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Choose Profile
                </label>
                <input
                  type="file"
                  id="category"
                  name="category"
                  onChange={(e) => setProfile(e.target.files[0])}
                  placeholder="Enter Category"
                  required=""
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Fullname
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Enter Fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required=""
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required=""
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Role
                </label>
                <Select
                  defaultValue={null}
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "user", label: "User" },
                  ]}
                  onChange={handleRole}
                />
              </div>
              {updateLoad === false ? (
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                  Update
                </button>
              ) : (
                <div className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center w-fit">
                  <ClipLoader size={20} color="white" />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
