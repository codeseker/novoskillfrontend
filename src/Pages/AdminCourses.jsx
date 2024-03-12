import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import InternalServer from "../Components/InternalServer";

export default function AdminCourses({ route }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteCourseLoading, setDeleteCourseLoading] = useState(false);
  const [error, setError] = useState(false);

  const deleteCourse = async (_id) => {
    try {
      setDeleteCourseLoading(true);
      const response = await fetch(`${route}/deleteCourse`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          _id,
        }),
      });

      const result = await response.json();
      if (result.success != true) {
        setDeleteCourseLoading(false);
        return;
      }
      setData(data.filter((course) => course._id !== _id));
      setDeleteCourseLoading(false);
    } catch (error) {
      setError(true);
      return;
    }
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${route}/getAllCourses`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          _id: localStorage.getItem("_id"),
        }),
      });

      const result = await response.json();
      setLoading(false);
      if (result.success != true) {
        return;
      }
      setData(result.courses);
    } catch (error) {
      setError(true);
      return;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (error) {
    return <InternalServer />;
  }

  return (
    <div>
      <Navbar />
      {loading === true ? (
        <div className="flex justify-center items-center w-[97vw] h-[97vh]">
          <ClipLoader size={40} color="blue" />
        </div>
      ) : (
        <div className="flex flex-wrap mb-5">
          <div className="w-full max-w-full px-3 mb-6  mx-auto">
            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
              <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                {/* card header */}
                <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                  <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                    <span className="mr-3 font-semibold text-dark">
                      All Courses
                    </span>
                  </h3>
                </div>
                {/* end card header */}
                {/* card body  */}
                <div className="flex-auto block py-8 pt-6 px-9">
                  <div className="overflow-x-auto">
                    {data.length === 0 ? (
                      <h1 className="text-2xl text-black font-bold">
                        Nothing to Show, Create some courses.
                      </h1>
                    ) : (
                      <table className="w-full my-0 align-middle text-dark border-neutral-200">
                        <thead className="align-bottom">
                          <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                            <th className="pb-3 text-start min-w-[175px]">
                              Poster
                            </th>
                            <th className="pb-3 text-start min-w-[100px]">
                              OWNER
                            </th>
                            <th className="pb-3 text-start min-w-[100px]">
                              Lectures
                            </th>
                            <th className="pb-3 text-start min-w-[50px]">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => {
                            return (
                              <tr
                                key={item._id}
                                className="border-b border-dashed last:border-b-0"
                              >
                                <td className="p-5 pl-0">
                                  <div className="flex items-center">
                                    <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                      <img
                                        src={item.poster}
                                        className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                        alt=""
                                      />
                                    </div>
                                    <div className="flex flex-col justify-start">
                                      <Link className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                                        {" "}
                                        {item.title}{" "}
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                                <td className="pr-0 text-start">
                                  <span className="font-semibold text-light-inverse text-md/normal">
                                    {item.createrName}
                                  </span>
                                </td>
                                <td className="pr-0 text-start">
                                  <span className="text-center align-baseline inline-flex py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                    {item.lectures.length}{" "}
                                  </span>
                                </td>
                                <td className="pr-0 text-start">
                                  <div className="inline-flex items-center rounded-md shadow-sm">
                                    <Link
                                      className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center"
                                      to={`/admin/course?id=${item._id}`}
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
                                      <span>View</span>
                                    </Link>
                                    <button
                                      className="text-slate-800 hover:text-red-700 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                                      onClick={() => deleteCourse(item._id)}
                                    >
                                      {deleteCourseLoading === true ? (
                                        <div className="w-full h-full flex justify-center items-center">
                                          <ClipLoader color="red" size={20} />
                                        </div>
                                      ) : (
                                        <>
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
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                              />
                                            </svg>
                                          </span>
                                          <span>Delete</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
