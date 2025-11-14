"use client";

import dynamic from "next/dynamic";
import employersInfo from "@/data/topCompany";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import JobDetailsDescriptions from "@/components/employer-single-pages/shared-components/JobDetailsDescriptions";
import RelatedJobs from "@/components/employer-single-pages/related-jobs/RelatedJobs";
import Social from "@/components/employer-single-pages/social/Social";
import PrivateMessageBox from "@/components/employer-single-pages/shared-components/PrivateMessageBox";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCompanyById } from "@/services/company-feature.service";

const EmployersSingleV1 = ({ params }) => {
  const id = params.id;
  const employer =
    employersInfo.find((item) => item.id == id) || employersInfo[0];

  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      const response = await getCompanyById(id);
      setCompanyDetails(response?.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ====================== Gom dữ liệu hiển thị vào dataShowUI ===================== //
  const dataShowUI = {
    id: companyDetails?.id || null,
    logo: companyDetails?.logo
      ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${companyDetails.logo}`
      : `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT_LOGO_FOR_EMPLOYER}`,
    name: companyDetails?.name || "Chưa cập nhật",
    address: companyDetails?.address || "Chưa cập nhật",
    primaryIndustry: companyDetails?.primaryIndustry || "Không rõ",
    phone: companyDetails?.phone || "Chưa có",
    email: companyDetails?.email || "Chưa có",
    jobNumber: companyDetails?.jobNumber || 0,
    size: companyDetails?.size || "Chưa cập nhật",
    foundedIn: companyDetails?.foundedIn || "Không rõ",
    socialMedias: companyDetails?.socialMedias || [],
    description: companyDetails?.description || "",
    website: companyDetails?.website,
  };

  // ============================== Render UI ================================== //
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

      <section className="job-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <Image
                      width={100}
                      height={100}
                      src={dataShowUI.logo}
                      alt="logo"
                    />
                  </span>
                  <h4>{dataShowUI.name}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {dataShowUI.address}
                    </li>
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {dataShowUI.primaryIndustry}
                    </li>
                    <li>
                      <span className="icon flaticon-telephone-1"></span>
                      {dataShowUI.phone}
                    </li>
                    <li>
                      <span className="icon flaticon-mail"></span>
                      {dataShowUI.email}
                    </li>
                  </ul>

                  <ul className="job-other-info">
                    <li className="time">Open Jobs – {dataShowUI.jobNumber}</li>
                  </ul>
                </div>

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

                {/* Modal */}
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
                          Send message to {dataShowUI.name}
                        </h3>
                        <button
                          type="button"
                          className="closed-modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <PrivateMessageBox />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* job-detail-outer */}
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <JobDetailsDescriptions
                  description={dataShowUI.description}
                  employerId={dataShowUI.id}
                />

                <div className="related-jobs">
                  <div className="title-box">
                    <h3>{dataShowUI.jobNumber} Others jobs available</h3>
                    {/* <div className="text">
                      {dataShowUI.jobNumber} jobs live - 293 added today.
                    </div> */}
                  </div>

                  <RelatedJobs companyId={id} />
                </div>
              </div>

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <ul className="company-info mt-0">
                        <li>
                          Primary industry:{" "}
                          <span>{dataShowUI.primaryIndustry}</span>
                        </li>
                        <li>
                          Company size: <span>{dataShowUI.size}</span>
                        </li>
                        <li>
                          Founded in: <span>{dataShowUI.foundedIn}</span>
                        </li>
                        <li>
                          Phone: <span>{dataShowUI.phone}</span>
                        </li>
                        <li>
                          Email: <span>{dataShowUI.email}</span>
                        </li>
                        <li>
                          Location: <span>{dataShowUI.address}</span>
                        </li>
                        <li>
                          Social media:
                          <Social socialContents={dataShowUI.socialMedias} />
                        </li>
                      </ul>

                      <div className="btn-box">
                        <a
                          href={dataShowUI.website ? dataShowUI.website : "#"}
                          className={`theme-btn btn-style-three ${
                            !dataShowUI.website
                              ? "pointer-events-none opacity-50"
                              : ""
                          }`}
                          style={{ textTransform: "lowercase" }}
                          target={dataShowUI.website ? "_blank" : undefined}
                          rel="noopener noreferrer"
                        >
                          {dataShowUI.website || "Chưa cập nhật"}
                        </a>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default dynamic(() => Promise.resolve(EmployersSingleV1), {
  ssr: false,
});
