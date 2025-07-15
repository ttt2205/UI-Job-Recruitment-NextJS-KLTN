"use client";

import Link from "next/link";
import companyData from "../../../data/topCompany";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addDestination,
  addFoundationDate,
  addKeyword,
  addLocation,
  addPerPage,
  addSort,
  addPage,
  addSize,
} from "../../../features/filter/employerFilterSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getListCompanyPagination } from "@/services/company-feature.service";
import PaginationCustom from "../components/PaginationCustom";

const FilterTopBox = () => {
  const {
    keyword,
    location,
    destination,
    category,
    foundationDate,
    sort,
    perPage,
    page,
    size,
  } = useSelector((state) => state.employerFilter) || {};

  const [listCompany, setListCompany] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCompaniesPagination({
      page,
      size,
      sort,
      keyword,
      location,
      category,
      foundationDate,
    });
  }, [page, size, sort, keyword, location, category, foundationDate]);
  // ================================= Fetch Function ===============================/
  const fetchCompaniesPagination = async (pagination) => {
    const res = await getListCompanyPagination(pagination);
    console.log("res list company pagination: ", res);
    setListCompany(res?.results || []);
    setMeta(
      res?.meta || {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
      }
    );
  };
  // ================================= Handle Function ===============================/

  // keyword filter
  const keywordFilter = (item) =>
    keyword !== ""
      ? item?.name?.toLowerCase().includes(keyword?.toLowerCase()) && item
      : item;

  // location filter
  const locationFilter = (item) =>
    location !== ""
      ? item?.location?.toLowerCase().includes(location?.toLowerCase())
      : item;

  // destination filter
  const destinationFilter = (item) =>
    item?.destination?.min >= destination?.min &&
    item?.destination?.max <= destination?.max;

  // category filter
  const categoryFilter = (item) =>
    category !== ""
      ? item?.category?.toLocaleLowerCase() === category?.toLocaleLowerCase()
      : item;

  // foundation date filter
  const foundationDataFilter = (item) =>
    item?.foundationDate?.min >= foundationDate?.min &&
    item?.foundationDate?.max <= foundationDate?.max;

  // sort filter
  const sortFilter = (a, b) =>
    sort === "des" ? a.id > b.id && -1 : a.id < b.id && -1;

  // let content = companyData
  //   ?.slice(perPage.start !== 0 && 12, perPage.end !== 0 ? perPage.end : 21)
  //   ?.filter(keywordFilter)
  //   ?.filter(locationFilter)
  //   ?.filter(destinationFilter)
  //   ?.filter(categoryFilter)
  //   ?.filter(foundationDataFilter)
  //   ?.sort(sortFilter)
  //   ?.map((company) => (
  //     <div
  //       className="company-block-four col-xl-4 col-lg-6 col-md-6 col-sm-12"
  //       key={company.id}
  //     >
  //       <div className="inner-box">
  //         <button className="bookmark-btn">
  //           <span className="flaticon-bookmark"></span>
  //         </button>

  //         <div className="content-inner">
  //           <span className="featured">Featured</span>
  //           <span className="company-logo">
  //             <Image
  //               width={50}
  //               height={50}
  //               src={company.img}
  //               alt="company brand"
  //             />
  //           </span>
  //           <h4>
  //             <Link href={`/employers-single-v2/${company.id}`}>
  //               {company.name}
  //             </Link>
  //           </h4>
  //           <ul className="job-info flex-column">
  //             <li className="me-0">
  //               <span className="icon flaticon-map-locator"></span>
  //               {company.location}
  //             </li>
  //             <li className="me-0">
  //               <span className="icon flaticon-briefcase"></span>
  //               {company.jobType}
  //             </li>
  //           </ul>
  //         </div>

  //         <div className="job-type me-0">Open Jobs – {company.jobNumber}</div>
  //       </div>
  //     </div>
  //   ));

  // per page handler
  const perPageHandler = (e) => {
    const pageData = JSON.parse(e.target.value);
    dispatch(addPerPage(pageData));
  };

  // size handler
  const sizeHandler = (e) => {
    const sizeValue = e.target.value;
    dispatch(addSize(sizeValue));
  };

  // page handler
  const pageHandler = (e) => {
    const pageValue = e.target.value;
    dispatch(addPage(pageValue));
  };

  // sort handler
  const sortHandler = (e) => {
    dispatch(addSort(e.target.value));
  };

  // clear handler
  const clearAll = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addDestination({ min: 0, max: 100 }));
    dispatch(addCategory(""));
    dispatch(addFoundationDate({ min: 1900, max: 2028 }));
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 0 }));
    dispatch(addPage(1));
    dispatch(addSize(10));
  };

  // =============================== Render Function ===============================/
  return (
    <>
      <div className="ls-switcher">
        <div className="showing-result">
          <div className="text">
            <strong>{listCompany?.length}</strong> companies
          </div>
        </div>
        {/* End showing-result */}
        <div className="sort-by">
          {keyword !== "" ||
          location !== "" ||
          destination.min !== 0 ||
          destination.max !== 100 ||
          category !== "" ||
          foundationDate.min !== 1900 ||
          foundationDate.max !== new Date().getFullYear() ||
          sort !== "" ||
          perPage.start !== 0 ||
          perPage.end !== 0 ? (
            <button
              onClick={clearAll}
              className="btn btn-danger text-nowrap me-2"
              style={{
                minHeight: "45px",
                marginBottom: "15px",
              }}
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
            <option value="primaryIndustry_asc">Industry (A → Z)</option>
            <option value="primaryIndustry_desc">Industry (Z → A)</option>
            <option value="foundedIn_asc">FoundedIn ↑</option>
            <option value="foundedIn_desc">FoundedIn ↓</option>
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
        {listCompany.map((company) => (
          <div
            className="company-block-four col-xl-4 col-lg-6 col-md-6 col-sm-12"
            key={company.id}
          >
            <div className="inner-box">
              <button className="bookmark-btn">
                <span className="flaticon-bookmark"></span>
              </button>

              <div className="content-inner">
                <span className="featured">Featured</span>
                <span className="company-logo">
                  <Image width={50} height={50} src={""} alt="company brand" />
                </span>
                <h4>
                  <Link href={`/employers-single-v1/${company.id}`}>
                    {company.name}
                  </Link>
                </h4>
                <ul className="job-info flex-column">
                  <li className="me-0">
                    <span className="icon flaticon-map-locator"></span>
                    {company.address}
                  </li>
                  <li className="me-0">
                    <span className="icon flaticon-briefcase"></span>
                    {company.primaryIndustry}
                  </li>
                </ul>
              </div>

              <div className="job-type me-0">
                Open Jobs – {company.jobNumber}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* End .row */}

      {/* <Pagination /> */}
      <PaginationCustom page={page} size={size} totalPages={meta.totalPages} />
      {/* <!-- Pagination --> */}
    </>
  );
};

export default FilterTopBox;
