"use client";

import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import {
  improveCVForJob,
  getCvHistoryByJobId,
  getCvById,
} from "@/services/builder-cv.service";

import CvHeader from "./components/CvHeader";
import CvSection from "./components/CvSection";
import CvSkills from "./components/CvSkills";
import CvSummary from "./components/CvSummary";
import { toast } from "react-toastify";

const CvViewer = ({ jobId }) => {
  const componentRef = useRef();
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cvHistory, setCvHistory] = useState([]);
  const [selectedCvId, setSelectedCvId] = useState(null);
  const [showHistory, setShowHistory] = useState(true);

  // ======================= Fetch CV History ==============================
  useEffect(() => {
    fetchCvHistory();
  }, []);

  const fetchCvHistory = async () => {
    setLoading(true);
    try {
      const res = await getCvHistoryByJobId(jobId);
      if (res && res.statusCode === 200) {
        setCvHistory(res.results || []);
      } else {
        setCvHistory([]);
      }
    } catch (error) {
      console.error("Error fetching CV history:", error);
    } finally {
      setLoading(false);
    }
  };

  // ======================= Load CV by ID ==============================
  const handleSelectCv = async (resumeId) => {
    setLoading(true);
    try {
      const res = await getCvById(resumeId);
      const cv = res.data;
      if (cv.sections) {
        cv.sections = cv.sections.map((sec, idx) => ({
          ...sec,
          _originalIndex: idx,
        }));
      }
      setCvData(cv);
      setSelectedCvId(resumeId);
      setShowHistory(false);
    } catch (error) {
      console.error("Error loading CV by ID:", error);
    } finally {
      setLoading(false);
    }
  };

  // ======================= Create new CV ==============================
  const handleCreateNewCv = async () => {
    if (!jobId) {
      toast.error("Không có JobId để tạo CV!");
      return;
    }
    setLoading(true);
    try {
      const res = await improveCVForJob(jobId);
      if (res && res.statusCode === 201) {
        const newCv = res.data || {};
        if (newCv.sections) {
          newCv.sections = newCv.sections.map((sec, idx) => ({
            ...sec,
            _originalIndex: idx,
          }));
        }
        setCvData(newCv);
        fetchCvHistory();
      }
      setSelectedCvId(null);
      setShowHistory(false);
    } catch (error) {
      console.error("Error creating new CV:", error);
      toast.error("Error creating new CV");
    } finally {
      setLoading(false);
    }
  };

  // ======================= Handle CV changes ==============================
  const handleInfoChange = (field, value) =>
    setCvData((prev) => ({ ...prev, [field]: value }));

  const handleSectionChange = (originalIndex, field, value) => {
    setCvData((prev) => {
      const newSections = [...prev.sections];
      newSections[originalIndex] = {
        ...newSections[originalIndex],
        [field]: value,
      };
      return { ...prev, sections: newSections };
    });
  };

  const handleDescriptionChange = (originalIndex, descIndex, value) => {
    setCvData((prev) => {
      const newSections = [...prev.sections];
      const newDescription = [...newSections[originalIndex].description];
      newDescription[descIndex] = value;
      newSections[originalIndex].description = newDescription;
      return { ...prev, sections: newSections };
    });
  };

  const handleSkillChange = (skillIndex, value) => {
    setCvData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[skillIndex] = value;
      return { ...prev, skills: newSkills };
    });
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `CV_${cvData?.fullName || "Candidate"}`,
  });

  const handOpenHistory = () => {
    setShowHistory(true);
    setCvData(null);
  };

  // ======================= Render ==============================
  if (loading)
    return (
      <div style={{ color: "white", textAlign: "center", padding: "50px" }}>
        Loading...
      </div>
    );

  // Nếu người dùng chưa chọn CV, show lịch sử
  if (showHistory)
    return (
      <div style={{ padding: "20px", color: "white" }}>
        <h3>Chọn CV để tiếp tục hoặc tạo CV mới</h3>

        {cvHistory.length > 0 && (
          <ul>
            {cvHistory.map((cv) => (
              <li key={cv.id}>
                <button
                  onClick={() => handleSelectCv(cv.id)}
                  className="btn-primary"
                  style={{ marginBottom: "8px" }}
                >
                  {cv.fullName} - {new Date(cv.createdAt).toLocaleDateString()}
                </button>
              </li>
            ))}
          </ul>
        )}

        <button onClick={handleCreateNewCv} className="btn-success">
          ➕ Tạo CV mới
        </button>
      </div>
    );

  // ======================= Render CV ==============================
  const educationList =
    cvData.sections?.filter((s) => /education/i.test(s.category)) || [];
  const experienceList =
    cvData.sections?.filter((s) => /experience|work/i.test(s.category)) || [];

  return (
    <div className="cv-viewer-wrapper">
      {/* ACTIONS */}
      <div
        className="no-print"
        style={{ marginBottom: "20px", display: "flex", gap: "10px" }}
      >
        <button onClick={handlePrint} className="btn-primary">
          🖨️ Export PDF
        </button>
        <button onClick={handOpenHistory} className="btn-primary">
          💾 Resume history
        </button>
      </div>

      {/* CV CONTENT */}
      <div className="page-container" ref={componentRef}>
        <CvHeader cvData={cvData} onChange={handleInfoChange} />

        {cvData.summary && (
          <CvSummary
            summary={cvData.summary}
            onChange={(val) => handleInfoChange("summary", val)}
          />
        )}

        {cvData.skills && cvData.skills.length > 0 && (
          <CvSkills skills={cvData.skills} onSkillChange={handleSkillChange} />
        )}

        {experienceList.length > 0 && (
          <CvSection
            title="Professional Experience"
            sections={experienceList}
            onSectionChange={handleSectionChange}
            onDescriptionChange={handleDescriptionChange}
          />
        )}

        {educationList.length > 0 && (
          <CvSection
            title="Education"
            sections={educationList}
            onSectionChange={handleSectionChange}
            onDescriptionChange={handleDescriptionChange}
          />
        )}
      </div>
    </div>
  );
};

export default CvViewer;
