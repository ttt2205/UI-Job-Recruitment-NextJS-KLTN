"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import homeAccountDropdown from "@/data/homeAccountDropdown";
import { isActiveLink } from "@/utils/linkActiveChecker";
import { usePathname } from "next/navigation";
import { logout } from "@/features/auth/authSlice";

const DefaulHeader = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.auth);
  const [navbar, setNavbar] = useState(false);
  const [logo, setLogo] = useState("");

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    console.log("account login find job: ", account);
    if (account) {
      if (account.type === "company") {
        setLogo(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${account?.logo}`
        );
      } else {
        setLogo(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${account?.avatar}`
        );
      }
    }
  }, [account]);

  // ========================= Handle Functions ======================/
  const handleClick = async (item) => {
    if (item.key === "logout") {
      try {
        const res = await dispatch(logout()).unwrap(); // unwrap để nhận error nếu bị reject
        // Logout thành công → chuyển về trang login
        if (res && res.success) {
          navigate("/login");
        }
      } catch (error) {
        // Có lỗi → hiển thị thông báo
        toast.error(error || "Đăng xuất thất bại!");
      }
    }
  };

  // ========================= Render UI ======================/
  return (
    // <!-- Main Header-->
    <header
      className={`main-header  ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      {/* <!-- Main box --> */}
      <div className="main-box">
        {/* <!--Nav Outer --> */}
        <div className="nav-outer">
          <div className="logo-box">
            <div className="logo">
              <Link href="/">
                <Image
                  width={154}
                  height={50}
                  src="/images/logo.svg"
                  alt="brand"
                />
              </Link>
            </div>
          </div>
          {/* End .logo-box */}

          <HeaderNavContent />
          {/* <!-- Main Menu End--> */}
        </div>
        {/* End .nav-outer */}

        {account ? (
          <div className="outer-box">
            <button className="menu-btn">
              <span className="count">1</span>
              <span className="icon la la-heart-o text-black"></span>
            </button>
            {/* wishlisted menu */}

            <button className="menu-btn">
              <span className="icon la la-bell text-black"></span>
            </button>
            {/* End notification-icon */}

            {/* <!-- Dashboard Option --> */}
            <div className="dropdown dashboard-option">
              <a
                className="dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Image
                  alt="avatar"
                  className="thumb"
                  src={logo}
                  width={30}
                  height={30}
                />
              </a>

              <ul className="dropdown-menu">
                {homeAccountDropdown.map((item) => (
                  <li
                    className={`${
                      isActiveLink(item.routePath, usePathname())
                        ? "active"
                        : ""
                    } mb-1`}
                    key={item.id}
                  >
                    {item.routePath ? (
                      // 👉 Dùng Link khi có đường dẫn
                      <Link href={item.routePath}>
                        <i className={`la ${item.icon}`}></i> {item.name}
                      </Link>
                    ) : (
                      // 👉 Dùng button khi không có đường dẫn
                      <button
                        onClick={() => handleClick(item)}
                        className="flex items-center gap-2 w-full text-left btn-style-eight"
                      >
                        <i className={`la ${item.icon}`}></i> {item.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {/* End dropdown */}
          </div>
        ) : (
          <div className="outer-box">
            <div className="btn-box">
              <a
                href="#"
                className="theme-btn btn-style-three call-modal"
                data-bs-toggle="modal"
                data-bs-target="#loginPopupModal"
              >
                Login / Register
              </a>
              <Link
                href="/employers-dashboard/post-jobs"
                className="theme-btn btn-style-one"
              >
                Job Post
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DefaulHeader;
