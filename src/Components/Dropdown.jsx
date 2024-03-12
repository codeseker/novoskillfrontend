import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dropdown = ({ icon, menu }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative sm:my-4 md:my-0" ref={dropdownRef}>
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 mx-4"
        onClick={toggleDropdown}
      >
        <img
          src={icon}
          alt="Icon"
          className="w-10 h-10 object-cover rounded-full"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 p-4">
          <ul>
            {menu.map((item, index) => {
              return (
                <Link to={item.url} key={index}>
                  {item.label === "Logout" ? (
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("_id");
                        localStorage.removeItem("token");
                        navigate("/login");
                      }}
                    >
                      {item.label}
                    </li>
                  ) : (
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </li>
                  )}
                </Link>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
