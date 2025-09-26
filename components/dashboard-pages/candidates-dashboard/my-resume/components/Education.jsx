"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

/*
  addEducationForm = {
      userId: "string",
      title: "Education",
      industry: "string",
      business: "string",
      time: "string",
      text: "string",
    }
*/

const Education = ({ data }) => {
  // <!-------------------- State -------------------->
  const [educationList, setEducationList] = useState([]);
  const [addEducationForm, setAddEducationForm] = useState({});

  useEffect(() => {
    if (data && data.length > 0) {
      setEducationList(data?.blockList || []);
    }
  }, [data]);

  // <!-------------------- Functions Handler -------------------->

  // <!-------------------- Render UI -------------------->
  return (
    <div className="resume-outer">
      <div className="upper-title">
        <h4>Education</h4>
        <button className="add-info-btn">
          <span className="icon flaticon-plus"></span> Add Education
        </button>
      </div>
      {/* <!-- Resume BLock --> */}
      {educationList && educationList.length > 0 ? (
        educationList.map((item, index) => (
          <div className="resume-block">
            <div className="inner">
              <span className="name">{item.meta}</span>
              <div className="title-box">
                <div className="info-box">
                  <h3>{item.industry}</h3>
                  <span>{item.business}</span>
                </div>
                <div className="edit-box">
                  <span className="year">{item.time}</span>
                  <div className="edit-btns">
                    <button>
                      <span className="la la-pencil"></span>
                    </button>
                    <button>
                      <span className="la la-trash"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="text">{item.text}</div>
            </div>
          </div>
        ))
      ) : (
        <p>No education data available.</p>
      )}
    </div>
  );
};

export default Education;
