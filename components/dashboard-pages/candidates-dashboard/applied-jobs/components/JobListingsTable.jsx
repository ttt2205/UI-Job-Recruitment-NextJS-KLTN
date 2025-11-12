"use client";

import Link from "next/link.js";
import Image from "next/image.js";
import { useEffect, useState, useMemo } from "react";
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
          setApplicationsList(data.results || []);
          setMeta(data.meta || meta);
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
  const handleTimeChange = (e) => setTimeSelected(e.target.value);
  const onStatusChange = (e) => setStatus(e.target.value);

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
        setApplicationsList(data.results || []);
        setMeta(data.meta || meta);
      })
      .catch((error) => {
        console.error("Error fetching jobs by companyId:", error);
        toast.error("Error fetching jobs. Please try again later.");
      });
  };

  const sizeHandler = (e) => {
    const newSize = e.target.value;
    setMeta((prev) => ({
      ...prev,
      pageSize: newSize,
      currentPage: 1,
    }));

    fetchApplicationsByCandidateIdForDashboard(
      account.id,
      1,
      newSize,
      timeSelected,
      status
    )
      .then((data) => {
        setApplicationsList(data.results || []);
        setMeta(data.meta || meta);
      })
      .catch((error) => {
        console.error("Error fetching jobs by companyId:", error);
        toast.error("Error fetching jobs. Please try again later.");
      });
  };

  // ================ Derived UI Data ===============
  const applicationListShowUI = useMemo(() => {
    return applicationList.map((item) => ({
      id: item?.job?.id,
      title: item?.job?.title || "No name",
      companyName: item?.job?.company?.name || "Unknown company",
      city: item?.job?.city || "",
      country: item?.job?.country || "",
      logo: item?.job?.logo
        ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${item.job.logo}`
        : process.env.NEXT_PUBLIC_IMAGE_DEFAULT_AVATAR_FOR_CANDIDATE,
      datePosted: formatDate(item?.job?.datePosted, "DD/MM/YYYY"),
      expireDate: formatDate(item?.job?.expireDate, "DD/MM/YYYY"),
      appliedDate: formatDate(item?.createdAt, "DD/MM/YYYY"),
      statusText:
        item?.status === "PENDING"
          ? "Pending"
          : item?.status === "ACCEPTED"
          ? "Accepted"
          : item?.status === "REVIEWED"
          ? "Reviewed"
          : item?.status === "REJECTED"
          ? "Rejected"
          : "Unknown",
    }));
  }, [applicationList]);

  // ================ Render UI ===============
  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Applied Jobs</h4>
        <div className="chosen-outer">
          <select
            value={timeSelected}
            className="chosen-single form-select"
            onChange={handleTimeChange}
          >
            <option value={0}>Time (All)</option>
            <option value={30}>Last 1 Month</option>
            <option value={90}>Last 3 Months</option>
            <option value={180}>Last 6 Months</option>
            <option value={360}>Last 12 Months</option>
            <option value={480}>Last 16 Months</option>
            <option value={720}>Last 24 Months</option>
            <option value={1825}>Last 5 Years</option>
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
            className="chosen-single form-select ms-3"
            value={meta?.pageSize || 10}
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      <div className="widget-content">
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
                applicationListShowUI.map((item) => (
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
                                {item.title}
                              </Link>
                            </h4>
                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                {item.companyName}
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                {item.city}, {item.country}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {item.datePosted} <br />
                      {item.expireDate}
                    </td>
                    <td>{item.appliedDate}</td>
                    <td className="status">{item.statusText}</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Application">
                              <Link href={`/job-single-v3/${item.id}`}>
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

      <div style={{ paddingBottom: "10px" }}>
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
