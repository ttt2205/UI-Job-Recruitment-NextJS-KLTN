"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../../features/filter/filterSlice";
import { getListCategory } from "@/services/job-feature.service";
import { toTitleCase } from "@/utils/convert-function";

const Categories = () => {
  const { jobList } = useSelector((state) => state.filter) || {};
  const [categoryList, setCategoryList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategoryList();
  }, []);

  useEffect(() => {}, [jobList]);

  //  =============================Fetch===========================/
  const fetchCategoryList = async () => {
    try {
      const res = await getListCategory();
      setCategoryList(res?.results || []);
    } catch (error) {
      console.log("Lỗi khi lấy danh sách danh mục!");
    }
  };

  //  =============================Handle Function===========================/
  // category handler
  const categoryHandler = (e) => {
    dispatch(addCategory(e.target.value));
  };

  return (
    <>
      <select
        className="form-select"
        value={jobList.category}
        onChange={categoryHandler}
      >
        <option value="">Choose a category</option>
        {categoryList.map((category) => {
          const displayName = toTitleCase(category);
          return (
            <option key={category} value={category}>
              {displayName}
            </option>
          );
        })}

        {/* <option value="residential">Residential</option>
        <option value="commercial">Commercial</option>
        <option value="industrial">Industrial</option>
        <option value="apartments">Apartments</option> */}
      </select>
      <span className="icon flaticon-briefcase"></span>
    </>
  );
};

export default Categories;
