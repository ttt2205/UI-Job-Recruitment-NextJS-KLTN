"use client";

import { useEffect, useState } from "react";
import AddPortfolio from "./AddPortfolio";
import Awards from "./Awards";
import Education from "./Education";
import Experiences from "./Experiences";
import SkillsMultiple from "./SkillsMultiple";
import { useSelector } from "react-redux";
import { getCandidateSectionByCandidateId } from "@/services/candidate-about-feature.service";
import Resume from "./Resume";

const index = () => {
  const { loading, account } = useSelector((state) => state.auth);

  // <!-------------------- State -------------------->
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [awardsList, setAwardsList] = useState([]);

  useEffect(() => {
    if (!loading && account && account.userId) {
      fetchResumeData();
    }
  }, [loading]);

  // <!-------------------- Fetch Functions -------------------->
  const fetchResumeData = async () => {
    try {
      const res = await getCandidateSectionByCandidateId(account?.id);
      if (res && res.results) {
        console.log("Resume data:", res.results);
        for (const item of res.results) {
          if (item.category === "Educations") {
            setEducationList(item);
          } else if (item.category === "Works & Experiences") {
            setExperienceList(item);
          } else if (item.category === "Awards") {
            setAwardsList(item);
          }
        }
      } else {
        toast.info("Chưa có dữ liệu resume. Vui lòng thêm mới.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu resume:", error);
      toast.error("Đã xảy ra lỗi khi lấy dữ liệu resume.");
    }
  };

  // <!-------------------- Handle Functions -------------------->
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  // <!-------------------- Render UI -------------------->
  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-12">
          <label>Upload Your CV</label>
          <div className="text-muted small">You can upload up to 10 CVs</div>
          <Resume />
        </div>
        {/* <!-- Input --> */}

        <div className="form-group col-lg-12 col-md-12">
          <Education data={educationList} />
          {/* <!-- Resume / Education --> */}

          <Experiences data={experienceList} fetchData={fetchResumeData} />
          {/* <!-- Resume / Work & Experience --> */}
        </div>
        {/* <!--  education and word-experiences --> */}

        {/* <div className="form-group col-lg-6 col-md-12">
          <AddPortfolio />
        </div> */}
        {/* <!-- End more portfolio upload --> */}

        <div className="form-group col-lg-12 col-md-12">
          {/* <!-- Resume / Awards --> */}
          <Awards data={awardsList} />
        </div>
        {/* <!-- End Award --> */}
      </div>
      {/* End .row */}
    </form>
  );
};

export default index;
