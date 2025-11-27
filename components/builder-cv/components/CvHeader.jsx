import React from "react";
import AutoResizeTextarea from "./AutoResizeTextarea";

const CvHeader = ({ cvData, onChange }) => {
  return (
    <div className="header">
      <div className="name">
        <AutoResizeTextarea
          className="cv-input"
          style={{ textAlign: "center", textTransform: "uppercase" }}
          value={cvData.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          placeholder="YOUR NAME"
        />
      </div>
      <div className="contact-info">
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <AutoResizeTextarea
            className="cv-input"
            style={{ width: "auto", textAlign: "center" }}
            value={cvData.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="Address"
          />
          <span className="separator">|</span>
          <AutoResizeTextarea
            className="cv-input"
            style={{ width: "auto", textAlign: "center" }}
            value={cvData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="Phone"
          />
          <span className="separator">|</span>
          <AutoResizeTextarea
            className="cv-input"
            style={{ width: "auto", textAlign: "center" }}
            value={cvData.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="Email"
          />
        </div>
        <AutoResizeTextarea
          className="cv-input"
          style={{
            textAlign: "center",
            fontSize: "14pt",
            fontWeight: "bold",
            marginTop: "4px",
          }}
          value={cvData.designation}
          onChange={(e) => onChange("designation", e.target.value)}
          placeholder="JOB TITLE"
        />
      </div>
    </div>
  );
};

export default CvHeader;
