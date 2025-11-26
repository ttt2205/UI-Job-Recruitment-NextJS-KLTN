"use client";

import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  getApplicantsAppliedByJobId,
  updateStatusOfApplicantByJobIdAndApplicationId,
} from "@/services/application-feature.service";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { statusApplication } from "@/data/application";
import FormShowDetailApplication from "./FormShowDetailApplication";

const FormListApplicants = ({ jobIdSelected, jobTitle, onClose }) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalShowDetailApp, setIsModalShowDetailApp] = useState(false);
  const [appSelected, setAppSelected] = useState(null);

  // ======================== UseEffect ============================
  useEffect(() => {
    if (jobIdSelected) {
      fetchApplicantByJobId();
    }
  }, [jobIdSelected]);

  // ======================== Fetch Functions ============================
  const fetchApplicantByJobId = async () => {
    try {
      setLoading(true);
      const res = await getApplicantsAppliedByJobId(jobIdSelected);
      if (res && res.statusCode === 200) {
        setApplicants(res?.results ?? []);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetchApplicantByJobId: ", error);
      toast.error(error?.response?.data?.message || "Fail to load applicants");
      setLoading(false);
    }
  };

  // ======================== Handle Functions ============================
  const handleChangeStatus = async (applicationId, newStatus) => {
    // Nếu newStatus là REVIEWED và ứng viên đã ở trạng thái cuối cùng thì bỏ qua
    const targetApp = applicants.find((a) => a.id === applicationId);
    if (!targetApp) return;

    if (
      targetApp.status === statusApplication.ACCEPTED ||
      targetApp.status === statusApplication.REJECTED
    ) {
      return;
    }

    try {
      // Gọi API backend để cập nhật trạng thái
      const res = await updateStatusOfApplicantByJobIdAndApplicationId(
        applicationId,
        newStatus
      );
      if (res && res.statusCode === 200) {
        setApplicants((prev) =>
          prev.map((app) => {
            if (app.id !== applicationId) return app; // chỉ cập nhật đúng applicant

            // Nếu đã ACCEPTED hoặc REJECTED thì không cập nhật UI, không gọi API
            if (
              app.status === statusApplication.ACCEPTED ||
              app.status === statusApplication.REJECTED
            ) {
              return app;
            }

            // Cho phép cập nhật sang REVIEWED, ACCEPTED hoặc REJECTED
            return { ...app, status: newStatus };
          })
        );
        toast.success(res.message);
      }
      console.log("Response status updated:", res);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error(
        error?.response?.data?.message || "Fail to update application's status"
      );
    }
  };

  const handCloseModalShowDetail = () => {
    setIsModalShowDetailApp(false);
    setAppSelected(null);
  };

  // ======================== Format Data ============================
  const counts = {
    total: applicants.length,
    pending: applicants.filter((a) => a.status === statusApplication.PENDING)
      .length,
    reviewed: applicants.filter((a) => a.status === statusApplication.REVIEWED)
      .length,
    accepted: applicants.filter((a) => a.status === statusApplication.ACCEPTED)
      .length,
    rejected: applicants.filter((a) => a.status === statusApplication.REJECTED)
      .length,
  };

  const filteredApplicants = {
    total: applicants,
    pending: applicants.filter((a) => a.status === statusApplication.PENDING),
    reviewed: applicants.filter((a) => a.status === statusApplication.REVIEWED),
    accepted: applicants.filter((a) => a.status === statusApplication.ACCEPTED),
    rejected: applicants.filter((a) => a.status === statusApplication.REJECTED),
  };

  // ======================== Render UI ============================
  const renderApplicant = (app) => (
    <div
      className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
      key={app.id}
    >
      <div className="inner-box">
        <div className="content">
          <figure className="image">
            <Image
              width={90}
              height={90}
              src={
                app.candidate.avatar
                  ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${app.candidate.avatar}`
                  : process.env.NEXT_PUBLIC_IMAGE_DEFAULT_AVATAR_FOR_CANDIDATE
              }
              alt={app.candidate.name || "Chưa cập nhật"}
              style={{
                width: "90px",
                height: "90px",
                objectFit: "cover",
                borderRadius: "50%", // nếu muốn ảnh tròn
              }}
            />
          </figure>
          <h4 className="name">
            <Link href={`/candidates-single-v3/${app.candidate.id}`}>
              {app.candidate.name || "Chưa cập nhật"}
            </Link>
          </h4>
          <ul className="candidate-info">
            <li className="designation">
              {app.candidate.designation || "Chưa cập nhật"}
            </li>
            <li>
              <span className="icon flaticon-map-locator"></span>{" "}
              {app.candidate.location || "Chưa cập nhật"}
            </li>
            <li>
              <span className="icon flaticon-money"></span> $
              {app?.candidate?.currentSalary || 0} -{" "}
              {app?.candidate?.expectedSalary || "Thương lượng"}{" "}
              {app?.candidate?.currency || ""}
            </li>
          </ul>
          {app.candidate.skills?.length > 0 && (
            <ul className="post-tags">
              {app.candidate.skills.map((skill, i) => (
                <li key={i}>
                  <a href="#">{skill}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="option-box">
          <ul className="option-list">
            {/* Always show View button */}
            <li>
              <button
                data-text="View Application"
                onClick={() => {
                  handleChangeStatus(app.id, statusApplication.REVIEWED);
                  setIsModalShowDetailApp(true);
                  setAppSelected(app);
                }}
              >
                <span className="la la-eye"></span>
              </button>
            </li>

            {/* Nếu trạng thái KHÔNG phải final → hiển thị đầy đủ */}
            {(app.status === statusApplication.PENDING ||
              app.status === statusApplication.REVIEWED) && (
              <>
                <li>
                  <button
                    data-text="Approve Application"
                    onClick={() =>
                      handleChangeStatus(app.id, statusApplication.ACCEPTED)
                    }
                  >
                    <span className="la la-check"></span>
                  </button>
                </li>

                <li>
                  <button
                    data-text="Reject Application"
                    onClick={() =>
                      handleChangeStatus(app.id, statusApplication.REJECTED)
                    }
                  >
                    <span className="la la-times-circle"></span>
                  </button>
                </li>

                <li>
                  <button data-text="Delete Application">
                    <span className="la la-trash"></span>
                  </button>
                </li>
              </>
            )}

            {/* Nếu trạng thái là final → chỉ hiển thị trạng thái */}
            {(app.status === statusApplication.ACCEPTED ||
              app.status === statusApplication.REJECTED) && (
              <li>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    color: "white",
                    backgroundColor:
                      app.status.toUpperCase() === "ACCEPTED"
                        ? "#28a745"
                        : "#dc3545",
                    fontWeight: "500",
                    fontSize: "0.875rem",
                  }}
                >
                  {app.status.toUpperCase() === "ACCEPTED"
                    ? "Approved"
                    : "Rejected"}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="my-modal">
        <div className="my-modal-inner">
          <div className="my-modal-header">
            <h3>
              <strong>Applicants</strong>
            </h3>
          </div>

          <div className="my-modal-content">
            {loading ? (
              <p>Loading applicants...</p>
            ) : applicants.length === 0 ? (
              <p>No applicants for this job.</p>
            ) : (
              <div className="widget-content">
                <div className="tabs-box">
                  <Tabs>
                    <div className="aplicants-upper-bar">
                      <div className="applicants-title">
                        <h6>{jobTitle}</h6>
                      </div>

                      <TabList className="aplicantion-status tab-buttons clearfix">
                        <Tab className="tab-btn totals">
                          Total(s): {counts.total}
                        </Tab>
                        <Tab className="tab-btn pending">
                          Pending(s): {counts.pending}
                        </Tab>
                        <Tab className="tab-btn reviewed">
                          Reviewed(s): {counts.reviewed}
                        </Tab>
                        <Tab className="tab-btn approved">
                          Approved(s): {counts.accepted}
                        </Tab>
                        <Tab className="tab-btn rejected">
                          Rejected(s): {counts.rejected}
                        </Tab>
                      </TabList>
                    </div>

                    <div className="tabs-content">
                      <TabPanel>
                        <div className="row">
                          {filteredApplicants.total.map(renderApplicant)}
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div className="row">
                          {filteredApplicants.pending.map(renderApplicant)}
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div className="row">
                          {filteredApplicants.reviewed.map(renderApplicant)}
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div className="row">
                          {filteredApplicants.accepted.map(renderApplicant)}
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div className="row">
                          {filteredApplicants.rejected.map(renderApplicant)}
                        </div>
                      </TabPanel>
                    </div>
                  </Tabs>
                </div>
              </div>
            )}
          </div>

          <div className="my-modal-footer">
            <button onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/*<! ------------------ Modal Show Detail -------------------------> */}
      {isModalShowDetailApp && appSelected && (
        <FormShowDetailApplication
          applicationSelected={appSelected}
          onClose={handCloseModalShowDetail}
        />
      )}
    </>
  );
};

export default FormListApplicants;
