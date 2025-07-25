'use client';

import { fetchUserInfo, setToken } from "@/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Wrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("token: ", token)
    if (token) {
      dispatch(setToken(token));
      dispatch(fetchUserInfo());
    }
  }, [])

  return <>{children}</>;
};

export default Wrapper;
