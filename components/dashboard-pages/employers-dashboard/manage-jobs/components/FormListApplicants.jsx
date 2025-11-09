import React, { useEffect, useState } from "react";

// Giả lập data ứng viên
const mockApplicants = [
  { id: 1, name: "Nguyễn Văn A", email: "a@example.com", status: "Pending" },
  { id: 2, name: "Trần Thị B", email: "b@example.com", status: "Pending" },
  { id: 3, name: "Lê Văn C", email: "c@example.com", status: "Accepted" },
];

const FormListApplicants = ({ jobIdSelected, onClose }) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch danh sách ứng viên khi modal mở
  useEffect(() => {
    // TODO: Thay mock data bằng API call thật
    setLoading(true);
    setTimeout(() => {
      setApplicants(mockApplicants);
      setLoading(false);
    }, 500);
  }, [jobIdSelected]);

  const handleChangeStatus = (id, newStatus) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );

    // TODO: Gọi API backend để cập nhật trạng thái
    console.log(`Update applicant ${id} status to ${newStatus}`);
  };

  return (
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
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant) => (
                  <tr key={applicant.id}>
                    <td>{applicant.name}</td>
                    <td>{applicant.email}</td>
                    <td>{applicant.status}</td>
                    <td>
                      {applicant.status !== "Accepted" && (
                        <button
                          className="btn btn-success btn-sm mx-1"
                          onClick={() =>
                            handleChangeStatus(applicant.id, "Accepted")
                          }
                        >
                          Accept
                        </button>
                      )}
                      {applicant.status !== "Rejected" && (
                        <button
                          className="btn btn-danger btn-sm mx-1"
                          onClick={() =>
                            handleChangeStatus(applicant.id, "Rejected")
                          }
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="my-modal-footer">
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormListApplicants;
