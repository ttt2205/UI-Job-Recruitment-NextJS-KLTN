"use client";

import dynamic from "next/dynamic";
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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
/* Response get list job pagination
  {
    "statusCode": 200,
    "message": "Lấy công việc thành công!",
    "data": {
        "id": "689307de1152ccfb7a7d3468",
        "logo": "file-1753588732487-4780477.jpg",
        "jobTitle": "Intern Backend NestJS",
        "company": {
            "id": "68736afc61942cb6f1e0141c",
            "email": "VNP@company.com",
            "name": "Công ty TNHH Công Nghệ VNP",
            "userId": "686f5683f6e123fa2042954f",
            "primaryIndustry": "Infomation Technology",
            "size": "100 - 150",
            "foundedIn": 2015,
            "description": "Công ty chuyên cung cấp giải pháp phần mềm và dịch vụ CNTT.",
            "phone": "0987654321",
            "address": "Quận 2, TP.HCM",
            "logo": "file-1753588732487-4780477.jpg",
            "socialMedias": [
                {
                    "platform": "facebook",
                    "url": "https://facebook.com/congtyabc"
                },
                {
                    "platform": "twitter",
                    "url": "https://twitter.com/congtyabc"
                },
                {
                    "platform": "linkedin",
                    "url": "https://linkedin.com/company/congtyabc"
                },
                {
                    "platform": "googlePlus",
                    "url": "https://googleplus.com/company/congtyabc"
                }
            ],
            "isDeleted": false,
            "createdAt": "2025-07-13T08:14:52.413Z",
            "updatedAt": "2025-07-30T07:07:22.379Z"
        },
        "location": "312 Lê Thánh Tông, Quận 1",
        "description": "We are hiring intern for internship program.",
        "responsibilities": [
            "Chịu trách nhiệm và hoàn thành nhiệm vụ được giao."
        ],
        "skillAndExperience": [
            "Có kiến thức về NestJS và NodeJS.",
            "Có kiến thức về cơ sở dữ liệu."
        ],
        "salary": {
            "min": 0,
            "max": 3000000,
            "currency": "VND",
            "negotiable": true
        },
        "workTime": {
            "from": "09:00",
            "to": "18:00"
        },
        "industry": "Infomation Technology",
        "quantity": 1,
        "country": "Vietnam",
        "city": "Hồ Chí Minh",
        "jobType": [
            {
                "styleClass": "time",
                "type": "Full Time"
            },
            {
                "styleClass": "level",
                "type": "Intern"
            }
        ],
        "destination": null,
        "datePosted": "6/8/2025",
        "expireDate": "30/8/2025"
      }
  }
*/

const JobSingleDynamicV3 = ({ params }) => {
  const id = params.id;
  const router = useRouter();
  // ========================== State =============================/
  const [job, setJob] = useState({});
  const [isExpired, setIsExpired] = useState(true);

  useEffect(() => {
    if (id) {
      fetchJobById();
    }
  }, []);

  // ========================== Fetch Function =============================/
  const fetchJobById = async () => {
    try {
      const res = await getJobById(id);
      setJob(res?.data || {});
      setIsExpired(checkIsExpired(res?.data?.expireDate));
    } catch (error) {
      toast.error("Không tải được thông tin của công ty!");
      router.push("/not-found");
    }
  };

  // ========================== Handler Function =============================/
  const checkIsExpired = (expiredDate) => {
    if (!expiredDate) return false; // nếu không có ngày hết hạn thì coi như chưa hết hạn

    const expiredTime = new Date(expiredDate).getTime();
    const now = Date.now();
    console.log("expiredTime: ", expiredTime);
    console.log("now: ", now);
    console.log("now > expiredTime: ", now > expiredTime);
    return now > expiredTime; // true = đã hết hạn
  };

  // ========================== Render UI =============================/
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
                            {job?.salary?.min && job?.salary?.max === 0
                              ? job?.salary?.min +
                                " - " +
                                "Thương lượng" +
                                " " +
                                job?.salary?.currency
                              : job?.salary?.max && job?.salary?.negotiable
                              ? job?.salary?.min +
                                " - " +
                                job?.salary?.max +
                                " " +
                                job?.salary?.currency +
                                " ( " +
                                "Thương lượng" +
                                " ) "
                              : job?.salary?.min +
                                " - " +
                                job?.salary?.max +
                                " " +
                                job?.salary?.currency}
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
                    <button className="bookmark-btn" disabled={isExpired}>
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
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
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

                        <ApplyJobModalContent
                          jobId={id}
                          isDisabled={isExpired}
                        />
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
                            src={`${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${job?.logo}`}
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
                          href={job?.website || ""}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`theme-btn btn-style-three ${
                            !job?.website ? "disabled-btn" : ""
                          }`}
                        >
                          View Company Website
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
