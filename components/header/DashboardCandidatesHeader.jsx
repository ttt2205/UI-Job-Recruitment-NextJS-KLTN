"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import candidatesMenuData from "../../data/candidatesMenuData";
import HeaderNavContent from "./HeaderNavContent";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { toast } from "react-toastify";
import MenuItem from "./components/MenuItem";
const DashboardCandidatesHeader = () => {
  const [navbar, setNavbar] = useState(false);
  const [emailShow, setEmailShow] = useState("");
  const [logo, setLogo] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const { account } = useSelector((state) => state.auth);

  const changeBackground = () => {
    if (window.scrollY >= 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    console.log("account login: ", account);
    if (account) {
      setEmailShow(account?.emailLogin);
      setLogo(
        account?.avatar
          ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${account?.avatar}`
          : `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT_AVATAR_FOR_CANDIDATE}`
      );
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
                <span className="name">{account?.name || "My account"}</span>
              </a>

              <ul className="dropdown-menu">
                {candidatesMenuData.map((item) => (
                  <li
                    className={`${
                      isActiveLink(item.routePath, usePathname())
                        ? "active"
                        : ""
                    } mb-1`}
                    key={item.id}
                  >
                    <MenuItem item={item} handleClick={handleClick} />
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

export default DashboardCandidatesHeader;
