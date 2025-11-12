"use client";

import dynamic from "next/dynamic";
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
import { useEffect, useState, useMemo } from "react";
import { getCandidateById } from "@/services/candidate-feature.service";
import { getCandidateSectionByCandidateId } from "@/services/candidate-about-feature.service";
import { formatDate } from "@/utils/convert-function";

const CandidateSingleDynamicV3 = ({ params }) => {
  const id = params.id;

  const [candidate, setCandidate] = useState({});
  const [candidateResume, setCandidateResume] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ================================= Fetch Function =================================/
  useEffect(() => {
    if (id) fetchCandidate();
  }, [id]);

  const fetchCandidate = async () => {
    try {
      setLoading(true);
      const response = await getCandidateById(id);
      const candidateData = response.data || {};

      const resumeList = await getCandidateSectionByCandidateId(
        candidateData.id
      );
      setCandidate(candidateData);
      setCandidateResume(resumeList?.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================================= Chuẩn hóa dữ liệu hiển thị (useMemo) =================================/
  const displayCandidate = useMemo(() => {
    if (!candidate) return null;

    // Hàm chuẩn hóa tên
    const normalizeName = (name) => {
      if (!name) return "No Name";
      return name
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    };

    return {
      id: candidate.id,
      fullName: normalizeName(candidate.name),
      designation: candidate.designation || "Chưa cập nhật",
      avatar: candidate?.avatar
        ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${candidate.avatar}`
        : process.env.NEXT_PUBLIC_IMAGE_DEFAULT_AVATAR_FOR_CANDIDATE,
      location: candidate.location || "Không có địa chỉ",
      hourlyRate: candidate.hourlyRate
        ? `${candidate.hourlyRate} ${candidate.currency || "USD"} / hour`
        : `Chưa cập nhật`,
      createdAt: candidate.createdAt
        ? formatDate(candidate.createdAt, "DD/MM/YYYY")
        : "N/A",
      experience: candidate.experience || 0,
      birthday: candidate.birthday
        ? formatDate(candidate.birthday, "DD/MM/YYYY")
        : "N/A",
      currentSalary: candidate.currentSalary || 0,
      expectedSalary: candidate.expectedSalary || 0,
      currency: candidate.currency || "USD",
      gender:
        candidate.gender === "male"
          ? "Nam"
          : candidate.gender === "female"
          ? "Nữ"
          : "Khác",
      qualification: candidate.qualification || "Chưa rõ",
      languages:
        candidate.languages?.length > 0
          ? candidate.languages.join(", ")
          : "Không có",
      skills: candidate.skills || [],
      socialMedias: candidate.socialMedias || [],
      description: candidate.description || "Chưa có mô tả",
    };
  }, [candidate]);

  // ================================= Render Function =================================/
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Lỗi: {error}</div>;
  if (!displayCandidate) return <div>Không tìm thấy ứng viên</div>;

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

      <section className="candidate-detail-section style-three">
        <div className="upper-box">
          <div className="auto-container">
            <div className="candidate-block-six">
              <div className="inner-box">
                <figure className="image">
                  <Image
                    width={90}
                    height={90}
                    src={displayCandidate.avatar}
                    alt="candidate"
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      width: "90px",
                      height: "90px",
                    }}
                  />
                </figure>
                <h4 className="name">{displayCandidate.fullName}</h4>
                <span className="designation">
                  {displayCandidate.designation}
                </span>

                <div className="content">
                  <ul className="post-tags">
                    {displayCandidate.skills.map((val, i) => (
                      <li key={i}>{val}</li>
                    ))}
                  </ul>

                  <ul className="candidate-info">
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {displayCandidate.location}
                    </li>
                    <li>
                      <span className="icon flaticon-money"></span>
                      {displayCandidate.hourlyRate}
                    </li>
                    <li>
                      <span className="icon flaticon-clock"></span> Member
                      Since, {displayCandidate.createdAt}
                    </li>
                  </ul>

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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="candidate-detail-outer">
          <div className="auto-container">
            <div className="row">
              {/* ========== SIDEBAR ========== */}
              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <div className="widget-content">
                      <ul className="job-overview">
                        <li>
                          <i className="icon icon-calendar"></i>
                          <h5>Experience:</h5>
                          <span>{displayCandidate.experience} Years</span>
                        </li>
                        <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Birthday:</h5>
                          <span>{displayCandidate.birthday}</span>
                        </li>
                        <li>
                          <i className="icon icon-rate"></i>
                          <h5>Current Salary:</h5>
                          <span>
                            {displayCandidate.currentSalary}{" "}
                            {displayCandidate.currency}
                          </span>
                        </li>
                        <li>
                          <i className="icon icon-salary"></i>
                          <h5>Expected Salary:</h5>
                          <span>
                            {displayCandidate.expectedSalary}{" "}
                            {displayCandidate.currency}
                          </span>
                        </li>
                        <li>
                          <i className="icon icon-user-2"></i>
                          <h5>Gender:</h5>
                          <span>{displayCandidate.gender}</span>
                        </li>
                        <li>
                          <i className="icon icon-language"></i>
                          <h5>Language:</h5>
                          <span>{displayCandidate.languages}</span>
                        </li>
                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Education Level:</h5>
                          <span>{displayCandidate.qualification}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="sidebar-widget social-media-widget">
                    <h4 className="widget-title">Social media</h4>
                    <div className="widget-content">
                      <div className="social-links">
                        <Social
                          socialContents={displayCandidate.socialMedias}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-widget">
                    <h4 className="widget-title">Professional Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        <JobSkills skills={displayCandidate.skills} />
                      </ul>
                    </div>
                  </div>

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

              {/* ========== MAIN CONTENT ========== */}
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-detail">
                  <h4>Candidates About</h4>
                  <p>{displayCandidate.description}</p>

                  {/* <div className="portfolio-outer">
                    <div className="row">
                      <GalleryBox />
                    </div>
                  </div> */}

                  {candidateResume.map((resume) => (
                    <div
                      key={resume.id}
                      className={`resume-outer ${resume.themeColor}`}
                    >
                      <div className="upper-title">
                        <h4>{resume?.title}</h4>
                      </div>

                      {resume?.blockList?.map((item) => (
                        <div key={item.id} className="resume-block">
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
                    </div>
                  ))}

                  {/* <div className="video-outer">
                    <h4>Intro Video</h4>
                    <AboutVideo />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default dynamic(() => Promise.resolve(CandidateSingleDynamicV3), {
  ssr: false,
});
