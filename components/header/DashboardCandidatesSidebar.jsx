"use client";

import Link from "next/link";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import candidatesuData from "../../data/candidatesMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/features/auth/authSlice";
import MenuItem from "./components/MenuItem";

const DashboardCandidatesSidebar = () => {
  const { menu } = useSelector((state) => state.toggle);
  const percentage = 30;

  const router = useRouter();
  const dispatch = useDispatch();

  // menu togggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  // ========================= Handle Functions ======================/
  const handleClick = async (item) => {
    if (item.key === "logout") {
      try {
        const res = await dispatch(logout()).unwrap(); // unwrap để nhận error nếu bị reject
        // Logout thành công → chuyển về trang login
        if (res && res.success) {
          router.push("/login");
        }
      } catch (error) {
        // Có lỗi → hiển thị thông báo
        toast.error(error || "Đăng xuất thất bại!");
      }
    }
  };

  // ========================= Render UI ======================/
  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}

      <div className="sidebar-inner">
        <ul className="navigation">
          {candidatesuData.map((item) => (
            <li
              className={`${
                isActiveLink(item.routePath, usePathname()) ? "active" : ""
              } mb-1`}
              key={item.id}
              onClick={menuToggleHandler}
            >
              <MenuItem item={item} handleClick={handleClick} />
            </li>
          ))}
        </ul>
        {/* End navigation */}

        <div className="skills-percentage">
          <h4>Skills Percentage</h4>
          <p>
            `Put value for <strong>Cover Image</strong> field to increase your
            skill up to <strong>85%</strong>`
          </p>
          <div style={{ width: 200, height: 200, margin: "auto" }}>
            <CircularProgressbar
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#7367F0",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent",
              })}
              value={percentage}
              text={`${percentage}%`}
            />
          </div>{" "}
          {/* <!-- Pie Graph --> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardCandidatesSidebar;
