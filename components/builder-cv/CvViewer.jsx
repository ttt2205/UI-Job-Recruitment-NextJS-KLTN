import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { generateCV } from '@/services/builder-cv.service';
import '../../styles/index.scss'; // File chứa harvard-cv.scss

// 1. Component Textarea tự động co giãn chiều cao
const AutoResizeTextarea = ({ value, onChange, className, style, ...props }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value || ''}
      onChange={onChange}
      className={className}
      style={style}
      rows={1}
      {...props}
    />
  );
};

const CvViewer = () => {
  const componentRef = useRef();
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    const fetchCvData = async () => {
      try {
        const res = await generateCV({});
        if (res.sections) {
            res.sections = res.sections.map((sec, idx) => ({ ...sec, _originalIndex: idx }));
        }
        setCvData(res);
      } catch (err) {
        console.error("Error fetching CV data:", err);
      }
    };
    fetchCvData();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `CV_${cvData?.fullName || 'Candidate'}`,
  });

  // --- CÁC HÀM XỬ LÝ CHỈNH SỬA ---

  const handleInfoChange = (field, value) => {
    setCvData(prev => ({ ...prev, [field]: value }));
  };

  const handleSectionChange = (originalIndex, field, value) => {
    setCvData(prev => {
      const newSections = [...prev.sections];
      newSections[originalIndex] = { ...newSections[originalIndex], [field]: value };
      return { ...prev, sections: newSections };
    });
  };

  const handleDescriptionChange = (originalIndex, descIndex, value) => {
    setCvData(prev => {
      const newSections = [...prev.sections];
      const newDescription = [...newSections[originalIndex].description];
      newDescription[descIndex] = value;
      newSections[originalIndex].description = newDescription;
      return { ...prev, sections: newSections };
    });
  };

  const handleSkillChange = (skillIndex, value) => {
    setCvData(prev => {
        const newSkills = [...prev.skills];
        newSkills[skillIndex] = value;
        return { ...prev, skills: newSkills };
    });
  };

  const handleSave = () => {
      console.log("Data to save:", cvData);
      alert("Đã log dữ liệu mới ra Console!");
  };

  // Helper: Render Skill Item với logic tách dấu hai chấm để in đậm
  const renderSkillItem = (skill, index) => {
    const separatorIndex = skill.indexOf(':');
    
    // Trường hợp 1: Không có dấu hai chấm -> Render bình thường
    if (separatorIndex === -1) {
      return (
        <li key={index}>
           <AutoResizeTextarea 
              className="cv-textarea"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
           />
        </li>
      );
    }

    // Trường hợp 2: Có dấu hai chấm -> Tách làm 2 input
    const label = skill.substring(0, separatorIndex);
    const content = skill.substring(separatorIndex + 1);

    return (
      <li key={index}>
        <div className="skill-row">
           {/* Phần Label: In đậm */}
           <div className="skill-label-wrapper">
             <AutoResizeTextarea 
                className="cv-textarea"
                style={{ fontWeight: '' , width: '150px' }}
                value={label}
                onChange={(e) => handleSkillChange(index, `${e.target.value}:${content}`)}
             />
             <span style={{ fontWeight: 'bold', marginRight: '4px' }}>:</span>
           </div>
           
           {/* Phần Content: Bình thường */}
           <div className="skill-content-wrapper">
             <AutoResizeTextarea 
                className="cv-textarea"
                value={content}
                onChange={(e) => handleSkillChange(index, `${label}:${e.target.value}`)}
             />
           </div>
        </div>
      </li>
    );
  };

  if (!cvData) return <div style={{color: 'white', textAlign: 'center', padding: '50px'}}>Loading CV...</div>;

  const educationList = cvData.sections?.filter(s => s.category === "Educations" || s.category === "EDUCATION") || [];
  const experienceList = cvData.sections?.filter(s => s.category === "Works & Experiences" || s.category === "EXPERIENCE") || [];

  return (
    <div className="cv-viewer-wrapper">
      
      <div className="no-print" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={handlePrint} style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>🖨️ Export PDF</button>
        <button onClick={handleSave} style={{ padding: '10px 20px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>💾 Lưu thay đổi</button>
      </div>

      <div className="page-container" ref={componentRef}>
        
        {/* HEADER */}
        <div className="header">
          <div className="name">
             <input 
                className="cv-input" style={{ textAlign: 'center', textTransform: 'uppercase' }}
                value={cvData.fullName || ''} onChange={(e) => handleInfoChange('fullName', e.target.value)}
                placeholder="YOUR NAME"
             />
          </div>
          <div className="contact-info">
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                <input className="cv-input" style={{ width: 'auto', textAlign: 'right' }} value={cvData.email || ''} onChange={(e) => handleInfoChange('email', e.target.value)} placeholder="Email" />
                <span className="separator">|</span>
                <input className="cv-input" style={{ width: 'auto', textAlign: 'center' }} value={cvData.phone || ''} onChange={(e) => handleInfoChange('phone', e.target.value)} placeholder="Phone" />
                <span className="separator">|</span>
                <input className="cv-input" style={{ width: 'auto', textAlign: 'left' }} value={cvData.city || ''} onChange={(e) => handleInfoChange('address', e.target.value)} placeholder="Address" />
            </div>
            <input className="cv-input" style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '4px' }} value={cvData.designation || ''} onChange={(e) => handleInfoChange('designation', e.target.value)} placeholder="JOB TITLE"/>
          </div>
        </div>

        {/* EDUCATION */}
        {educationList.length > 0 && (
          <div className="section-cv">
            <div className="section-title">Education</div>
            {educationList.map((edu, index) => (
              <div key={index} className="item-block">
                <div className="item-header">
                  <input className="cv-input" style={{ fontWeight: 'bold' }} value={edu.organization || ''} onChange={(e) => handleSectionChange(edu._originalIndex, 'organization', e.target.value)} placeholder="University Name"/>
                  <input className="cv-input" style={{ textAlign: 'right', width: '150px' }} value="Vietnam" onChange={() => {}} />
                </div>
                <div className="item-sub">
                  <input className="cv-input" style={{ fontStyle: 'italic' }} value={edu.title || ''} onChange={(e) => handleSectionChange(edu._originalIndex, 'title', e.target.value)} placeholder="Degree / Major"/>
                  <div style={{ display: 'flex', fontStyle: 'italic', justifyContent: 'flex-end', minWidth: '160px' }}>
                     <input className="cv-input" style={{ textAlign: 'right', width: '70px' }} value={edu.startDate || ''} onChange={(e) => handleSectionChange(edu._originalIndex, 'startDate', e.target.value)} />
                     <span style={{ margin: '0 2px' }}>–</span>
                     <input className="cv-input" style={{ textAlign: 'right', width: '70px' }} value={edu.endDate || 'Present'} onChange={(e) => handleSectionChange(edu._originalIndex, 'endDate', e.target.value)} />
                  </div>
                </div>
                <ul className="cv-ul">
                  {edu.description && edu.description.map((desc, i) => (
                    <li key={i}>
                        <AutoResizeTextarea className="cv-textarea" value={desc} onChange={(e) => handleDescriptionChange(edu._originalIndex, i, e.target.value)} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* EXPERIENCE */}
        {experienceList.length > 0 && (
          <div className="section-cv">
            <div className="section-title">Professional Experience</div>
            {experienceList.map((exp, index) => (
              <div key={index} className="item-block">
                <div className="item-header">
                  <input className="cv-input" style={{ fontWeight: 'bold' }} value={exp.organization || ''} onChange={(e) => handleSectionChange(exp._originalIndex, 'organization', e.target.value)} placeholder="Company Name"/>
                  <input className="cv-input" style={{ textAlign: 'right', width: '150px' }} value="Remote/On-site" onChange={() => {}}/>
                </div>
                <div className="item-sub">
                  <input className="cv-input" style={{ fontStyle: 'italic' }} value={exp.title || ''} onChange={(e) => handleSectionChange(exp._originalIndex, 'title', e.target.value)} placeholder="Job Title"/>
                   <div style={{ display: 'flex', fontStyle: 'italic', justifyContent: 'flex-end', minWidth: '160px' }}>
                     <input className="cv-input" style={{ textAlign: 'right', width: '70px' }} value={exp.startDate || ''} onChange={(e) => handleSectionChange(exp._originalIndex, 'startDate', e.target.value)} />
                     <span style={{ margin: '0 2px' }}>–</span>
                     <input className="cv-input" style={{ textAlign: 'right', width: '70px' }} value={exp.endDate || 'Present'} onChange={(e) => handleSectionChange(exp._originalIndex, 'endDate', e.target.value)} />
                  </div>
                </div>
                <ul className="cv-ul">
                  {exp.description && exp.description.map((desc, i) => (
                    <li key={i}>
                        <AutoResizeTextarea className="cv-textarea" value={desc} onChange={(e) => handleDescriptionChange(exp._originalIndex, i, e.target.value)} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* SKILLS SECTION - Đã sửa đổi */}
        {cvData.skills && cvData.skills.length > 0 && (
          <div className="section-cv">
            <div className="section-title">Technical Skills</div>
            {/* Sử dụng ul class cv-ul để có dấu chấm tròn */}
            <ul className="cv-ul">
               {cvData.skills.map((skill, index) => renderSkillItem(skill, index))}
            </ul>
          </div>
        )}

        {/* SUMMARY */}
        {cvData.summary && (
          <div className="section-cv">
            <div className="section-title">Professional Summary</div>
            <AutoResizeTextarea 
                className="cv-textarea" style={{ textAlign: 'justify' }}
                value={cvData.summary} onChange={(e) => handleInfoChange('summary', e.target.value)}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default CvViewer;