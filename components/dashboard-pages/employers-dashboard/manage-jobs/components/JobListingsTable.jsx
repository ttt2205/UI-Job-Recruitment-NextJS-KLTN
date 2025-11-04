"use client";

import Link from "next/link";
import jobs from "../../../../../data/job-featured.js";
import Image from "next/image.js";
import {
  getCategoryListByCompanyId,
  updatePartitionalJobById,
} from "@/services/job-feature.service.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getJobsByCompanyIdForDashboard } from "@/services/job-feature.service.js";
import Loading from "@/components/dashboard-pages/Loading.jsx";
import PaginationCustom from "./PaginationCustom.jsx";
import { formatDate } from "@/utils/convert-function.js";
import FormUpdateJob from "./FormUpdateJob.jsx";
import { Modal } from "bootstrap";

const JobListingsTable = () => {
  // ================ States ===============
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [jobIdSelect, setJobIdSelect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState(null); // 'lock' hoặc 'unlock'
  const [categorySelected, setCategorySelected] = useState("");
  const [timeSelected, setTimeSelected] = useState(0);
  const [jobsList, setJobsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const { account } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [meta, setMeta] = useState({
    totalItems: 0,
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
  });

  // ================ Effect Functions ===============
  useEffect(() => {
    if (account && account.id) {
      fetchCategoryByCompanyId(account.id)
        .then((data) => {
          setCategories(data);
        })
        .catch((error) => {
          console.error("Error fetching categories by companyId:", error);
        });

      fetchJobsByCompanyIdForDashboard();
    }
  }, [account, page, size, categorySelected, timeSelected]);

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

  const fetchJobsByCompanyIdForDashboard = async () => {
    try {
      setLoading(true);
      const response = await getJobsByCompanyIdForDashboard(
        account.id,
        page,
        size,
        categorySelected,
        timeSelected
      );
      setLoading(false);
      if (!response) {
        toast.info("No jobs found for the selected filters.");
        return {};
      }

      if (response && response.statusCode === 200) {
        setJobsList(response.results);
        setMeta(response.meta);
      }
    } catch (error) {
      console.error("Error fetching jobs. Please try again later.", error);
      toast.error("Error fetching jobs. Please try again later.");
    }
  };

  // ================ Handle Functions ===============
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategorySelected(selectedCategory);
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setTimeSelected(selectedTime);
  };

  // page handler
  const onChangePage = (currentPage) => {
    if (currentPage === meta.currentPage) return;
    setPage(currentPage);
  };

  // size handler
  const sizeHandler = (e) => {
    const newSize = e.target.value;
    setSize(newSize);
  };

  const handleToggleModalUpdate = (jobId) => {
    setIsModalUpdate(!isModalUpdate);
    setJobIdSelect(jobId);
  };

  const handleActionClick = (jobId, type) => {
    setJobIdSelect(jobId);
    setActionType(type);
    const modalElement = document.getElementById("confirmModal");
    const modal = new Modal(modalElement);
    modal.show();
  };

  const handleConfirmLockOrUnlock = async () => {
    const isLock = actionType === "lock";
    const res = await updatePartitionalJobById(jobIdSelect, {
      status: !isLock ? true : false,
    });

    if (res && res.statusCode === 200) {
      toast.success(`${isLock ? "Lock" : "Unlock"} job success!`);

      setJobsList((prev) =>
        prev.map((item) =>
          item.id === jobIdSelect
            ? { ...item, status: !isLock ? true : false }
            : item
        )
      );

      const modalElement = document.getElementById("confirmModal");
      const modal = Modal.getInstance(modalElement);
      modal?.hide();
    } else {
      toast.error(`${isLock ? "Lock" : "Unlock"} job fail!`);
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
                                src={
                                  item?.logo
                                    ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${item?.logo}`
                                    : process.env
                                        .NEXT_PUBLIC_IMAGE_DEFAULT_LOGO_FOR_EMPLOYER
                                }
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
                      {formatDate(item?.job?.datePosted, "DD/MM/YYYY")} <br />
                      {formatDate(item?.job?.expireDate, "DD/MM/YYYY")}
                    </td>
                    <td className="status">
                      {item?.status ? "Active" : "Unactive"}
                    </td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Aplication">
                              <Link href={`/job-single-v3/${item.id}`}>
                                <span className="la la-eye"></span>
                              </Link>
                            </button>
                          </li>
                          <li>
                            <button
                              data-text="Update Job"
                              onClick={() => handleToggleModalUpdate(item.id)}
                            >
                              <span className="la la-pencil"></span>
                            </button>
                          </li>
                          {item.status ? (
                            <li>
                              <button
                                data-text="Khóa Job"
                                onClick={() =>
                                  handleActionClick(item.id, "lock")
                                }
                              >
                                <span className="la la-unlock"></span>
                              </button>
                            </li>
                          ) : (
                            <li>
                              <button
                                data-text="Mở Job"
                                onClick={() =>
                                  handleActionClick(item.id, "unlock")
                                }
                              >
                                <span className="la la-lock"></span>
                              </button>
                            </li>
                          )}
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

      {/* Modal Form Update */}
      {isModalUpdate && (
        <FormUpdateJob
          jobIdUpdate={jobIdSelect}
          fetchJobs={fetchJobsByCompanyIdForDashboard}
          onClose={handleToggleModalUpdate}
        />
      )}

      {/* Modal Bootstrap Lock or Unlock */}
      <div
        className="modal fade"
        id="confirmModal"
        tabIndex="-1"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmModalLabel">
                Xác nhận hành động
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {actionType === "lock"
                ? "Bạn có chắc chắn muốn KHÓA job này không?"
                : "Bạn có chắc chắn muốn MỞ job này không?"}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirmLockOrUnlock}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListingsTable;
