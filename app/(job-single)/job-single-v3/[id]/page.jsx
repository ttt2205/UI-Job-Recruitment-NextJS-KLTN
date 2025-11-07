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
import { convertJobType } from "@/utils/convert-function";

const JobSingleDynamicV3 = ({ params }) => {
  const id = params.id;
  const router = useRouter();

  // ========================== State =============================/
  const [job, setJob] = useState({});
  const [isExpired, setIsExpired] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && !loading) {
      fetchJobById();
    }
  }, []);

  // ========================== Fetch Function =============================/
  const fetchJobById = async () => {
    setLoading(true);
    try {
      const res = await getJobById(id);
      const format = res?.data ?? {};
      setJob(format);
      setIsExpired(checkIsExpired(res?.data?.expireDate));
    } catch (error) {
      console.error("Error fetchJobById: ", error);
      toast.error("Unable to load job information!");
    } finally {
      setLoading(false);
    }
  };

  // ========================== Handler Function =============================/
  const checkIsExpired = (expiredDate) => {
    if (!expiredDate) return false;
    const expiredTime = new Date(expiredDate).getTime();
    const now = Date.now();
    return now > expiredTime;
  };

  // ========================== Format dữ liệu để hiển thị =============================/
  const formShowData = {
    id: job?.id || null,
    title: job?.title || "Không có tiêu đề",
    companyName: job?.company?.name || "Chưa cập nhật",
    logo: job?.logo
      ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${job.logo}`
      : `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT_LOGO_FOR_EMPLOYER}`,
    location: job?.location || "Không xác định",
    country: job?.country || "",
    city: job?.city || "",
    level: job?.level || "",
    experience: job?.experience
      ? `${job.experience} năm kinh nghiệm`
      : "Không yêu cầu",
    jobTypes: job?.jobTypes?.map((item) => convertJobType(item)) || [],
    salaryText: job?.salary
      ? `${job.salary.min?.toLocaleString(
          "vi-VN"
        )} - ${job.salary.max?.toLocaleString("vi-VN")} ${job.salary.currency}${
          job.salary.negotiable ? " (Thương lượng)" : ""
        }`
      : "Thương lượng",
    description: job?.description || "",
    skills: job?.skills || [],
    skillAndExperiences: job?.skillAndExperiences || [],
    responsibilities: job?.responsibilities || [],
    industry: job?.industry || "",
    datePosted: job?.datePosted
      ? new Date(job.datePosted).toLocaleDateString("vi-VN")
      : "Chưa có",
    expireDate: job?.expireDate
      ? new Date(job.expireDate).toLocaleDateString("vi-VN")
      : "Không xác định",
    website: job?.company?.website || "",
    workTime: {
      from: job?.workTime?.from || "00",
      to: job?.workTime?.to || "00",
    },
  };

  // ========================== Render UI =============================/
  return (
    <>
      {/* <!-- Header Span --> */} <span className="header-span"></span>{" "}
      <LoginPopup />
      {/* End Login Popup Modal */}
      <DefaulHeader />
      {/* <!--End Main Header --> */}
      <MobileMenu />
      {/* End MobileMenu */}
      <section className="job-detail-section">
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              {/* ======================================= */}
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-block-outer">
                  <div className="job-block-seven style-two">
                    <div className="inner-box">
                      <div className="content">
                        <h4>{formShowData.title}</h4>

                        <ul className="job-info">
                          <li>
                            <span className="icon flaticon-briefcase"></span>
                            {formShowData.companyName}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>
                            {formShowData.location}
                          </li>
                          <li>
                            <span className="icon flaticon-clock-3"></span>{" "}
                            {formShowData.experience}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span>{" "}
                            {formShowData.salaryText}
                          </li>
                        </ul>

                        {formShowData.jobTypes.length > 0 && (
                          <ul className="job-other-info">
                            {formShowData.jobTypes.map((val, i) => (
                              <li key={i} className={val.styleClass}>
                                {val.type}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="job-overview-two">
                  <h4>Job Description</h4>
                  <JobOverView2 job={formShowData} />
                </div>

                <JobDetailsDescriptions job={formShowData} />

                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this job</h5>
                    <SocialTwo />
                  </div>
                </div>
              </div>
              {/* ======================================= */}

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

                  {/* Modal Apply */}
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

                        <ApplyJobModalContent
                          jobId={id}
                          isDisabled={isExpired}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <div className="company-title">
                        <div className="company-logo">
                          <Image
                            width={54}
                            height={53}
                            src={formShowData.logo}
                            alt="resource"
                          />
                        </div>
                        <h5 className="company-name">
                          {formShowData.companyName}
                        </h5>
                        <a href="#" className="profile-link">
                          View company profile
                        </a>
                      </div>

                      <CompnayInfo company={job?.company} />

                      <div className="btn-box">
                        <a
                          href={formShowData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`theme-btn btn-style-three ${
                            !formShowData.website ? "disabled-btn" : ""
                          }`}
                        >
                          View Company Website
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact />
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            <div className="related-jobs">
              <div className="title-box">
                <h3>Related Jobs</h3>
                <div className="text">2025 jobs live - 293 added today.</div>
              </div>

              <div className="row">
                <RelatedJobs2
                  id={job?.id}
                  industry={formShowData.industry}
                  country={formShowData.country}
                  city={formShowData.city}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default dynamic(() => Promise.resolve(JobSingleDynamicV3), {
  ssr: false,
});
