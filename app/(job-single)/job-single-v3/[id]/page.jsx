"use client";

import dynamic from "next/dynamic";
import jobs from "@/data/job-featured";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import CompnayInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import Contact from "@/components/job-single-pages/shared-components/Contact";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import RelatedJobs2 from "@/components/job-single-pages/related-jobs/RelatedJobs2";
import JobOverView2 from "@/components/job-single-pages/job-overview/JobOverView2";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getJobById } from "@/services/job-feature.service";

// export const metadata = {
//   title: "Job Single Dyanmic V3 || Superio - Job Borad React NextJS Template",
//   description: "Superio - Job Borad React NextJS Template",
// };

/* Response get list job pagination
  {
    "statusCode": 200,
    "message": "Lấy danh sách công việc phân trang thành công!",
    "results": [
        {
            "id": "68736ca827ebd628fc528ed2",
            "logo": "",
            "jobTitle": "Lập trình viên Backend Node.js",
            "company": {
                "id": "68736afc61942cb6f1e0141c",
                "email": "VNP@company.com",
                "name": "Công ty TNHH Công Nghệ VNP",
                "userId": "686cb5d902a159956bb2a372",
                "primaryIndustry": "Công nghệ thông tin",
                "size": "51-200 nhân viên",
                "foundedIn": 2015,
                "description": "Công ty chuyên cung cấp giải pháp phần mềm và dịch vụ CNTT.",
                "phone": "0987654321",
                "address": "Quận 2, TP.HCM",
                "logo": "https://example.com/logo.png",
                "socialMedias": [
                    [],
                    []
                ],
                "isDeleted": false,
                "createdAt": "2025-07-13T08:14:52.413Z",
                "updatedAt": "2025-07-13T08:14:52.413Z"
            },
            "location": "123 Đường Lê Văn Việt, Quận 9",
            "time": "08:00 - 17:00",
            "salary": 15000000,
            "jobType": [
                {
                    "styleClass": "time",
                    "type": "Fulltime"
                }
            ],
            "destination": null
        }
    ],
    "meta": {
        "totalItems": 1,
        "currentPage": 1,
        "pageSize": 10,
        "totalPages": 1
    }
  }
*/

const JobSingleDynamicV3 = ({ params }) => {
  const id = params.id;
  // ========================== State =============================/
  const [job, setJob] = useState({});

  useEffect(() => {
    fetchCompanyById();
  }, []);

  // ========================== Fetch Function =============================/
  const fetchCompanyById = async () => {
    try {
      const res = await getJobById(id);
      setJob(res?.data || {});
    } catch (error) {}
  };

  // ========================== Handler Function =============================/
  // const company = jobs.find((item) => item.id == id) || jobs[0];

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
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-block-outer">
                  <div className="job-block-seven style-two">
                    <div className="inner-box">
                      <div className="content">
                        <h4>{job?.jobTitle}</h4>

                        <ul className="job-info">
                          <li>
                            <span className="icon flaticon-briefcase"></span>
                            {job?.company?.name || ""}
                          </li>
                          {/* compnay info */}
                          <li>
                            <span className="icon flaticon-map-locator"></span>
                            {job?.location}
                          </li>
                          {/* location info */}
                          <li>
                            <span className="icon flaticon-clock-3"></span>{" "}
                            {job?.time}
                          </li>
                          {/* time info */}
                          <li>
                            <span className="icon flaticon-money"></span>{" "}
                            {job?.salary}
                          </li>
                          {/* salary info */}
                        </ul>
                        {/* End .job-info */}

                        <ul className="job-other-info">
                          {job?.jobType?.map((val, i) => (
                            <li key={i} className={`${val.styleClass}`}>
                              {val.type}
                            </li>
                          ))}
                        </ul>
                        {/* End .job-other-info */}
                      </div>
                      {/* End .content */}
                    </div>
                  </div>
                  {/* <!-- Job Block --> */}
                </div>
                {/* <!-- job block outer --> */}

                <div className="job-overview-two">
                  <h4>Job Description</h4>
                  <JobOverView2 job={job} />
                </div>
                {/* <!-- job-overview-two --> */}

                <JobDetailsDescriptions job={job} />
                {/* End job-details */}

                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this job</h5>
                    <SocialTwo />
                  </div>
                </div>
                {/* <!-- Other Options --> */}
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="btn-box">
                    <a
                      href="#"
                      className="theme-btn btn-style-one"
                      data-bs-toggle="modal"
                      data-bs-target="#applyJobModal"
                    >
                      Apply For Job
                    </a>
                    <button className="bookmark-btn">
                      <i className="flaticon-bookmark"></i>
                    </button>
                  </div>
                  {/* End apply for job btn */}

                  {/* <!-- Modal --> */}
                  <div
                    className="modal fade"
                    id="applyJobModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="apply-modal-content modal-content">
                        <div className="text-center">
                          <h3 className="title">Apply for this job</h3>
                          <button
                            type="button"
                            className="closed-modal"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        {/* End modal-header */}

                        <ApplyJobModalContent />
                        {/* End PrivateMessageBox */}
                      </div>
                      {/* End .send-private-message-wrapper */}
                    </div>
                  </div>
                  {/* End .modal */}

                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <div className="company-title">
                        <div className="company-logo">
                          <Image
                            width={54}
                            height={53}
                            src={job.logo}
                            alt="resource"
                          />
                        </div>
                        <h5 className="company-name">
                          {job?.company?.name || ""}
                        </h5>
                        <a href="#" className="profile-link">
                          View company profile
                        </a>
                      </div>
                      {/* End company title */}

                      <CompnayInfo company={job?.company} />

                      <div className="btn-box">
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-btn btn-style-three"
                        >
                          {job?.link}
                        </a>
                      </div>
                      {/* End btn-box */}
                    </div>
                  </div>
                  {/* End .company-widget */}

                  <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact />
                      </div>
                      {/* End .default-form */}
                    </div>
                  </div>
                  {/* End contact-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
            {/* End .row  */}

            <div className="related-jobs">
              <div className="title-box">
                <h3>Related Jobs</h3>
                <div className="text">2025 jobs live - 293 added today.</div>
              </div>
              {/* End title box */}

              <div className="row">
                <RelatedJobs2
                  id={job?.id}
                  industry={job?.industry}
                  country={job?.country}
                  city={job?.city}
                />
              </div>
              {/* End .row */}
            </div>
            {/* <!-- Related Jobs --> */}
          </div>
          {/* End auto-container */}
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(JobSingleDynamicV3), {
  ssr: false,
});
