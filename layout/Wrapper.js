'use client';

import { fetchUserInfo, setToken } from "@/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Wrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch])

  return <>{children}</>;
};

export default Wrapper;
