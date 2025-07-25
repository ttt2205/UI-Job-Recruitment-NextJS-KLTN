"use client";

import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import MyProfile from "./components/my-profile";
import SocialNetworkBox from "./components/SocialNetworkBox";
import ContactInfoBox from "./components/ContactInfoBox";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCompanyByUserId } from "@/services/company-feature.service";
import { toast } from "react-toastify";

const index = () => {
  // ============================== State ===============================/
  const { loading, account } = useSelector((state) => state.auth);
  const [refreshCompany, setRefreshCompany] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    id: "",
    userId: "",
    email: "",
    name: "",
    primaryIndustry: "",
    size: "",
    foundedIn: undefined, // số (number) - có thể để null hoặc undefined
    description: "",
    phone: "",
    address: "",
    logo: "",
    socialMedias: [], // mảng các đối tượng SocilMedia
  });
  // ============================== Fetch Function ===============================/
  const fetchCompanyInfoByUserId = async (userId) => {
    try {
      const res = await getCompanyByUserId(userId);
      if (res && res.data) {
        const {
          id,
          userId,
          email,
          name,
          primaryIndustry,
          size,
          foundedIn,
          description,
          phone,
          address,
          logo,
          socialMedias,
        } = res.data;
        console.log("companyInfo data: ", res.data);

        setCompanyInfo({
          id: id || "",
          userId: userId || "",
          email: email || "",
          name: name || "",
          primaryIndustry: primaryIndustry || "",
          size: size || "",
          foundedIn: foundedIn ?? undefined,
          description: description || "",
          phone: phone || "",
          address: address || "",
          logo: logo || "",
          socialMedias: Array.isArray(socialMedias) ? socialMedias : [],
        });
        setRefreshCompany((prev) => !prev);
      }
    } catch (error) {
      console.log("error fetchCompanyInfo: ", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ============================== Handle Function ===============================/
  useEffect(() => {
    if (!loading && account && companyInfo.id === "") {
      console.log("account info: ", account);
      const userId = account.userId;
      fetchCompanyInfoByUserId(userId);
    }
  }, [loading, refreshCompany]);

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Company Profile!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>My Profile</h4>
                  </div>
                  <MyProfile
                    companyInfo={companyInfo}
                    fetchCompanyInfoByUserId={fetchCompanyInfoByUserId}
                  />
                </div>
              </div>
              {/* <!-- Ls widget --> */}

              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Social Network</h4>
                  </div>
                  {/* End .widget-title */}
                  <div className="widget-content">
                    <SocialNetworkBox />
                  </div>
                </div>
              </div>
              {/* <!-- Ls widget --> */}

              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Contact Information</h4>
                  </div>
                  {/* End .widget-title */}

                  <div className="widget-content">
                    <ContactInfoBox />
                  </div>
                </div>
              </div>
              {/* <!-- Ls widget --> */}
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;
