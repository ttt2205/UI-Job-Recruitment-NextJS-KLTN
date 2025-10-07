"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import homeAccountDropdown from "@/data/homeAccountDropdown";
import { isActiveLink } from "@/utils/linkActiveChecker";
import { usePathname } from "next/navigation";

const DefaulHeader2 = () => {
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
    console.log("account login: ", account);
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
            {/* <!-- Add Listing --> */}
            <Link href="/candidates-dashboard/my-resume" className="upload-cv">
              Upload your CV
            </Link>
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
                  width={50}
                  height={50}
                />
              </a>

              <ul className="dropdown-menu">
                {homeAccountDropdown.map((item) => (
                  <li
                    key={item.id}
                    className={`mb-1 ${
                      isActiveLink(item.routePath, usePathname())
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleClick(item)}
                  >
                    <Link href={item.routePath}>
                      <i className={`la ${item.icon}`}></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* End dropdown */}
          </div>
        ) : (
          <div className="outer-box">
            {/* <!-- Add Listing --> */}
            <Link href="/candidates-dashboard/cv-manager" className="upload-cv">
              Upload your CV
            </Link>
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

export default DefaulHeader2;
