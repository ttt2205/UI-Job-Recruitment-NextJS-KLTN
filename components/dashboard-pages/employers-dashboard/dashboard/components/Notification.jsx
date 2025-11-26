"use client";

import { getJobNotificationsByUserIdThunk } from "@/features/notification/notificationSlice";
import { formatDate } from "@/utils/convert-function";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.auth);
  const { notifications, loading, error } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    if (account && account.id) {
      dispatch(getJobNotificationsByUserIdThunk(account.userId));
    }
  }, [dispatch, account]);

  // ============================= Handle Functions =============================

  // ============================= Render UI =============================
  return (
    <ul className="notification-list">
      {loading && <li>Loading notifications...</li>}
      {/* Loading... */}

      {error && <li>Error loading notifications...</li>}
      {/* Error Loading... */}

      {!loading && !error && notifications.length === 0 && (
        <li>No notifications available.</li>
      )}
      {/* No notifications available */}

      {!loading &&
        !error &&
        notifications.map((notification) => (
          <li
            key={notification?.id}
            className={
              notification?.type === "APPLICATION_STATUS" ? "success" : ""
            }
          >
            <span className="icon flaticon-briefcase"></span>
            {notification?.message || "The job application is error."}
            {" – "}
            <span className="colored">
              {formatDate(notification.createdAt, "YYYY-MM-DD")}
            </span>
          </li>
        ))}
      {/* End li */}
    </ul>
  );
};

export default Notification;
