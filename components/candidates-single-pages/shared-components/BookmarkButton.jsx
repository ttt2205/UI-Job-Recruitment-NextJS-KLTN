"use client";

import { useEffect, useState } from "react";
import {
  checkPotentialCandidate,
  togglePotentialCandidate,
} from "@/services/company-feature.service";
import { useSelector } from "react-redux";

function BookmarkButton({ employerId, candidateId }) {
  const { account } = useSelector((slice) => slice.auth);
  const [isPotential, setIsPotential] = useState(false);
  const [loading, setLoading] = useState(false);

  // Khi component mount → kiểm tra trạng thái hiện tại
  useEffect(() => {
    if (!employerId || !candidateId) return;

    const fetchStatus = async () => {
      try {
        const res = await checkPotentialCandidate(employerId, candidateId);
        const status = res.data;
        setIsPotential(status);
      } catch (err) {
        console.error("Error checking potential candidate:", err);
      }
    };

    fetchStatus();
  }, [employerId, candidateId]);

  // Handle toggle khi click
  const handleToggle = async () => {
    if (loading) return; // tránh click liên tục
    setLoading(true);

    try {
      const res = await togglePotentialCandidate(employerId, candidateId);
      const added = res.data;
      console.log("toggle bookmark: ", res);
      setIsPotential(added); // cập nhật UI ngay
    } catch (err) {
      console.error("Error toggling potential candidate:", err);
    } finally {
      setLoading(false);
    }
  };

  // Chỉ hiện nút nếu user là Employer
  if (
    account?.role?.trim().toUpperCase() !==
    process.env.NEXT_PUBLIC_USER_ROLE_EMPLOYER?.toUpperCase()
  ) {
    return null;
  }

  return (
    <button
      className={`bookmark-btn`}
      onClick={handleToggle}
      disabled={loading}
      title={isPotential ? "Remove from potential" : "Add to potential"}
    >
      {isPotential ? (
        // Khi đã bookmarked → hiển thị hình ảnh
        <img
          src="/assets/bookmark_filled.png"
          alt="bookmark_filled"
          style={{ width: "18px", height: "18px" }}
        />
      ) : (
        // Khi chưa bookmarked → hiển thị icon font
        <i className="flaticon-bookmark"></i>
      )}
    </button>
  );
}

export default BookmarkButton;
