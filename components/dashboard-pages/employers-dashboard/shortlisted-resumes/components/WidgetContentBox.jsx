"use client";

import { useSelector } from "react-redux";
import Applicants from "./Applicants";
import { useState } from "react";

const WidgetContentBox = ({ dataList, fetchPotentialCandidate }) => {
  // ===================== Render UI =======================
  return (
    <>
      <div className="widget-content">
        <div className="row">
          <Applicants
            dataList={dataList}
            fetchPotentialCandidate={fetchPotentialCandidate}
          />
        </div>
      </div>
    </>
  );
};

export default WidgetContentBox;
