"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  addDatePosted,
  addExperienceSelect,
  addJobTypeSelect,
  addSalary,
  updateCurrency,
} from "../../../features/filter/filterSlice";
import { useEffect, useState } from "react";
import { getListSalaryForFilter } from "@/services/job-feature.service";

export default function JobSelect() {
  // ================================ States ==========================/
  const { jobList } = useSelector((state) => state.filter);
  const { jobTypeList, datePost, experienceLavel } = useSelector(
    (state) => state.job
  );
  const [listFilterSalary, setListFilterSalary] = useState([]);

  const dispatch = useDispatch();

  // ================================ Fetch Function ==========================/

  /**
   * Calculate total price
   * @param {string} currency
   * @returns {[
   *  {
   *    min: number,
   *    max: number
   *  }
   * ]} List filter salary
   */
  const fetchListFilterSalary = async (currency) => {
    try {
      const listFilterSalary = await getListSalaryForFilter(currency);
      setListFilterSalary(listFilterSalary);
    } catch (error) {
      throw error;
    }
  };

  // ================================ Handle Function ==========================/
  // job type handler
  const jobTypeHandler = (e) => {
    dispatch(addJobTypeSelect(e.target.value));
  };

  // date post handler
  const datePostHandler = (e) => {
    dispatch(addDatePosted(e.target.value));
  };

  // experience handler
  const experienceHandler = (e) => {
    dispatch(addExperienceSelect(e.target.value));
  };

  const salaryHandler = (e) => {
    const value = e.target.value;

    // Nếu người dùng chọn "Salary estimate" (rỗng)
    if (!value) {
      dispatch(
        updateCurrency({
          currency: jobList.salary.currency,
          min: "",
          max: "",
        })
      );
      return;
    }

    // Ngược lại, parse giá trị thật
    const salary = JSON.parse(value);
    dispatch(
      updateCurrency({
        currency: jobList.salary.currency,
        min: salary.min,
        max: salary.max,
      })
    );
  };

  const handleCurrencyOnChange = (e) => {
    const { value } = e.target;

    // Cập nhật vào Redux
    dispatch(updateCurrency({ currency: value, min: null, max: null }));

    // Nếu có currency thì fetch list salary
    if (value !== "") {
      fetchListFilterSalary(value);
    } else {
      setListFilterSalary([]);
    }
  };

  // ================================ Render UI ==========================/
  return (
    <>
      <div className="showing-result">
        <div className="top-filters">
          <div className="form-group">
            <select
              onChange={jobTypeHandler}
              className="chosen-single form-select"
              value={jobList?.jobTypeSelect}
            >
              <option value="">Job Type</option>
              {jobTypeList?.map((item) => (
                <option value={item.value} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {/* End job type filter */}

          <div className="form-group">
            <select
              onChange={datePostHandler}
              className="chosen-single form-select"
              value={jobList?.datePosted}
            >
              {datePost?.map((item) => (
                <option value={item.value} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {/* End date posted filter */}

          <div className="form-group">
            <select
              onChange={experienceHandler}
              className="chosen-single form-select"
              value={jobList?.experienceSelect}
            >
              <option value={""}>Experience Level (All)</option>
              {experienceLavel?.map((item) => (
                <option value={item.value} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {/* End ecperience level filter */}

          <div
            className="form-group"
            style={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
              width: "auto",
            }}
          >
            {/* Currency */}
            <select
              onChange={handleCurrencyOnChange}
              name="currency"
              className="chosen-single form-select"
              value={jobList.salary?.currency ?? ""}
              style={{
                backgroundColor: "#e0f2fe", // xanh nhạt
                border: "1px solid #38bdf8",
                borderRadius: "8px",
                fontWeight: "500",
                flex: 1,
                // transition: "all 0.2s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#bae6fd")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#e0f2fe")}
            >
              <option value="">Currency</option>
              <option value="VND">VND (₫)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>

            {/* Salary */}
            <select
              onChange={salaryHandler}
              className="chosen-single form-select"
              value={JSON.stringify({
                min: jobList.salary?.min ?? "",
                max: jobList.salary?.max ?? "",
              })}
              disabled={!jobList.salary?.currency}
              style={{
                backgroundColor: "#fff7ed", // cam nhạt
                border: "1px solid #fb923c",
                borderRadius: "8px",
                fontWeight: "500",
                flex: 1,
                transition: "all 0.2s ease-in-out",
                opacity: !jobList.salary?.currency ? 0.6 : 1,
                maxWidth: "200px", // ✅ Giới hạn chiều rộng
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#ffedd5")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#fff7ed")}
            >
              <option value="">Salary estimate</option>
              {listFilterSalary.length > 0 &&
                listFilterSalary.map((salary, index) => (
                  <option key={index} value={JSON.stringify(salary)}>
                    {salary.min} - {salary.max} {jobList.salary?.currency}
                  </option>
                ))}
            </select>
          </div>

          {/* End salary estimate filter */}
        </div>
      </div>
    </>
  );
}
