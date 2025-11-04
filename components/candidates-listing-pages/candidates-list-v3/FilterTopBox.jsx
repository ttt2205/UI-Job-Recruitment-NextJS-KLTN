"use client";

import Link from "next/link";
import Pagination from "../components/Pagination";
import candidatesData from "../../../data/candidates";
import { useDispatch, useSelector } from "react-redux";
import {
  addCandidateGender,
  addCategory,
  addDatePost,
  addDestination,
  addKeyword,
  addLocation,
  addPerPage,
  addSort,
  clearExperienceF,
  clearQualificationF,
  addPage,
  addSize,
  addExperienceLevel,
  addEducationLevel,
} from "../../../features/filter/candidateFilterSlice";
import {
  clearDatePost,
  clearExperience,
  clearQualification,
} from "../../../features/candidate/candidateSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getListCandidatePagination } from "@/services/candidate-feature.service";
import PaginationCustom from "../components/PaginationCustom";

const FilterTopBox = () => {
  const {
    keyword,
    location,
    destination,
    category,
    candidateGender,
    datePost,
    experiences,
    qualifications,
    sort,
    perPage,
    page,
    size,
    experienceLevel,
    educationLevel,
  } = useSelector((state) => state.candidateFilter) || {};

  const dispatch = useDispatch();
  // ================ States ===================================/
  const [listCandidate, setListCandidate] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  });

  useEffect(() => {
    fetchCandidatesPagination({
      page,
      size,
      sort,
      keyword,
      location,
      category,
      experienceLevel,
      educationLevel,
      candidateGender,
    });
  }, [
    page,
    size,
    sort,
    keyword,
    location,
    category,
    experienceLevel,
    educationLevel,
    candidateGender,
  ]);

  // ================ Fetch Functions ==========================/
  const fetchCandidatesPagination = async (pagination) => {
    const res = await getListCandidatePagination(pagination);
    console.log("res list candidate pagination: ", res);
    setListCandidate(res?.results || []);
    setMeta(
      res?.meta || {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
      }
    );
  };

  // ================ Handle Functions ========================/
  // sort handler
  const sortHandler = (e) => {
    dispatch(addSort(e.target.value));
  };

  // page handler
  const pageHandler = (e) => {
    const newPage = parseInt(e.target.value, 1); // ép về number
    dispatch(addPage(newPage));
  };

  // size handler
  const sizeHandler = (e) => {
    const newSize = parseInt(e.target.value, 10); // ép về number]
    dispatch(addSize(newSize));
  };

  const experienceLevelHandler = (e) => {
    dispatch(addExperienceLevel(e.target.value));
  };

  const educationLevelHandler = (e) => {
    dispatch(addEducationLevel(e.target.value));
  };

  const genderHandler = (e) => {
    dispatch(addCandidateGender(e.target.value));
  };

  // clear handler
  const clearHandler = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addDestination({ min: 0, max: 100 }));
    dispatch(addCategory(""));
    dispatch(addCandidateGender(""));
    dispatch(addDatePost(""));
    dispatch(clearDatePost());
    dispatch(clearExperienceF());
    dispatch(clearExperience());
    dispatch(clearQualification());
    dispatch(clearQualificationF());
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 0 }));
    dispatch(addPage(1));
    dispatch(addSize(10));
    dispatch(addExperienceLevel(""));
    dispatch(addEducationLevel(""));
  };
  // ================ Render Functions ===============
  return (
    <>
      <div className="ls-switcher">
        <div className="showing-result">
          <div className="top-filters">
            <div className="form-group">
              <select
                value={candidateGender}
                className="chosen-single form-select"
                onChange={genderHandler}
              >
                <option value="">Candidate Gender (All)</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <select
                value={experienceLevel}
                className="chosen-single form-select"
                onChange={experienceLevelHandler}
              >
                <option value="" selected>
                  Experience Level (All)
                </option>
                <option value="1">{"< 1 năm"}</option>
                <option value="2">{"< 2 năm"}</option>
                <option value="3">{"< 3 năm"}</option>
                <option value="4">{"< 4 năm"}</option>
                <option value="5">{"< 5 năm"}</option>
                <option value="6">{"< 6 năm"}</option>
                <option value="7">{"< 7 năm"}</option>
                <option value="8">{"< 8 năm"}</option>
                <option value="9">{"< 9 năm"}</option>
                <option value="10">{"< 10 năm"}</option>
              </select>
            </div>

            <div className="form-group">
              <select
                value={educationLevel}
                className="chosen-single form-select"
                onChange={educationLevelHandler}
              >
                <option value="" selected>
                  Education Level
                </option>
                <option value="university">Đại học</option>
                <option value="college">Cao đẳng</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          {/* End top-left-filter */}
        </div>
        {/* End showing-result */}

        <div className="sort-by">
          {keyword !== "" ||
          location !== "" ||
          destination.min !== 0 ||
          destination.max !== 100 ||
          category !== "" ||
          candidateGender !== "" ||
          datePost !== "" ||
          experiences?.length !== 0 ||
          qualifications?.length !== 0 ||
          sort !== "" ||
          perPage?.start !== 0 ||
          perPage?.end !== 0 ||
          experienceLevel !== "" ||
          educationLevel !== "" ? (
            <button
              className="btn btn-danger text-nowrap me-2"
              style={{ minHeight: "45px", marginBottom: "15px" }}
              onClick={clearHandler}
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
      </div>
      {/* End top filter bar box */}

      <div className="row">
        {/* {content} */}
        {listCandidate.map((candidate) => (
          <div
            className="candidate-block-four col-lg-4 col-md-6 col-sm-12"
            key={candidate.id}
          >
            <div className="inner-box">
              <ul className="job-other-info">
                <li className="green">Featured</li>
              </ul>

              <span className="thumb">
                <Image
                  width={90}
                  height={90}
                  src={
                    candidate?.avatar
                      ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${candidate.avatar}`
                      : process.env
                          .NEXT_PUBLIC_IMAGE_DEFAULT_AVATAR_FOR_CANDIDATE
                  }
                  alt="candidates"
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    width: "90px",
                    height: "90px",
                  }}
                />
              </span>
              <h3 className="name">
                <Link href={`/candidates-single-v3/${candidate.id}`}>
                  {candidate?.name || "No Name"}
                </Link>
              </h3>
              <span className="cat">{candidate.designation}</span>

              <ul className="job-info">
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  {candidate?.location || "No location"}
                </li>
                <li>
                  <span className="icon flaticon-money"></span> $
                  {candidate?.hourlyRate || 0} / hour
                </li>
              </ul>
              {/* End candidate-info */}

              <ul className="post-tags">
                {candidate.tags.slice(0, 3).map((val, i) => (
                  <li key={i}>
                    <a href="#">{val}</a>
                  </li>
                ))}
              </ul>

              {/* End tags */}

              <Link
                href={`/candidates-single-v3/${candidate.id}`}
                className="theme-btn btn-style-three"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* End .row */}

      {/* <Pagination /> */}
      <PaginationCustom page={page} size={size} totalPages={meta.totalPages} />
      {/* <!-- Listing Show More --> */}
    </>
  );
};

export default FilterTopBox;
