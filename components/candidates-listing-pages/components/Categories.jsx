"use client";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../../features/filter/candidateFilterSlice";
import { getIndustryListOfCandidate } from "@/services/candidate-feature.service";
import { useEffect, useState } from "react";
import { toTitleCase } from "@/utils/convert-function";

const Categories = () => {
  const { category: getCategory } =
    useSelector((state) => state.candidateFilter) || {};

  const [categoryList, setCategoryList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategoryListOfCandidate();
  }, []);

  //  =============================Fetch===========================/
  const fetchCategoryListOfCandidate = async () => {
    try {
      const res = await getIndustryListOfCandidate();
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
        onChange={categoryHandler}
        value={getCategory}
        className="form-select"
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
      </select>
      <span className="icon flaticon-briefcase"></span>
    </>
  );
};

export default Categories;
