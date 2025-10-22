import { getResumesByCandidateId } from "@/services/resume-feature.service";
import {
  uploadCVCandidate,
  deleteCVCandidate,
} from "@/services/upload.service";
import React, { useEffect, useState } from "react";
import { FaFileAlt, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Resume({ cvFiles, setCvFiles }) {
  // <!-------------------- State -------------------->
  const { account } = useSelector((state) => state.auth);

  useEffect(() => {
    if (account && account.id) {
      fetchResumesByCandidateId();
    }
  }, [account]);

  // <!-------------------- Fetch Functions -------------------->
  const fetchResumesByCandidateId = async () => {
    try {
      if (!account || !account.id) {
        throw new Error(
          "Không thể tải hồ sơ xin việc vì không tìm thấy ứng viên hợp lệ"
        );
      }

      const res = await getResumesByCandidateId(account.id);
      setCvFiles(res?.results || []);
      console.log("Danh sách hồ sơ:", res.results);
    } catch (error) {
      toast.error("Lỗi server không xác định");
      console.error("Server error:", error.response.data);
    }
  };
  // <!-------------------- Handle Functions -------------------->
  const handleDeleteCV = async (file) => {
    try {
      if (!account || !account.id) {
        throw new Error("Không tìm thấy tài khoản hợp lệ");
      }

      const res = await deleteCVCandidate(file.id, file.fileName);
      if (res && res.success) {
        toast.success("Xóa hồ sơ ứng viên thành công!");
        setCvFiles((prev) =>
          prev.filter((item) => item.fileName != file.fileName)
        );
      } else {
        toast.error("Xóa hồ sơ ứng viên thất bại!");
      }
    } catch (error) {
      console.error("Có lỗi khi xóa hồ sơ ứng viên:", error);
      toast.error("Xóa hồ sơ ứng viên thất bại!");
    }
  };

  // <!-------------------- Render UI -------------------->
  return (
    <div className="d-flex flex-column align-items-start mb-4 border-bottom pb-3">
      <div className="mb-3">
        <h5>Your CVs</h5>
      </div>
      <div className="cv-gallery">
        {cvFiles && cvFiles.length > 0 ? (
          cvFiles.map((file, index) => (
            <div key={index} className="cv-item">
              <a
                href={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_FILE_RESUME}/${file.fileName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cv-link flex-grow-1"
              >
                <FaFileAlt className="cv-icon" />
                {file.fileName}
              </a>
              <button
                className="btn btn-sm rounded-circle p-2"
                onClick={() => handleDeleteCV(file)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <div className="text-muted small">Chưa có CV nào được upload</div>
        )}
      </div>
    </div>
  );
}

export default Resume;
