"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "../header/HeaderNavContent";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import homeAccountDropdown from "@/data/homeAccountDropdown";
import { isActiveLink } from "@/utils/linkActiveChecker";
import { usePathname } from "next/navigation";
import { logout } from "@/features/auth/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
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
      if (account.role === process.env.NEXT_PUBLIC_USER_ROLE_EMPLOYER) {
        setLogo(
          account?.imageUrl
            ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${account?.imageUrl}`
            : `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT_LOGO_FOR_EMPLOYER}`
        );
      } else {
        setLogo(
          account?.imageUrl
            ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${account?.imageUrl}`
            : `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT_AVATAR_FOR_CANDIDATE}`
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
    // <!-- Main Header-->
    <header
      className={`main-header header-style-four  ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
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
                    width={154}
                    height={50}
                    src="/images/logo-2.svg"
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
                <span className="icon la la-heart-o text-white"></span>
              </button>
              {/* wishlisted menu */}

              <button className="menu-btn">
                <span className="icon la la-bell text-white"></span>
              </button>
              {/* End notification-icon */}

              {/* Home Account Option */}
              <div className="home-account-option dropdown">
                <a
                  className="dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="avatar">
                    <Image
                      alt="avatar"
                      src={logo}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
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
                      <Link href={item?.routePath || "/login"}>
                        <i className={`la ${item.icon}`}></i> {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* End Home Account Option */}
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
      </div>
    </header>
  );
};

export default Header;
