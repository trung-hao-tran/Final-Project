/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomeV1 from "./components/home-v1";

import Prefetch from "./feature/auth/prefetch";

import TaskListPage from "./components/TaskList";

import Profile from "./components/profile_component/profile";
import Login from "./components/login";
import Register from "./components/register";
import TaskDetailsPage from "./components/task_details";

import AboutPage from "./components/about";
import ContactPage from "./components/contact";

import { useDispatch, useSelector } from "react-redux";
import {
  setAuthenticated,
  setCredentials,
  setUserId,
} from "./feature/auth/authSlice";
import AddTask from "./components/add-task";

import EditTask from "./components/edit-task";

const App = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true); // Add a loading state
  useEffect(() => {
    const checkRefresh = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token && !userId) {
        localStorage.clear();
        console.log("clear");
        dispatch(setAuthenticated(false));
        setLoading(false);
        return;
      }
      if (token) {
        try {
          const response = await fetch(
            "http://localhost:4000/api/user/refresh",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            dispatch(setAuthenticated(true));
            dispatch(setUserId(userId));
            dispatch(setCredentials({ token: token }));

            return;
          }
          localStorage.clear();
          dispatch(setAuthenticated(false));
        } catch (error) {
          console.error("Token refresh error:", error);
          localStorage.clear();
          dispatch(setAuthenticated(false));
        } finally {
          setLoading(false); // Set loading to false after the token check
        }
      }
    };

    checkRefresh();
  }, []);

  if (loading) {
    return <div>...</div>; // Or some loading spinner
  }

  return (
    <Routes>
      <Route element={<Prefetch />}>
        <Route path="/tasks" element={<TaskListPage />} />
        <Route path="/" element={<HomeV1 />} index />
        <Route path="/tasks/:id" element={<TaskDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {isAuthenticated ? (
          <>
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Redirect users trying to access protected routes to the login page */}
            <Route path="/add-task" element={<Navigate to="/login" />} />
            <Route path="/profile" element={<Navigate to="/login" />} />
          </>
        )}
      </Route>
    </Routes>
  );
};

export default App;
