"use client";

import { useEffect, useState } from "react";
import AddPortfolio from "./AddPortfolio";
import Awards from "./Awards";
import Education from "./Education";
import Experiences from "./Experiences";
import SkillsMultiple from "./SkillsMultiple";
import { useSelector } from "react-redux";
import { getCandidateSectionByCandidateId } from "@/services/candidate-about-feature.service";

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
          if (item.title === "Education") {
            setEducationList(item);
          } else if (item.title === "Work & Experience") {
            setExperienceList(item);
          } else if (item.title === "Awards") {
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

  // <!-------------------- Handler Functions -------------------->
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // <!-------------------- Render UI -------------------->
  return (
    <form className="default-form" onClick={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>Select Your CV</label>
          <select className="chosen-single form-select">
            <option>My CV</option>
          </select>
        </div>
        {/* <!-- Input --> */}

        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"></textarea>
        </div>
        {/* <!-- About Company --> */}

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

        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Skills </label>
          <SkillsMultiple />
        </div> */}
        {/* <!-- Multi Selectbox --> */}

        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
        {/* <!-- Input --> */}
      </div>
      {/* End .row */}
    </form>
  );
};

export default index;
