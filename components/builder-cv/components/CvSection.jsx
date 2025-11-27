import React from "react";
import AutoResizeTextarea from "./AutoResizeTextarea";
import { formatDate } from "@/utils/convert-function";

const CvSection = ({
  title,
  sections,
  onSectionChange,
  onDescriptionChange,
}) => {
  return (
    <div className="section-cv">
      <div className="section-title">{title}</div>
      {sections.map((section, idx) => (
        <div key={idx} className="item-block">
          <div className="item-header">
            <AutoResizeTextarea
              className="cv-input"
              style={{ fontWeight: "bold" }}
              value={section.organization}
              onChange={(e) =>
                onSectionChange(
                  section._originalIndex,
                  "organization",
                  e.target.value
                )
              }
            />
            <AutoResizeTextarea
              className="cv-input"
              style={{ width: "150px" }}
              value={section.location || ""}
              onChange={(e) =>
                onSectionChange(
                  section._originalIndex,
                  "location",
                  e.target.value
                )
              }
            />
          </div>
          <div className="item-sub">
            <AutoResizeTextarea
              className="cv-input"
              style={{ fontStyle: "italic" }}
              value={section.title}
              onChange={(e) =>
                onSectionChange(section._originalIndex, "title", e.target.value)
              }
            />
            <div
              style={{
                display: "flex",
                fontStyle: "italic",
                justifyContent: "flex-end",
                minWidth: "180px",
              }}
            >
              <AutoResizeTextarea
                className="cv-input"
                style={{ width: "70px", textAlign: "right" }}
                value={formatDate(section.startDate, "MM/YYYY")}
                onChange={(e) =>
                  onSectionChange(
                    section._originalIndex,
                    "startDate",
                    e.target.value
                  )
                }
              />

              <span style={{ marginLeft: "5px" }}>–</span>

              <AutoResizeTextarea
                className="cv-input"
                style={{ width: "70px", textAlign: "right" }}
                value={formatDate(section.endDate, "MM/YYYY")}
                onChange={(e) =>
                  onSectionChange(
                    section._originalIndex,
                    "endDate",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
          <ul className="cv-ul">
            {section.description.map((desc, i) => (
              <li key={i}>
                <AutoResizeTextarea
                  className="cv-textarea"
                  value={desc}
                  onChange={(e) =>
                    onDescriptionChange(
                      section._originalIndex,
                      i,
                      e.target.value
                    )
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CvSection;
