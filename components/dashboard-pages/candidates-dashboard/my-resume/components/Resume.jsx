import { getResumesByCandidateId } from "@/services/resume-feature.service";
import {
  uploadCVCandidate,
  deleteCVCandidate,
} from "@/services/upload.service";
import React, { useEffect, useState } from "react";
import { FaFileAlt, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Resume() {
  // <!-------------------- State -------------------->
  const { account } = useSelector((state) => state.auth);
  const [cvFiles, setCvFiles] = useState([]);

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
  const handleUploadCV = async (file) => {
    if (!file) return;

    console.log("file chuan bi upload: ", file);

    const MAX_SIZE_MB = Number(process.env.NEXT_PUBLIC_CV_SIZE_LIMIT) || 5;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(
        `File CV vượt quá ${MAX_SIZE_MB}MB. Vui lòng chọn file nhỏ hơn.`
      );
      return;
    }

    // Kiểm tra định dạng hợp lệ
    const allowedTypes = process.env.NEXT_PUBLIC_ALLOWED_CV_TYPES;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Chỉ hỗ trợ định dạng: .pdf, .doc, .docx");
      return;
    }

    try {
      if (!account || !account.id) {
        throw new Error("Không tìm thấy tài khoản hợp lệ");
      }

      const res = await uploadCVCandidate(account.id, file);
      setCvFiles((prev) => [res.data, ...prev]);
      toast.success("Upload CV thành công!");

      // reset input để có thể upload tiếp
      document.getElementById("upload_cv").value = null;
    } catch (error) {
      console.error("Upload CV thất bại:", error);
      if (error && error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Upload CV thất bại!");
      }
    }
  };

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

      <div className="me-4 mt-3">
        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          id="upload_cv"
          className="d-none"
          onChange={(e) => handleUploadCV(e.target.files[0])}
        />
        <label
          htmlFor="upload_cv"
          className="btn btn-outline-primary btn-sm px-3 py-2"
        >
          Upload CV
        </label>
        <div className="text-muted small mt-2">
          Max file size 10MB. Format: .pdf, .doc, .docx, .jpg, .png
        </div>
      </div>
    </div>
  );
}

export default Resume;
