import ChatHamburger from "@/components/dashboard-pages/employers-dashboard/messages/components/ChatHamburger";
import React from "react";

export const NotConversation = () => {
  return (
    <div
      className="d-flex align-items-start justify-content-start"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        className="card text-center shadow p-4"
        style={{ maxWidth: "400px" }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ChatHamburger />
        </div>
        <div className="card-body">
          <svg
            className="bi bi-chat-dots mb-3"
            width="48"
            height="48"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <path d="M2 2c0-1 1-1 1-1h10c1 0 1 1 1 1v8c0 1-1 1-1 1H5l-3 3V2z" />
            <path d="M3 5a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
          </svg>
          <h5 className="card-title">Chọn một cuộc trò chuyện</h5>
          <p className="card-text text-muted">
            Bắt đầu trò chuyện với ứng viên của bạn
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotConversation;
