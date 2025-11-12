"use client";

import Link from "next/link";
import PaginationCustom from "../components/PaginationCustom";
import JobSelect from "../components/JobSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addDatePosted,
  addExperienceSelect,
  addJobTypeSelect,
  addKeyword,
  addLocation,
  addPerPage,
  addSalary,
  addSort,
  addPage,
  addSize,
  updateCurrency,
} from "../../../features/filter/filterSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getJobsPaginationForCandidate,
  getListJobPagination,
} from "@/services/job-feature.service";
import { convertJobType, formatJobResults } from "@/utils/convert-function";
import { toast } from "react-toastify";

const FilterJobBox = () => {
  const { jobList, jobSort } = useSelector((state) => state.filter);
  const [loading, setLoading] = useState(false);
  const {
    keyword,
    location,
    destination,
    category,
    datePosted,
    jobTypeSelect,
    experienceSelect,
    salary,
  } = jobList || {};

  const { sort, perPage, page, size } = jobSort;

  const dispatch = useDispatch();

  // ================ States ===============
  const [listJob, setListJob] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  });

  useEffect(() => {
    if (!loading) {
      fetchJobsPagination({
        page,
        size,
        sort,
        keyword,
        location,
        category,
        jobTypeSelect,
        datePosted,
        experienceSelect,
        salary,
      });
    }
  }, [
    page,
    size,
    sort,
    keyword,
    location,
    category,
    jobTypeSelect,
    datePosted,
    experienceSelect,
    salary,
  ]);

  //============================== Handle Fetch ================================/
  const fetchJobsPagination = async (pagination) => {
    setLoading(true);
    try {
      const res = await getJobsPaginationForCandidate(pagination);
      // const format = res.results ? formatJobResults(res.results) : [];
      setListJob(res.results || []);
      setMeta(
        res?.meta || {
          currentPage: 1,
          pageSize: 10,
          totalItems: 0,
          totalPages: 0,
        }
      );
    } catch (error) {
      console.error("Error fetchJobsPagination: ", error);
      toast.error("Unable to load job details.");
    } finally {
      setLoading(false);
    }
  };

  //==============================Handle Function=====================/
  // sort handler
  const sortHandler = (e) => {
    dispatch(addSort(e.target.value));
  };

  // size handler
  const sizeHandler = (e) => {
    const newSize = parseInt(e.target.value, 10); // ép về number
    dispatch(addSize(newSize));
  };

  // clear all filters
  const clearAll = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addCategory(""));
    dispatch(addJobTypeSelect(""));
    dispatch(addDatePosted(""));
    dispatch(addExperienceSelect(""));
    dispatch(updateCurrency({ currency: "", min: null, max: null }));
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 0 }));
    dispatch(addPage(1));
    dispatch(addSize(10));
  };

  // ========================== Format dữ liệu để hiển thị =============================/
  const formShowData =
    listJob?.map((job) => ({
      id: job?.id || null,
      title: job?.title || "Không có tiêu đề",
      companyName: job?.company?.name || "Chưa cập nhật",
      logo: job?.logo
        ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${job.logo}`
        : `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT_LOGO_FOR_EMPLOYER}`,
      location: job?.location || "Không xác định",
      jobTypes: job?.jobTypes?.map((item) => convertJobType(item)) || [],
    })) || [];

  // ========================== Render UI =============================/
  return (
    <>
      <div className="ls-switcher">
        <JobSelect />
        {/* End .showing-result */}

        <div className="sort-by">
          {keyword !== "" ||
          location !== "" ||
          category !== "" ||
          jobTypeSelect !== "" ||
          datePosted !== "" ||
          experienceSelect !== "" ||
          salary?.currency !== "" ||
          sort !== "" ||
          perPage.start !== 0 ||
          perPage.end !== 0 ||
          page !== 1 ? (
            <button
              onClick={clearAll}
              className="btn btn-danger text-nowrap me-2"
              style={{ minHeight: "45px", marginBottom: "15px" }}
            >
              Clear All
            </button>
          ) : undefined}

          <select
            value={sort}
            className="chosen-single form-select"
            onChange={sortHandler}
          >
            <option value="">Sort by (default)</option>
            <option value="name_asc">Name (A → Z)</option>
            <option value="name_desc">Name (Z → A)</option>
            <option value="industry_asc">Industry (A → Z)</option>
            <option value="industry_desc">Industry (Z → A)</option>
            <option value="experience_asc">Experience ↑</option>
            <option value="experience_desc">Experience ↓</option>
          </select>

          {/* End select */}

          <select
            onChange={sizeHandler}
            className="chosen-single form-select ms-3 "
            value={size}
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
          {/* End select */}
        </div>
        {/* End sort by filter */}
      </div>
      {/* <!-- ls Switcher --> */}

      {/* <div className="row">{content}</div> */}
      <div className="row">
        {formShowData.map((item) => (
          <div
            className="job-block-four col-xl-3 col-lg-4 col-md-6 col-sm-12"
            key={item.id}
          >
            <div className="inner-box">
              {item.jobTypes ? (
                <ul className="job-other-info">
                  {item.jobTypes?.map((val, i) => (
                    <li key={i} className={`${val.styleClass}`}>
                      {val.type}
                    </li>
                  ))}
                </ul>
              ) : null}
              <span className="company-logo">
                <Image
                  src={item.logo}
                  alt="featured job"
                  width={90}
                  height={90}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    width: "90px",
                    height: "90px",
                  }}
                />
              </span>
              <span className="company-name">{item.companyName}</span>
              <h4>
                <Link href={`/job-single-v3/${item.id}`}>{item.title}</Link>
              </h4>
              <div className="location">
                <span className="icon flaticon-map-locator"></span>
                {item.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* End .row with jobs */}

      {/* <Pagination /> */}
      <PaginationCustom page={page} size={size} totalPages={meta.totalPages} />
      {/* <!-- End Pagination --> */}
    </>
  );
};

export default FilterJobBox;
