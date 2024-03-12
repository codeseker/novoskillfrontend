import React from "react";
import HomePage from "./Pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseDetailPage from "./Pages/CourseDetailPage";
import ContactPage from "./Pages/ContactPage";
import CreateCourse from "./Pages/CreateCourse";
import ProfilePage from "./Pages/ProfilePage";
import AdminCourses from "./Pages/AdminCourses";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Lectures from "./Components/Lectures";
import VideoPage from "./Pages/VideoPage";
import MyLearning from "./Pages/MyLearning";
import About from "./Pages/About";
import SearchCourse from "./Pages/SearchCourse";

export default function App() {
  const backend = import.meta.env.VITE_BACKEND_URL;

  return (
    <BrowserRouter className="w-full h-screen light-primary">
      <Routes>
        <Route path="/" element={<HomePage route={backend} />} />
        <Route
          path="/detail/*"
          element={<CourseDetailPage route={backend} />}
        />
        <Route path="/contact" element={<ContactPage route={backend} />} />
        <Route
          path="/admin/create"
          element={<CreateCourse route={backend} />}
        />
        <Route
          path="/admin/courses"
          element={<AdminCourses route={backend} />}
        />
        <Route path="/admin/course/*" element={<Lectures route={backend} />} />
        <Route path="/profile" element={<ProfilePage route={backend} />} />
        <Route path="/login" element={<Login route={backend} />} />
        <Route path="/signup" element={<Signup route={backend} />} />
        <Route path="/video/*" element={<VideoPage route={backend} />} />
        <Route path="/myLearning" element={<MyLearning route={backend} />} />
        <Route path="/about" element={<About />} />
        <Route path="/search/*" element={<SearchCourse route={backend} />} />
      </Routes>
    </BrowserRouter>
  );
}
