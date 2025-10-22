"use client";

import Link from "next/link.js";
import Image from "next/image.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PaginationCustom from "./PaginationCustom.jsx";
import Loading from "@/components/dashboard-pages/Loading.jsx";
import { getApplicationsByCandidateIdForDashboard } from "@/services/application-featuer.service.js";
import { formatDate } from "@/utils/convert-function.js";

const JobListingsTable = () => {
  // ================ States ===============
  const [loading, setLoading] = useState(false);
  const [timeSelected, setTimeSelected] = useState(0);
  const [applicationList, setApplicationsList] = useState([]);
  const [status, setStatus] = useState("");
  const { account } = useSelector((state) => state.auth);
  const [meta, setMeta] = useState({
    totalItems: 0,
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
  });

  // ================ Effect Functions ===============
  useEffect(() => {
    if (account && account.id) {
      fetchApplicationsByCandidateIdForDashboard(
        account.id,
        meta?.currentPage || 1,
        meta?.pageSize || 10,
        timeSelected,
        status
      )
        .then((data) => {
          setApplicationsList(data.results);
          setMeta(data.meta);
        })
        .catch((error) => {
          console.error("Error fetching jobs by companyId:", error);
          toast.error("Error fetching jobs. Please try again later.");
        });
    }
  }, [account, status, timeSelected]);

  // ================ Fetch Functions ===============
  const fetchApplicationsByCandidateIdForDashboard = async (
    candidateId,
    page,
    size,
    datePosted,
    status
  ) => {
    setLoading(true);
    try {
      const response = await getApplicationsByCandidateIdForDashboard(
        candidateId,
        page,
        size,
        datePosted,
        status
      );

      if (!response) {
        toast.info("No jobs found for the selected filters.");
        return {};
      }
      return response;
    } catch (error) {
      console.error("Error fetching list jobs:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ================ Handle Functions ===============
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setTimeSelected(selectedTime);
  };

  // page handler
  const onChangePage = (currentPage) => {
    if (currentPage === meta.currentPage) return;

    fetchApplicationsByCandidateIdForDashboard(
      account.id,
      currentPage,
      meta.pageSize,
      timeSelected,
      status
    )
      .then((data) => {
        setApplicationsList(data.results);
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

    fetchApplicationsByCandidateIdForDashboard(
      account.id,
      meta.currentPage,
      newSize,
      timeSelected,
      status
    )
      .then((data) => {
        setApplicationsList(data.results);
        setMeta(data.meta);
      })
      .catch((error) => {
        console.error("Error fetching jobs by companyId:", error);
        toast.error("Error fetching jobs. Please try again later.");
      });
  };

  const onStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);
  };

  // ================ Render UI ===============
  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Applied Jobs</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select
            value={timeSelected}
            className="chosen-single form-select"
            onChange={handleTimeChange}
          >
            <option value={0}>Time (All)</option>
            <option value={30}>Last 1 Months</option> {/* 6 × 30 = 180 ngày */}
            <option value={90}>Last 3 Months</option> {/* 6 × 30 = 180 ngày */}
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
            onChange={onStatusChange}
            className="chosen-single form-select ms-3"
            value={status || ""}
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="REJECTED">Rejected</option>
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
          <div className="table-outer">
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Application Deadline</th>
                  <th>Date Applied</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <Loading />
                ) : (
                  applicationList.map((item) => (
                    <tr key={item?.job?.id}>
                      <td>
                        {/* <!-- Job Block --> */}
                        <div className="job-block">
                          <div className="inner-box">
                            <div className="content">
                              <span className="company-logo">
                                <Image
                                  width={50}
                                  height={49}
                                  src={
                                    item?.job?.logo
                                      ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${item.job.logo}`
                                      : process.env
                                          .NEXT_PUBLIC_IMAGE_DEFAULT_AVATAR
                                  }
                                  alt="logo"
                                />
                              </span>
                              <h4>
                                <Link href={`/job-single-v3/${item?.job?.id}`}>
                                  {item?.job?.jobTitle}
                                </Link>
                              </h4>
                              <ul className="job-info">
                                <li>
                                  <span className="icon flaticon-briefcase"></span>
                                  {item?.job?.company?.name}
                                </li>
                                <li>
                                  <span className="icon flaticon-map-locator"></span>
                                  {item?.job?.city}, {item?.job?.country}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {formatDate(item?.job?.datePosted, "DD/MM/YYYY")} <br />
                        {formatDate(item?.job?.expireDate, "DD/MM/YYYY")}
                      </td>
                      <td>{formatDate(item?.createdAt, "DD/MM/YYYY")}</td>
                      <td className="status">
                        {item?.status === "PENDING"
                          ? "Pending"
                          : item?.status === "ACCEPTED"
                          ? "Accepted"
                          : item?.status === "REVIEWED"
                          ? "Reviewed"
                          : item?.status === "REJECTED"
                          ? "Rejected"
                          : "Unknown"}
                      </td>
                      <td>
                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button data-text="View Aplication">
                                <Link href={`/job-single-v3/${item?.job?.id}`}>
                                  <span className="la la-eye"></span>
                                </Link>
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
