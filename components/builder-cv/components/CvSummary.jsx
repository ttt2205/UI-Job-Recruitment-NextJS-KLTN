import React from "react";
import AutoResizeTextarea from "./AutoResizeTextarea";

const CvSummary = ({ summary, onChange }) => {
  return (
    <div className="section-cv">
      <div className="section-title">Professional Summary</div>
      <AutoResizeTextarea
        className="cv-textarea"
        style={{ textAlign: "justify" }}
        value={summary}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default CvSummary;
