import { useEffect, useState } from "react";
import { FaTrash, FaFileAlt, FaCheckCircle, FaRegCircle } from "react-icons/fa";

export default function CVSelect({
  cvFiles,
  handleDeleteCV,
  selectedCV,
  setSelectedCV,
}) {
  // Gán CV mặc định là phần tử đầu tiên
  useEffect(() => {
    if (cvFiles && cvFiles.length > 0) {
      setSelectedCV(cvFiles[0]);
    }
  }, [cvFiles]);

  if (!cvFiles || cvFiles.length === 0) {
    return (
      <div className="text-muted small fst-italic">
        Chưa có CV nào được upload
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-start border-bottom pb-3">
      <div className="cv-gallery w-100">
        {cvFiles && cvFiles.length > 0 ? (
          cvFiles.map((file, index) => (
            <div
              key={index}
              className={`cv-item d-flex align-items-center justify-content-between py-2 px-2 rounded ${
                selectedCV?.fileName === file.fileName
                  ? "bg-light border border-primary"
                  : ""
              }`}
            >
              {/* Cột trái: icon chọn + link CV */}
              <div className="d-flex align-items-center flex-grow-1">
                <button
                  className="btn btn-link p-0 me-2 text-decoration-none text-dark"
                  onClick={() => setSelectedCV(file)}
                  title="Chọn CV này"
                  type="button"
                >
                  {selectedCV?.fileName === file.fileName ? (
                    <FaCheckCircle className="text-primary" />
                  ) : (
                    <FaRegCircle className="text-secondary" />
                  )}
                </button>

                <a
                  href={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_FILE_RESUME}/${file.fileName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv-link text-decoration-none text-dark d-flex align-items-center"
                >
                  <FaFileAlt className="text-secondary me-2" />
                  <span className="text-truncate">{file.fileName}</span>
                </a>
              </div>

              {/* Nút xóa */}
              <button
                className="btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center ms-2"
                style={{ width: "32px", height: "32px" }}
                type="button"
                onClick={(e) => {
                  /**
                   * bỏ focus trước khi xóa để tránh nút vẫn giữ trạng thái focus
                   * và nhảy vào phần tử tiếp theo
                   */
                  e.currentTarget.blur();
                  handleDeleteCV(file);
                }}
                title="Xóa CV"
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
