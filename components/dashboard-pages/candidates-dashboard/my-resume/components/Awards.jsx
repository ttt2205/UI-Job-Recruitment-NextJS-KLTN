"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

/*
  addAwardForm = {
    userId: "string",
    title: "Awards",
    industry: "string",
    business: "string",
    time: "string",
    text: "string",
  }
*/

const Awards = ({ data }) => {
  // <!-------------------- State -------------------->
  const [awardList, setAwardList] = useState([]);
  const [addAwardForm, setAddAwardForm] = useState({});

  useEffect(() => {
    console.log("Awards data prop:", data?.blockList);
    if (data) {
      setAwardList(data?.blockList || []);
    }
  }, [data]);

  // <!-------------------- Functions Handler -------------------->

  // <!-------------------- Render UI -------------------->
  return (
    <div className="resume-outer theme-yellow">
      <div className="upper-title">
        <h4>Awards</h4>
        <button className="add-info-btn">
          <span className="icon flaticon-plus"></span> Awards
        </button>
      </div>
      {/* <!-- Resume BLock --> */}
      {awardList && awardList.length > 0 ? (
        awardList.map((item, index) => (
          <div className="resume-block">
            <div className="inner">
              <span className="name">P</span>
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
        <p>No experience data available. Please add your work experience.</p>
      )}
    </div>
  );
};

export default Awards;
