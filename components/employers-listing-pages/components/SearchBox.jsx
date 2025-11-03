"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKeyword } from "../../../features/filter/employerFilterSlice";

const SearchBox = () => {
  const { keyword } = useSelector((state) => state.employerFilter);
  const [getKeyWord, setKeyWord] = useState(keyword);
  const dispatch = useDispatch();

  // Khi người dùng gõ
  const keywordHandler = (e) => {
    setKeyWord(e.target.value);
  };

  // Debounce 500ms mỗi khi getKeyWord thay đổi
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(addKeyword(getKeyWord)); // Gửi lên Redux sau 500ms
    }, 500);

    // Hủy timeout nếu user tiếp tục gõ
    return () => clearTimeout(timeout);
  }, [getKeyWord, dispatch]);

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
