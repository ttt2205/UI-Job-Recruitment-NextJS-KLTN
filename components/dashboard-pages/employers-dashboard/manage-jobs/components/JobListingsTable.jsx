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

const JobListingsTable = () => {
  // ================ States ===============
  const [loading, setLoading] = useState(false);
  const [categorySelected, setCategorySelected] = useState("");
  const [timeSelected, setTimeSelected] = useState(0);
  const [jobsList, setJobsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const { account } = useSelector((state) => state.auth);

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
        categorySelected,
        timeSelected
      )
        .then((data) => {
          setJobsList(data);
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
    category,
    time
  ) => {
    try {
      setLoading(true);
      const response = await getJobsByCompanyIdForDashboard(
        companyId,
        category,
        time
      );
      setLoading(false);
      if (!response || response.length === 0) {
        toast.info("No jobs found for the selected filters.");
        return [];
      }
      return response.results;
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
          setJobsList(data);
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
          setJobsList(data);
        })
        .catch((error) => {
          console.error("Error fetching jobs by companyId:", error);
          toast.error("Error fetching jobs. Please try again later.");
        });
    }
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
            <option value={6}>Last 6 Months</option>
            <option value={12}>Last 12 Months</option>
            <option value={16}>Last 16 Months</option>
            <option value={24}>Last 24 Months</option>
            <option value={60}>Last 5 year</option>
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

            {/* <tbody>
              {jobs.slice(0, 50).map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            <Image
                              width={50}
                              height={49}
                              src={item.logo}
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
                              Segment
                            </li>
                            <li>
                              <span className="icon flaticon-map-locator"></span>
                              London, UK
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="applied">
                    <a href="#">3+ Applied</a>
                  </td>
                  <td>
                    October 27, 2017 <br />
                    April 25, 2011
                  </td>
                  <td className="status">Active</td>
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
              ))}
            </tbody> */}

            {/* Table data of jobs */}
            <tbody>
              {loading ? (
                <Loading />
              ) : (
                jobsList.map((item) => (
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
    </div>
  );
};

export default JobListingsTable;
