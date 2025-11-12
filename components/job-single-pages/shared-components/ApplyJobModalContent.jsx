"use client";

import Link from "next/link";
import Resume from "../components/Resume";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  checkApplication,
  createApplication,
} from "@/services/application-featuer.service";
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";

const ApplyJobModalContent = ({ jobId, isDisabled }) => {
  // ========================== Ref =============================/
  const applyRef = useRef(null);
  const { show, hide } = useModal(applyRef);

  // ========================== State =============================/
  const { account } = useSelector((state) => state.auth);
  const [selectedCV, setSelectedCV] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (
      account &&
      account.id &&
      account.role === process.env.NEXT_PUBLIC_USER_ROLE_CANDIDATE &&
      jobId
    ) {
      fetchCheckApplication();
    }
  }, [account, jobId]);

  // ========================== Fetch Functions =============================/
  const fetchCheckApplication = async () => {
    try {
      const res = await checkApplication({ candidateId: account.id, jobId });
      if (res && res.statusCode === 200) {
        setIsApplied(res?.data?.hasApplied || false);
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra ứng tuyển:", error);
    }
  };

  // ========================== Handle Functions =============================/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Xử lý logic khi người dùng nhấn nút Apply Job
    try {
      const res = await createApplication({
        jobId,
        candidateId: account.id,
        coverLetter,
        resumeId: selectedCV?.id,
      });
      if (res && res.statusCode === 201) {
        toast.success("Nộp đơn xin việc thành công!");
        fetchCheckApplication();
        // Đóng modal sau khi nộp đơn thành công
        hide();
      } else {
        toast.error(
          `Lỗi khi nộp đơn xin việc: ${res?.message || "Vui lòng thử lại sau"}`
        );
      }
    } catch (error) {
      console.log("Lỗi khi nộp đơn xin việc:", error);
      toast.error(
        `Lỗi khi nộp đơn xin việc: ${
          error?.response?.data?.message || error?.message || "Có lỗi xảy ra"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOnchangeCoverLetter = (e) => {
    setCoverLetter(e.target.value);
  };

  // ========================== Render UI =============================/
  if (!account || !account.id) {
    return (
      <div className="alert alert-warning" role="alert">
        Vui lòng đăng nhập để nộp đơn xin việc.
        <Link href="/login" className="ms-2" onClick={() => closeModal()}>
          Đến trang đăng nhập
        </Link>
      </div>
    );
  }

  if (account.role !== process.env.NEXT_PUBLIC_USER_ROLE_CANDIDATE) {
    return (
      <div className="alert alert-danger" role="alert">
        Chỉ tài khoản ứng viên mới có thể nộp đơn xin việc. Vui lòng chuyển sang
        tài khoản ứng viên.
      </div>
    );
  }

  return (
    <div
      className="modal fade"
      id="applyJobModal"
      ref={applyRef}
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="apply-modal-content modal-content">
          <div className="text-center">
            <h3 className="title">Apply for this job</h3>
            <button
              type="button"
              className="closed-modal"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form
            className="default-form job-apply-form"
            style={{
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                <Resume selectedCV={selectedCV} setSelectedCV={setSelectedCV} />
              </div>
              {/* End .col */}

              <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                <label className="mb-2 fw-bold">
                  Introduce about yourself:
                </label>
                <textarea
                  className="darma"
                  name="coverLetter"
                  placeholder="Message"
                  value={coverLetter}
                  onChange={handleOnchangeCoverLetter}
                  required
                ></textarea>
              </div>
              {/* End .col */}

              <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                <div className="input-group checkboxes square">
                  <input type="checkbox" name="remember-me" id="rememberMe" />
                  <label htmlFor="rememberMe" className="remember">
                    <span className="custom-checkbox"></span> You accept our{" "}
                    <span data-bs-dismiss="modal">
                      <Link href="/terms">
                        Terms and Conditions and Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>
              </div>
              {/* End .col */}

              <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                <button
                  className="theme-btn btn-style-one w-100"
                  type="button"
                  name="submit-form"
                  onClick={handleSubmit}
                  disabled={isDisabled || loading}
                >
                  {!isApplied ? "Apply Job" : "Apply for this job again"}
                </button>
              </div>
              {/* End .col */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobModalContent;
