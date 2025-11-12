import React, { useEffect, useState } from "react";

export const FormShowDetailApplication = ({ applicationSelected, onClose }) => {
  const [application, setApplication] = useState(null);

  useEffect(() => {
    if (!applicationSelected) return;

    const data = {
      id: applicationSelected.id,
      candidateName: applicationSelected?.candidate?.name || "Chưa cập nhật",
      cvUrl: `${process.env.NEXT_PUBLIC_API_BACKEND_URL_FILE_APPLICATION}/${applicationSelected.filename}`,
      coverLetterUrl: applicationSelected.coverLetter || "",
    };
    setApplication(data);
  }, [applicationSelected]);

  return (
    <div className="my-modal">
      <div className="my-modal-inner">
        {/* HEADER */}
        <div className="my-modal-header">
          <h3>
            <strong>Applicants</strong>
          </h3>
        </div>

        {/* CONTENT */}
        <div className="my-modal-content">
          <div style={{ padding: "20px", minHeight: "200px" }}>
            {!application ? (
              <p style={{ textAlign: "center", color: "#666" }}>
                Đang tải thông tin...
              </p>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <p style={{ fontSize: "15px", margin: 0 }}>
                  <strong>Ứng viên:</strong> {application.candidateName}
                </p>

                {/* CV */}
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "12px 14px",
                  }}
                >
                  <p
                    style={{
                      marginBottom: "6px",
                      fontWeight: "500",
                      fontSize: "15px",
                    }}
                  >
                    📄 CV Ứng viên
                  </p>
                  {application.cvUrl ? (
                    <a
                      href={application.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#2563eb",
                        textDecoration: "none",
                        fontSize: "14px",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.textDecoration = "underline")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.textDecoration = "none")
                      }
                    >
                      Xem CV
                    </a>
                  ) : (
                    <p
                      style={{
                        color: "#888",
                        fontStyle: "italic",
                        fontSize: 14,
                      }}
                    >
                      Chưa có CV
                    </p>
                  )}
                </div>

                {/* Cover Letter */}
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "12px 14px",
                  }}
                >
                  <p
                    style={{
                      marginBottom: "6px",
                      fontWeight: "500",
                      fontSize: "15px",
                    }}
                  >
                    📝 Cover Letter
                  </p>
                  {application.coverLetterUrl ? (
                    <a
                      href={application.coverLetterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#2563eb",
                        textDecoration: "none",
                        fontSize: "14px",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.textDecoration = "underline")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.textDecoration = "none")
                      }
                    >
                      Xem Cover Letter
                    </a>
                  ) : (
                    <p
                      style={{
                        color: "#888",
                        fontStyle: "italic",
                        fontSize: 14,
                      }}
                    >
                      Chưa có Cover Letter
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="my-modal-footer">
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormShowDetailApplication;
