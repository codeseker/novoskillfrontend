import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { HiOutlineXMark } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

import Dropdown from "./Dropdown";

export default function Navbar() {
  const navigate = useNavigate();
  const route = import.meta.env.VITE_BACKEND_URL;
  const [showProfile, setShowProfile] = useState(false);
  const [data, setData] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menu, setMenu] = useState({});
  const [val, setVal] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const categories = ["Home", "About", "Contact"];

  const fetchUser = async () => {
    setShowProfile(false);
    const _id = localStorage.getItem("_id");

    const response = await fetch(`${route}/auth/getProfile`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ _id }),
    });

    const result = await response.json();
    if (result.success != true) {
      return;
    }
    setShowProfile(true);
    setData(result);

    if (result.user.role === "admin") {
      setIsAdmin(true);
      setMenu([
        { label: "Profile", url: "/profile" },
        { label: "Courses", url: "/admin/courses" },
        { label: "Add Course", url: "/admin/create" },
        { label: "Logout", url: "/login" },
      ]);
    } else {
      setIsAdmin(false);
      setMenu([
        { label: "Profile", url: "/profile" },
        { label: "My Learning", url: "/myLearning" },
        { label: "Logout", url: "/login" },
      ]);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const links = ["Home", "About", "Contact"];
  return (
    <header className="sticky top-0 z-50 bg-white text-gray-600 body-font shadow-md">
      <div className="hidden sm:container sm:mx-auto sm:flex sm:flex-wrap p-5 sm:flex-col md:flex-row sm:items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">NovoSkill</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {links.map((item, index) => (
            <Link
              key={index}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="mr-5 hover:text-gray-900"
            >
              {item}
            </Link>
          ))}

          <div className="relative text-gray-600">
            <input
              type="search"
              name="search"
              placeholder="Search Courses"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="bg-gray-200 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none "
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-3 mr-4 cursor-pointer"
              onClick={() => navigate(`/search?courses=${val}`)}
            >
              <svg
                className="h-4 w-4 fill-current cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path
                  className="cursor-pointer"
                  d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                />
              </svg>
            </button>
          </div>
        </nav>

        {showProfile === true ? (
          <Dropdown icon={data.user.profile_url} menu={menu} />
        ) : (
          <Dropdown icon={""} />
        )}
      </div>
      <div className="p-5 -mb-[4.5rem] flex justify-between items-center flex-wrap sm:hidden md:hidden lg:hidden xl:hidden">
        <Link className="flex title-font font-medium items-center text-white md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">NovoSkill</span>
        </Link>
        <HiMenuAlt3
          className="text-gray-800 text-4xl"
          onClick={toggleSidebar}
        />
      </div>
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0  bg-opacity-75 z-50 sm:hidden md:hidden lg:hidden"
        >
          <div className="light-primary h-full w-[80%] fixed top-0 right-0 shadow-lg flex sm:hidden md:hidden lg:hidden">
            <aside className="p-3 flex flex-col gap-3 w-full ">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3">
                  <h6 className="text-lg font-semibold text-black">
                    Hi! {data.user.fullname}
                  </h6>
                </div>
                <HiOutlineXMark
                  className="text-2xl color-light-accent font-bold"
                  onClick={toggleSidebar}
                />
              </div>
              <hr />
              <div className="flex flex-col justify-center">
                <p className="font-semibold text-[12px]"></p>
                {categories.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="text-1xl leading-none my-2 "
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      )}
    </header>
  );
}
