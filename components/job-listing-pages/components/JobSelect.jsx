"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  addDatePosted,
  addExperienceSelect,
  addJobTypeSelect,
  addSalary,
} from "../../../features/filter/filterSlice";
import { useEffect, useState } from "react";
import { getListSalaryForFilter } from "@/services/job-feature.service";

export default function JobSelect() {
  const { jobList } = useSelector((state) => state.filter);
  const { jobTypeList, datePost, experienceLavel } = useSelector(
    (state) => state.job
  );
  const [listFilterSalary, setListFilterSalary] = useState([]);

  const dispatch = useDispatch();
  // ================================ Fetch Function ==========================/
  useEffect(() => {
    fetchListFilterSalary();
  }, []);

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

  // salary handler
  const salaryHandler = (e) => {
    if (e.target.value !== "") {
      const data = JSON.parse(e.target.value);
      dispatch(addSalary(data));
    } else {
      dispatch(addSalary(null));
    }
  };

  // get listFilterSalary
  const fetchListFilterSalary = async () => {
    try {
      const listFilterSalary = await getListSalaryForFilter();
      setListFilterSalary(listFilterSalary);
    } catch (error) {
      throw error;
    }
  };

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

          <div className="form-group">
            <select
              onChange={salaryHandler}
              className="chosen-single form-select"
              value={JSON.stringify(jobList.salary ?? "")}
            >
              <option value={""}>Salary estimate</option>
              {listFilterSalary.map((salary) => {
                return (
                  <option value={JSON.stringify(salary)}>
                    {salary.min} - {salary.max}
                  </option>
                );
              })}
              {/* <option
                value={JSON.stringify({
                  min: 0,
                  max: 5000,
                })}
              >
                0 - 5000
              </option>
              <option
                value={JSON.stringify({
                  min: 5000,
                  max: 10000,
                })}
              >
                5000 - 10000
              </option>
              <option
                value={JSON.stringify({
                  min: 10000,
                  max: 15000,
                })}
              >
                10000 - 15000
              </option>
              <option
                value={JSON.stringify({
                  min: 15000,
                  max: 20000,
                })}
              >
                15000 - 20000
              </option> */}
            </select>
          </div>
          {/* End salary estimate filter */}
        </div>
      </div>
    </>
  );
}
