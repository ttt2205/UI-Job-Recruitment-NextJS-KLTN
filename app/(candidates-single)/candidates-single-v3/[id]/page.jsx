"use client";

import dynamic from "next/dynamic";
// import candidates from "@/data/candidates";
// import candidateResume from "@/data/candidateResume";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import Contact from "@/components/candidates-single-pages/shared-components/Contact";
import GalleryBox from "@/components/candidates-single-pages/shared-components/GalleryBox";
import Social from "@/components/candidates-single-pages/social/Social";
import JobSkills from "@/components/candidates-single-pages/shared-components/JobSkills";
import AboutVideo from "@/components/candidates-single-pages/shared-components/AboutVideo";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCandidateById } from "@/services/candidate-feature.service";
import { getCandidateSectionByCandidateId } from "@/services/candidate-about-feature.service";
import { formatDate } from "@/utils/convert-function";

// export const metadata = {
//   title:
//     "Candidate Single Dyanmic V3 || Superio - Job Borad React NextJS Template",
//   description: "Superio - Job Borad React NextJS Template",
// };

const CandidateSingleDynamicV3 = ({ params }) => {
  const id = params.id;
  // ================================= State Function =================================/
  // const candidate = candidates.find((item) => item.id == id) || candidates[0];
  const [candidate, setCandidate] = useState([]);
  const [candidateResume, setCandidateResume] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchCandidate();
    }
  }, [id]);
  // ================================= Fetch Function =================================/
  const fetchCandidate = async () => {
    try {
      setLoading(true);
      const response = await getCandidateById(id);
      setCandidate(response.data || {});
      const resumeList = await getCandidateSectionByCandidateId(data.id);
      setCandidateResume(resumeList?.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================================= Handle Function =================================/

  // ================================= Render Function =================================/
  if (loading) {
    return <div>Loading...</div>;
  }
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
      <section className="candidate-detail-section style-three">
        <div className="upper-box">
          <div className="auto-container">
            <div className="candidate-block-six">
              <div className="inner-box">
                <figure className="image">
                  <Image
                    width={90}
                    height={90}
                    src={
                      candidate?.avatar
                        ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${candidate.avatar}`
                        : process.env
                            .NEXT_PUBLIC_IMAGE_DEFAULT_AVATAR_FOR_CANDIDATE
                    }
                    alt="candidates"
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      width: "90px",
                      height: "90px",
                    }}
                  />
                </figure>
                <h4 className="name">{candidate?.name || "No Name"}</h4>
                <span className="designation">{candidate?.designation}</span>

                <div className="content">
                  <ul className="post-tags">
                    {candidate?.tags?.map((val, i) => (
                      <li key={i}>{val}</li>
                    ))}
                  </ul>
                  {/* End post-tags */}

                  <ul className="candidate-info">
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {candidate?.location || "No location"}
                    </li>
                    <li>
                      <span className="icon flaticon-money"></span> $
                      {candidate?.hourlyRate || 0} / hour
                    </li>
                    <li>
                      <span className="icon flaticon-clock"></span> Member
                      Since,{" "}
                      {candidate?.createdAt
                        ? formatDate(candidate.createdAt, "DD/MM/YYYY")
                        : "N/A"}
                    </li>
                  </ul>
                  {/* End candidate-info */}

                  <div className="btn-box">
                    <a
                      className="theme-btn btn-style-one"
                      href="/images/sample.pdf"
                      download
                    >
                      Download CV
                    </a>
                    <button className="bookmark-btn">
                      <i className="flaticon-bookmark"></i>
                    </button>
                  </div>
                  {/* Download cv box */}
                </div>
                {/* End .content */}
              </div>
            </div>
            {/*  <!-- Candidate block Five --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        <div className="candidate-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <div className="widget-content">
                      <ul className="job-overview">
                        <li>
                          <i className="icon icon-calendar"></i>
                          <h5>Experience:</h5>
                          <span>{candidate?.experience || 0} Years</span>
                        </li>

                        <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Birthday:</h5>
                          <span>
                            {candidate?.birthday
                              ? formatDate(candidate.birthday, "DD/MM/YYYY")
                              : "N/A"}
                          </span>
                        </li>

                        <li>
                          <i className="icon icon-rate"></i>
                          <h5>Current Salary:</h5>
                          <span>
                            {candidate?.currentSalary || "0"} -
                            {candidate?.currency || "N/A"}
                          </span>
                        </li>

                        <li>
                          <i className="icon icon-salary"></i>
                          <h5>Expected Salary:</h5>
                          <span>
                            {candidate?.expectedSalary || "0"} -
                            {candidate?.currency || "N/A"}
                          </span>
                        </li>

                        <li>
                          <i className="icon icon-user-2"></i>
                          <h5>Gender:</h5>
                          <span>
                            {candidate.gender === "male" ? "Nam" : "Nữ"}
                          </span>
                        </li>

                        <li>
                          <i className="icon icon-language"></i>
                          <h5>Language:</h5>
                          <span>
                            {candidate.languages?.length > 0
                              ? candidate.languages.join(", ")
                              : "None"}
                          </span>
                        </li>

                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Education Level:</h5>
                          <span>{candidate.qualification}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget conadidate overview */}

                  <div className="sidebar-widget social-media-widget">
                    <h4 className="widget-title">Social media</h4>
                    <div className="widget-content">
                      <div className="social-links">
                        <Social socialContents={candidate.socialMedias} />
                      </div>
                    </div>
                  </div>
                  {/* End .sidebar-widget social-media-widget */}

                  <div className="sidebar-widget">
                    <h4 className="widget-title">Professional Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        <JobSkills skills={candidate.tags} />
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget skill widget */}

                  <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact />
                      </div>
                    </div>
                  </div>
                  {/* End .sidebar-widget contact-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}

              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-detail">
                  <h4>Candidates About</h4>
                  <p>{candidate.description}</p>

                  {/* <!-- Portfolio --> */}
                  <div className="portfolio-outer">
                    <div className="row">
                      <GalleryBox />
                    </div>
                  </div>

                  {/* <!-- Candidate Resume Start --> */}
                  {candidateResume &&
                    candidateResume.map((resume) => (
                      <div className={`resume-outer ${resume.themeColor}`}>
                        <div className="upper-title">
                          <h4>{resume?.title}</h4>
                        </div>

                        {/* <!-- Start Resume BLock --> */}
                        {resume?.blockList?.map((item) => (
                          <div className="resume-block">
                            <div className="inner">
                              <span className="name">{item.meta}</span>
                              <div className="title-box">
                                <div className="info-box">
                                  <h3>{item.industry}</h3>
                                  <span>{item.business}</span>
                                </div>
                                <div className="edit-box">
                                  <span className="year">{item.year}</span>
                                </div>
                              </div>
                              <div className="text">{item.text}</div>
                            </div>
                          </div>
                        ))}

                        {/* <!-- End Resume BLock --> */}
                      </div>
                    ))}
                  {/* <!-- Candidate Resume End --> */}

                  <div className="video-outer">
                    <h4>Intro Video</h4>
                    <AboutVideo />
                  </div>
                  {/* <!-- About Video Box --> */}
                </div>
              </div>
              {/* End .content-column */}
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

export default dynamic(() => Promise.resolve(CandidateSingleDynamicV3), {
  ssr: false,
});
