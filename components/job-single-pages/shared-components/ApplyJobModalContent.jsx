"use client";

import Link from "next/link";
import Resume from "../components/Resume";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  checkApplication,
  createApplication,
} from "@/services/application-featuer.service";
import { useEffect, useState } from "react";
import { Modal } from "bootstrap";

const ApplyJobModalContent = ({ jobId, isDisabled }) => {
  // ========================== State =============================/
  const { account } = useSelector((state) => state.auth);
  const [selectedCV, setSelectedCV] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (account && account.id && account.type === "candidate" && jobId) {
      fetchCheckApplication();
    }
  }, [account, jobId]);

  // ========================== Fetch Functions =============================/
  const fetchCheckApplication = async () => {
    try {
      const res = await checkApplication({ candidateId: account.id, jobId });
      if (res && res.success) {
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
      if (res && res.success) {
        toast.success("Nộp đơn xin việc thành công!");
        // Đóng modal sau khi nộp đơn thành công
        closeModal();
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

  const closeModal = () => {
    const modalElement = document.getElementById("applyJobModal");
    const modalInstance = Modal.getOrCreateInstance(modalElement);

    modalInstance.hide();

    // Đợi hiệu ứng ẩn kết thúc rồi xóa backdrop
    modalElement.addEventListener(
      "hidden.bs.modal",
      () => {
        modalInstance.dispose(); // Xóa hoàn toàn modal instance
        const backdrops = document.querySelectorAll(".modal-backdrop");
        backdrops.forEach((b) => b.remove());
        document.body.classList.remove("modal-open"); // đảm bảo body không bị khóa scroll
        document.body.style.removeProperty("padding-right");
      },
      { once: true }
    );
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

  if (account.type !== "candidate") {
    return (
      <div className="alert alert-danger" role="alert">
        Chỉ tài khoản ứng viên mới có thể nộp đơn xin việc. Vui lòng chuyển sang
        tài khoản ứng viên.
      </div>
    );
  }

  return (
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
          <label className="mb-2 fw-bold">Introduce about yourself:</label>
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
  );
};

export default ApplyJobModalContent;
