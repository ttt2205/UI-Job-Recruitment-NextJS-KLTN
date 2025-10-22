"use client";

import { useState } from "react";
import Resume from "./Resume";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { uploadCVCandidate } from "@/services/upload.service";

const CvUploader = () => {
  const [getError, setError] = useState("");
  const [cvFiles, setCvFiles] = useState([]);

  const { account } = useSelector((state) => state.auth);

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

  // <!-------------------- Render UI -------------------->
  return (
    <>
      {/* Start Upload resule */}
      <div className="uploading-resume">
        <div className="uploadButton">
          <input
            className="uploadButton-input"
            type="file"
            name="attachments[]"
            accept=".doc,.docx,.xml,application/msword,application/pdf, image/*"
            id="upload_cv"
            multiple
            onChange={(e) => handleUploadCV(e.target.files[0])}
          />
          <label className="cv-uploadButton" htmlFor="upload_cv">
            <span className="title">Drop files here to upload</span>
            <span className="text">
              To upload file size is (Max 5Mb) and allowed file types are (.doc,
              .docx, .pdf)
            </span>
            <span className="text">You can upload up to 10 CVs</span>
            <span className="theme-btn btn-style-one">Upload Resume</span>
            {getError !== "" ? (
              <p className="ui-danger mb-0">{getError}</p>
            ) : undefined}
          </label>
          <span className="uploadButton-file-name"></span>
        </div>
      </div>
      {/* End upload-resume */}

      {/* Start resume Preview  */}
      <Resume cvFiles={cvFiles} setCvFiles={setCvFiles} />
      {/* End resume Preview  */}
    </>
  );
};

export default CvUploader;
