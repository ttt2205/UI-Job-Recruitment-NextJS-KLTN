"use client";

import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import MyProfile from "./components/my-profile";
import SocialNetworkBox from "./components/SocialNetworkBox";
import ContactInfoBox from "./components/ContactInfoBox";
import CopyrightFooter from "../../CopyrightFooter";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCandidateByUserId } from "@/services/candidate-feature.service";

const index = () => {
  // ============================== State ===============================/
  const { loading, account } = useSelector((state) => state.auth);
  const [refreshCandidate, setRefreshCandidate] = useState(false);
  const [candidateInfo, setCandidateInfo] = useState({
    id: "",
    userId: "",
    email: "",
    name: "",
    birthday: "",
    skills: [],
    avatar: "",
    industry: "",
    designation: "",
    location: "",
    hourlyRate: "",
    description: "",
    experience: 0,
    currentSalary: "",
    expectSalary: "",
    phone: "",
    gender: "",
    language: [],
    educationLevel: "",
    socialMedias: [], // mảng các đối tượng SocilMedia
  });
  // ============================== Fetch Function ===============================/
  const fetchCandidateInfoByUserId = async (userId) => {
    try {
      const res = await getCandidateByUserId(userId);
      if (res && res.data) {
        const {
          id,
          userId,
          email,
          name,
          birthday,
          tags,
          avatar,
          industry,
          designation,
          location,
          hourlyRate,
          description,
          experience,
          currentSalary,
          expectSalary,
          phone,
          gender,
          language,
          qualification,
          socialMedias,
        } = res.data;
        console.log("candidateInfo data: ", res.data);

        setCandidateInfo({
          id: id || "",
          userId: userId || "",
          email: email || "",
          name: name || "",
          birthday: birthday || "",
          skills: tags || [],
          avatar: avatar || "",
          industry: industry || "",
          designation: designation || "",
          location: location || "",
          hourlyRate: hourlyRate || "",
          description: description || "",
          experience: experience || 0,
          currentSalary: currentSalary || "",
          expectSalary: expectSalary || "",
          phone: phone || "",
          gender: gender || "",
          language: Array.isArray(language) ? language : [],
          educationLevel: qualification || "",
          socialMedias: Array.isArray(socialMedias) ? socialMedias : [],
        });
        setRefreshCandidate((prev) => !prev);
      }
    } catch (error) {
      console.log("error fetchCandidateInfoByUserId: ", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (!loading && account && candidateInfo.id === "") {
      console.log("account info: ", account);
      const userId = account.userId;
      fetchCandidateInfoByUserId(userId);
    }
  }, [loading]);

  // ============================== Render UI ===============================/
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardCandidatesSidebar />
      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="My Profile!" />
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
                    candidateInfo={candidateInfo}
                    fetchCadidateInfo={fetchCandidateInfoByUserId}
                  />
                </div>
              </div>
              {/* <!-- Ls widget --> */}

              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Social Network</h4>
                  </div>
                  {/* End widget-title */}

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
                  {/* End widget-title */}
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
