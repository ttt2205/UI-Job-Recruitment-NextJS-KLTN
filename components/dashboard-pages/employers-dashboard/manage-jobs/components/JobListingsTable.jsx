"use client";

import Link from "next/link";
import jobs from "../../../../../data/job-featured.js";
import Image from "next/image.js";
import { getCategoryListByCompanyId } from "@/services/job-feature.service.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getJobsByCompanyIdForDashboard } from "@/services/job-feature.service.js";
import Loading from "@/components/dashboard-pages/Loading.jsx";
import PaginationCustom from "./PaginationCustom.jsx";

const JobListingsTable = () => {
  // ================ States ===============
  const [loading, setLoading] = useState(false);
  const [categorySelected, setCategorySelected] = useState("");
  const [timeSelected, setTimeSelected] = useState(0);
  const [jobsList, setJobsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const { account } = useSelector((state) => state.auth);
  const [meta, setMeta] = useState({
    totalItems: 0,
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
  });

  useEffect(() => {
    if (account && account.id) {
      fetchCategoryByCompanyId(account.id)
        .then((data) => {
          setCategories(data);
        })
        .catch((error) => {
          console.error("Error fetching categories by companyId:", error);
        });

      fetchJobsByCompanyIdForDashboard(
        account.id,
        meta.currentPage,
        meta.pageSize,
        categorySelected,
        timeSelected
      )
        .then((data) => {
          setJobsList(data.results);
          setMeta(data.meta);
        })
        .catch((error) => {
          console.error("Error fetching jobs by companyId:", error);
          toast.error("Error fetching jobs. Please try again later.");
        });
    }
  }, [account]);

  // ================ Fetch Functions ===============
  const fetchCategoryByCompanyId = async (companyId) => {
    try {
      const response = await getCategoryListByCompanyId(companyId);
      console.log("Categories by Company ID:", response.results);
      // Xử lý dữ liệu response.data theo nhu cầu của bạn
      return response.results;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  const fetchJobsByCompanyIdForDashboard = async (
    companyId,
    page,
    size,
    category,
    datePosted
  ) => {
    try {
      setLoading(true);
      const response = await getJobsByCompanyIdForDashboard(
        companyId,
        page,
        size,
        category,
        datePosted
      );
      setLoading(false);
      if (!response) {
        toast.info("No jobs found for the selected filters.");
        return {};
      }
      return response;
    } catch (error) {
      console.error("Error fetching list jobs:", error);
      return [];
    }
  };

  // ================ Handle Functions ===============
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategorySelected(selectedCategory);
    if (account && account.id) {
      fetchJobsByCompanyIdForDashboard(
        account.id,
        selectedCategory,
        timeSelected
      )
        .then((data) => {
          setJobsList(data.results);
          setMeta(data.meta);
        })
        .catch((error) => {
          console.error("Error fetching jobs by companyId:", error);
          toast.error("Error fetching jobs. Please try again later.");
        });
    }
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setTimeSelected(selectedTime);
    if (account && account.id) {
      fetchJobsByCompanyIdForDashboard(
        account.id,
        categorySelected,
        selectedTime
      )
        .then((data) => {
          setJobsList(data.results);
          setMeta(data.meta);
        })
        .catch((error) => {
          console.error("Error fetching jobs by companyId:", error);
          toast.error("Error fetching jobs. Please try again later.");
        });
    }
  };

  // page handler
  const onChangePage = (currentPage) => {
    if (currentPage === meta.currentPage) return;

    fetchJobsByCompanyIdForDashboard(
      account.id,
      currentPage,
      meta.pageSize,
      categorySelected,
      timeSelected
    )
      .then((data) => {
        setJobsList(data.results);
        setMeta(data.meta);
      })
      .catch((error) => {
        console.error("Error fetching jobs by companyId:", error);
        toast.error("Error fetching jobs. Please try again later.");
      });
  };

  // size handler
  const sizeHandler = (e) => {
    const newSize = e.target.value;

    setMeta((prev) => ({
      ...prev,
      pageSize: newSize,
      currentPage: 1,
    }));

    fetchJobsByCompanyIdForDashboard(
      account.id,
      meta.currentPage,
      newSize,
      categorySelected,
      timeSelected
    )
      .then((data) => {
        setJobsList(data.results);
        setMeta(data.meta);
      })
      .catch((error) => {
        console.error("Error fetching jobs by companyId:", error);
        toast.error("Error fetching jobs. Please try again later.");
      });
  };

  // ================ Render UI ===============
  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Job Listings</h4>

        <div className="chosen-outer">
          {/* <!-- Category filter--> */}
          <select
            value={categorySelected}
            className="chosen-single form-select"
            style={{ marginRight: 10, paddingRight: 35 }}
            onChange={handleCategoryChange}
          >
            <option value={""}>Categories (All)</option>
            {categories?.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* <!--Tabs Box--> */}
          <select
            value={timeSelected}
            className="chosen-single form-select"
            onChange={handleTimeChange}
          >
            <option value={0}>Time (All)</option>
            <option value={180}>Last 6 Months</option> {/* 6 × 30 = 180 ngày */}
            <option value={360}>Last 12 Months</option>{" "}
            {/* 12 × 30 = 360 ngày ≈ 1 năm */}
            <option value={480}>Last 16 Months</option>{" "}
            {/* 16 × 30 = 480 ngày */}
            <option value={720}>Last 24 Months</option>{" "}
            {/* 24 × 30 = 720 ngày = 2 năm */}
            <option value={1825}>Last 5 Years</option>{" "}
            {/* 5 × 365 = 1825 ngày */}
          </select>

          <select
            onChange={sizeHandler}
            className="chosen-single form-select ms-3 "
            value={meta?.pageSize || 10}
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Applications</th>
                <th>Created & Expired</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            {/* Table data of jobs */}
            <tbody>
              {loading ? (
                <Loading />
              ) : (
                jobsList?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <span className="company-logo">
                              <Image
                                width={50}
                                height={60}
                                src={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${item?.logo}`}
                                alt="logo"
                              />
                            </span>
                            <h4>
                              <Link href={`/job-single-v3/${item.id}`}>
                                {item.jobTitle}
                              </Link>
                            </h4>
                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                {item?.company?.name}
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                {item?.city}, {item?.country}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="applied">
                      <a href="#">{item?.applications} Applied</a>
                    </td>
                    <td>
                      {item?.datePosted} <br />
                      {item?.expireDate}
                    </td>
                    <td className="status">
                      {item?.status ? "Active" : "Unactive"}
                    </td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Aplication">
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Update Job">
                              <span className="la la-pencil"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Delete Job">
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* End table widget content */}

      {/* <Pagination /> */}
      <div
        style={{
          paddingBottom: "10px",
        }}
      >
        <PaginationCustom
          page={meta?.currentPage || 1}
          totalPages={meta?.totalPages || 1}
          onChangePage={onChangePage}
        />
      </div>
    </div>
  );
};

export default JobListingsTable;
