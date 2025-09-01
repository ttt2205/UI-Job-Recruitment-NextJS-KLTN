"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import employerMenuData from "../../data/employerMenuData";
import HeaderNavContent from "./HeaderNavContent";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { usePathname } from "next/navigation";
import { logout } from "@/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const DashboardHeader = () => {
  const [navbar, setNavbar] = useState(false);
  const [emailShow, setEmailShow] = useState("");
  const [logo, setLogo] = useState("");

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
    console.log("account login: ", account);
    if (account) {
      setEmailShow(account?.emailLogin);
      setLogo(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${account?.logo}`
      );
    }
  }, [account]);

  // ========================= Handle Functions ======================/
  const handleClick = (item) => {
    if (item.key === "logout") {
      dispatch(logout());
    }
  };

  // ========================= Render UI ======================/
  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-shaddow  ${navbar ? "fixed-header " : ""}`}
    >
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <Image
                    alt="brand"
                    src="/images/logo.svg"
                    width={154}
                    height={50}
                    priority
                  />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <HeaderNavContent />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <button className="menu-btn">
              <span className="count">1</span>
              <span className="icon la la-heart-o"></span>
            </button>
            {/* wishlisted menu */}

            <button className="menu-btn">
              <span className="icon la la-bell"></span>
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
                <span className="name text-black">
                  {emailShow || "My account"}
                </span>
              </a>

              <ul className="dropdown-menu">
                {employerMenuData.map((item) => (
                  <li
                    className={`${
                      isActiveLink(item.routePath, usePathname())
                        ? "active"
                        : ""
                    } mb-1`}
                    key={item.id}
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
          {/* End outer-box */}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
