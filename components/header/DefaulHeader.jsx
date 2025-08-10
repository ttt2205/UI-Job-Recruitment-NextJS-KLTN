"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import homeAccountDropdown from "@/data/homeAccountDropdown";
import { isActiveLink } from "@/utils/linkActiveChecker";
import { usePathname } from "next/navigation";

const DefaulHeader = () => {
  const [navbar, setNavbar] = useState(false);
  const [emailShow, setEmailShow] = useState("");

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.auth);

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    setEmailShow(account?.emailLogin);
  }, [account]);

  // ========================= Handle Functions ======================/
  const handleClick = (item) => {
    if (item.key === "logout") {
      dispatch(logout());
      window.location.reload();
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
                  src="/images/resource/company-6.png"
                  width={50}
                  height={50}
                />
                <span className="name text-black">
                  {emailShow || "My account"}
                </span>
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
                        <a onClick={item.action}>
                          <i className={`la ${item.icon}`}></i> {item.name}
                        </a>
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
                className="theme-btn btn-style-six call-modal"
                data-bs-toggle="modal"
                data-bs-target="#loginPopupModal"
              >
                Login / Register
              </a>
              <Link
                href="/employers-dashboard/post-jobs"
                className="theme-btn btn-style-five"
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
