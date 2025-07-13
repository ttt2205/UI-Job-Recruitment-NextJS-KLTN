"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKeyword } from "../../../features/filter/filterSlice";

const SearchBox = () => {
  const { jobList } = useSelector((state) => state.filter);
  const [getKeyWord, setkeyWord] = useState(jobList.keyword);
  const dispatch = useDispatch();

  // Xử lý nhập từ người dùng
  const keywordHandler = (e) => {
    setkeyWord(e.target.value);
  };

  // Debounce khi keyword thay đổi
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(addKeyword(getKeyWord));
    }, 500); // 500ms debounce

    return () => clearTimeout(timer); // Cleanup nếu người dùng gõ tiếp
  }, [getKeyWord]);

  // Đồng bộ từ store vào local state (nếu cần)
  useEffect(() => {
    setkeyWord(jobList.keyword || "");
  }, [jobList.keyword]);

  return (
    <>
      <input
        type="text"
        name="listing-search"
        placeholder="Job title, keywords, or company"
        value={getKeyWord}
        onChange={keywordHandler}
      />
      <span className="icon flaticon-search-3"></span>
    </>
  );
};

export default SearchBox;
