import React from "react";
import AutoResizeTextarea from "./AutoResizeTextarea";

const CvSkills = ({ skills, onSkillChange }) => {
  const renderSkillItem = (skill, index) => {
    const separatorIndex = skill.indexOf(":");
    if (separatorIndex === -1) {
      return (
        <li key={index}>
          <AutoResizeTextarea
            className="cv-textarea"
            value={skill}
            onChange={(e) => onSkillChange(index, e.target.value)}
          />
        </li>
      );
    }
    const label = skill.substring(0, separatorIndex);
    const content = skill.substring(separatorIndex + 1);
    return (
      <li key={index}>
        <div className="skill-row">
          <div className="skill-label-wrapper">
            <AutoResizeTextarea
              className="cv-textarea"
              style={{ width: "150px" }}
              value={label}
              onChange={(e) =>
                onSkillChange(index, `${e.target.value}:${content}`)
              }
            />
            <span style={{ fontWeight: "bold", marginRight: "4px" }}>:</span>
          </div>
          <div className="skill-content-wrapper">
            <AutoResizeTextarea
              className="cv-textarea"
              value={content}
              onChange={(e) =>
                onSkillChange(index, `${label}:${e.target.value}`)
              }
            />
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="section-cv">
      <div className="section-title">Technical Skills</div>
      {/* THAY ĐỔI Ở ĐÂY: Thêm class "horizontal-list" */}
      <ul className="cv-ul horizontal-list">{skills.map(renderSkillItem)}</ul>
    </div>
  );
};

export default CvSkills;
