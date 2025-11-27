"use client"; // client component vì dùng state hoặc effect
import React from "react";

// app/loading.jsx
export default function Loading() {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div className="text-center">
        {/* Bootstrap spinner */}
        <div
          className="spinner-border text-success"
          role="status"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-white fs-5">Đang tải...</p>
      </div>
    </div>
  );
}
