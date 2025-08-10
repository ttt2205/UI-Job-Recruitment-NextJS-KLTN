"use client";

import dynamic from "next/dynamic";
import employersInfo from "@/data/topCompany";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import JobDetailsDescriptions from "@/components/employer-single-pages/shared-components/JobDetailsDescriptions";
import RelatedJobs from "@/components/employer-single-pages/related-jobs/RelatedJobs";
import MapJobFinder from "@/components/job-listing-pages/components/MapJobFinder";
import Social from "@/components/employer-single-pages/social/Social";
import PrivateMessageBox from "@/components/employer-single-pages/shared-components/PrivateMessageBox";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCompanyById } from "@/services/company-feature.service";

// export const metadata = {
//   title:
//     "Employers Single Dyanmic V1 || Superio - Job Borad React NextJS Template",
//   description: "Superio - Job Borad React NextJS Template",
// };

const EmployersSingleV1 = ({ params }) => {
  const id = params.id;
  const employer =
    employersInfo.find((item) => item.id == id) || employersInfo[0];
  // ======================================= States ==================================//
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ======================================= Effects ==================================//
  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  // ======================================= Fetch Function ==================================//
  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      // Simulate fetching company details
      const response = await getCompanyById(id);
      console.log("Company Details: ", response);
      setCompanyDetails(response?.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ======================================= Handle Function ==================================//
  // ======================================= Render Function ==================================//
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <section className="job-detail-section">
        {/* <!-- Upper Box --> */}
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <Image
                      width={100}
                      height={100}
                      src={
                        companyDetails?.logo
                          ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${companyDetails.logo}`
                          : ""
                      }
                      alt="logo"
                    />
                  </span>
                  <h4>{companyDetails?.name}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {companyDetails?.address}
                    </li>
                    {/* compnay info */}
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {companyDetails?.primaryIndustry}
                    </li>
                    {/* location info */}
                    <li>
                      <span className="icon flaticon-telephone-1"></span>
                      {companyDetails?.phone}
                    </li>
                    {/* time info */}
                    <li>
                      <span className="icon flaticon-mail"></span>
                      {companyDetails?.email}
                    </li>
                    {/* salary info */}
                  </ul>
                  {/* End .job-info */}

                  <ul className="job-other-info">
                    <li className="time">
                      Open Jobs – {companyDetails?.jobNumber || 0}
                    </li>
                  </ul>
                  {/* End .job-other-info */}
                </div>
                {/* End .content */}

                <div className="btn-box">
                  <button
                    className="theme-btn btn-style-one"
                    data-bs-toggle="modal"
                    data-bs-target="#privateMessage"
                  >
                    Private Message
                  </button>
                  <button className="bookmark-btn">
                    <i className="flaticon-bookmark"></i>
                  </button>
                </div>
                {/* End btn-box */}

                {/* <!-- Modal --> */}
                <div
                  className="modal fade"
                  id="privateMessage"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="apply-modal-content modal-content">
                      <div className="text-center">
                        <h3 className="title">
                          Send message to {employer.name}
                        </h3>
                        <button
                          type="button"
                          className="closed-modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      {/* End modal-header */}

                      <PrivateMessageBox />
                      {/* End PrivateMessageBox */}
                    </div>
                    {/* End .send-private-message-wrapper */}
                  </div>
                </div>
                {/* End .modal */}
              </div>
            </div>
            {/* <!-- Job Block --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        {/* <!-- job-detail-outer--> */}
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                {/*  job-detail */}
                <JobDetailsDescriptions
                  description={companyDetails?.description}
                />
                {/* End job-detail */}

                {/* <!-- Related Jobs --> */}
                <div className="related-jobs">
                  <div className="title-box">
                    <h3>
                      {companyDetails?.jobNumber || 0} Others jobs available
                    </h3>
                    <div className="text">
                      {companyDetails?.jobNumber} jobs live - 293 added today.
                    </div>
                  </div>
                  {/* End .title-box */}

                  <RelatedJobs companyId={id} />
                  {/* End RelatedJobs */}
                </div>
                {/* <!-- Related Jobs --> */}
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      {/*  compnay-info */}
                      <ul className="company-info mt-0">
                        <li>
                          Primary industry:{" "}
                          <span>{companyDetails?.primaryIndustry}</span>
                        </li>
                        <li>
                          Company size: <span>{companyDetails?.size}</span>
                        </li>
                        <li>
                          Founded in: <span>{companyDetails?.foundedIn}</span>
                        </li>
                        <li>
                          Phone: <span>{companyDetails?.phone}</span>
                        </li>
                        <li>
                          Email: <span>{companyDetails?.email}</span>
                        </li>
                        <li>
                          Location: <span>{companyDetails?.address}</span>
                        </li>
                        <li>
                          Social media:
                          <Social
                            socialMedias={companyDetails?.socialMedias || []}
                          />
                        </li>
                      </ul>
                      {/* End compnay-info */}

                      <div className="btn-box">
                        <a
                          href="#"
                          className="theme-btn btn-style-three"
                          style={{ textTransform: "lowercase" }}
                        >
                          www.{employer?.name}.com
                        </a>
                      </div>
                      {/* btn-box */}
                    </div>
                  </div>
                  {/* End company-widget */}

                  {/* <div className="sidebar-widget"> */}
                  {/* <!-- Map Widget --> */}
                  {/* <h4 className="widget-title">Job Location</h4>
                    <div className="widget-content">
                      <div style={{ height: "300px", width: "100%" }}>
                        <MapJobFinder />
                      </div>
                    </div> */}
                  {/* <!--  Map Widget --> */}
                  {/* </div> */}
                  {/* End sidebar-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(EmployersSingleV1), {
  ssr: false,
});
