"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKeyword } from "../../../features/filter/candidateFilterSlice";

const SearchBox = () => {
  const { keyword } = useSelector((state) => state.candidateFilter);
  const [getKeyWord, setkeyWord] = useState(keyword || "");
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
    setkeyWord(keyword || "");
  }, [keyword]);

  return (
    <>
      <input
        type="text"
        name="listing-search"
        placeholder="Job title, keywords, or company"
        onChange={keywordHandler}
        value={keyword}
      />
      <span className="icon flaticon-search-3"></span>
    </>
  );
};

export default SearchBox;
