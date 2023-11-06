/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import HomeV1 from "./components/home-v1";

import Prefetch from "./feature/auth/prefetch";

import ShopLeftSidebar from "./components/shop-left-sidebar";

import MyAccount from "./components/my-account";
import Login from "./components/login";
import Register from "./components/register";

import { useDispatch, useSelector } from "react-redux";
import {
  setAuthenticated,
  setCredentials,
  setUserId,
} from "./feature/auth/authSlice";
import AddTask from "./components/add-task";

const App = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const checkRefresh = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token && !userId) {
        localStorage.clear();
        console.log("clear");
        dispatch(setAuthenticated(false));

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
        }
      }
    };

    checkRefresh();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomeV1 />} index />
      <Route path="/shop-left-sidebar" element={<ShopLeftSidebar />} />
      {isAuthenticated ? (
        <>
          <Route element={<Prefetch />}>
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/profile" element={<MyAccount />} />
          </Route>
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
    </Routes>
  );
};

export default App;
