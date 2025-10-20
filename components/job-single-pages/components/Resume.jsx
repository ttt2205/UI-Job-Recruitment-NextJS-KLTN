import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SelectCV from "./SelectCV";
import {
  deleteCVCandidate,
  getResumesByCandidateId,
  uploadCVCandidate,
} from "@/features/upload/uploadCVSlice";

function Resume({ selectedCV, setSelectedCV }) {
  // <!-------------------- State -------------------->
  const { account } = useSelector((state) => state.auth);
  const { cvFiles: cvFileAPI, loading } = useSelector((state) => state.upload);
  const dispatch = useDispatch();
  const [cvFiles, setCvFiles] = useState(cvFileAPI || []);

  useEffect(() => {
    if (account?.id && cvFileAPI.length === 0) {
      fetchResumesByCandidateId();
    }
  }, [account?.id]);

  useEffect(() => {
    setCvFiles(cvFileAPI || []);
  }, [cvFileAPI]);

  // <!-------------------- Fetch Functions -------------------->
  const fetchResumesByCandidateId = async () => {
    try {
      if (!account || !account.id) {
        throw new Error(
          "Không thể tải hồ sơ xin việc vì không tìm thấy ứng viên hợp lệ"
        );
      }

      await dispatch(getResumesByCandidateId(account.id)).unwrap();
    } catch (error) {
      console.error("Lỗi khi tải hồ sơ xin việc:", error);
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

      await dispatch(
        uploadCVCandidate({ candidateId: account.id, file })
      ).unwrap();
      toast.success("Upload CV thành công!");

      // reset input
      document.getElementById("upload_cv_for_apply_job").value = null;
    } catch (error) {
      // vì unwrap() trả ra chuỗi rejectWithValue, nên chỉ cần toast.error(error)
      toast.error(error?.message || error || "Upload CV thất bại!");
    }
  };

  const handleDeleteCV = async (file) => {
    try {
      if (!account || !account.id) {
        throw new Error("Không tìm thấy tài khoản hợp lệ");
      }

      await dispatch(deleteCVCandidate({ file: file })).unwrap();
      toast.success("Delete CV thành công!");
    } catch (error) {
      // vì unwrap() trả ra chuỗi rejectWithValue, nên chỉ cần toast.error(error)
      toast.error(error?.message || error || "Delete CV thất bại!");
    }
  };

  // <!-------------------- Render UI -------------------->
  return (
    <div className="d-flex flex-column align-items-start border-bottom pb-3">
      <div className="cv-gallery">
        <label className="mb-2 fw-bold">Your Uploaded CVs:</label>
        <SelectCV
          cvFiles={cvFiles}
          handleDeleteCV={handleDeleteCV}
          selectedCV={selectedCV}
          setSelectedCV={setSelectedCV}
        />
      </div>

      <div className="me-4 mt-3">
        <label className="mb-2 fw-bold w-100">Upload New CVs:</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          id="upload_cv_for_apply_job"
          className="d-none"
          onChange={(e) => handleUploadCV(e.target.files[0])}
        />
        <label
          htmlFor="upload_cv_for_apply_job"
          className="btn btn-outline-primary btn-sm px-3 py-2"
        >
          Upload CV
        </label>
        <div className="text-muted small mt-2">
          {`Max file size ${process.env.NEXT_PUBLIC_CV_SIZE_LIMIT}MB. Format: .pdf, .doc, .docx`}
        </div>
      </div>
    </div>
  );
}

export default Resume;
