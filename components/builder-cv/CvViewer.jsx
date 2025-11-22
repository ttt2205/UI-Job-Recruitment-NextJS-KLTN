import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { generateCV } from '@/services/builder-cv.service';
import '../../styles/index.scss'; // File chứa harvard-cv.scss

// 1. Component Textarea tự động co giãn chiều cao (Để gõ mô tả dài)
const AutoResizeTextarea = ({ value, onChange, className, style, ...props }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height về auto trước để tính toán chính xác khi xóa bớt text
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
        // Gắn thêm _originalIndex để biết vị trí gốc của item trong mảng sections
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

  // --- CÁC HÀM XỬ LÝ CHỈNH SỬA (UPDATE STATE) ---

  // Update thông tin chung (Tên, Email, Phone...)
  const handleInfoChange = (field, value) => {
    setCvData(prev => ({ ...prev, [field]: value }));
  };

  // Update thông tin trong Sections (Công ty, Trường học...)
  const handleSectionChange = (originalIndex, field, value) => {
    setCvData(prev => {
      const newSections = [...prev.sections];
      newSections[originalIndex] = { ...newSections[originalIndex], [field]: value };
      return { ...prev, sections: newSections };
    });
  };

  // Update từng gạch đầu dòng (Description array)
  const handleDescriptionChange = (originalIndex, descIndex, value) => {
    setCvData(prev => {
      const newSections = [...prev.sections];
      // Clone mảng description để không sửa trực tiếp state
      const newDescription = [...newSections[originalIndex].description];
      newDescription[descIndex] = value;
      newSections[originalIndex].description = newDescription;
      return { ...prev, sections: newSections };
    });
  };

  // Update Skills (Array string)
  const handleSkillChange = (skillIndex, value) => {
    setCvData(prev => {
        const newSkills = [...prev.skills];
        newSkills[skillIndex] = value;
        return { ...prev, skills: newSkills };
    });
  };

  // Hàm lưu (Mock)
  const handleSave = () => {
      console.log("Data to save:", cvData);
      alert("Đã log dữ liệu mới ra Console! (Cần gọi API /save để lưu thật)");
  };

  if (!cvData) return <div style={{color: 'white', textAlign: 'center', padding: '50px'}}>Loading CV...</div>;

  // Lọc list để hiển thị
  const educationList = cvData.sections?.filter(
    s => s.category === "Educations" || s.category === "EDUCATION"
  ) || [];
  
  const experienceList = cvData.sections?.filter(
    s => s.category === "Works & Experiences" || s.category === "EXPERIENCE"
  ) || [];

  return (
    <div className="cv-viewer-wrapper">
      
      {/* Thanh công cụ */}
      <div className="no-print" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={handlePrint}
          style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🖨️ Export PDF
        </button>
        <button 
          onClick={handleSave}
          style={{ padding: '10px 20px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          💾 Lưu thay đổi
        </button>
      </div>

      {/* Trang A4 */}
      <div className="page-container" ref={componentRef}>
        
        {/* HEADER: Sửa Tên, Email, Phone, Job Title */}
        <div className="header">
          <div className="name">
             <input 
                className="cv-input" 
                style={{ textAlign: 'center', textTransform: 'uppercase' }}
                value={cvData.fullName || ''} 
                onChange={(e) => handleInfoChange('fullName', e.target.value)}
                placeholder="YOUR NAME"
             />
          </div>
          <div className="contact-info">
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                <input 
                    className="cv-input" 
                    style={{ width: 'auto', textAlign: 'right' }} 
                    value={cvData.email || ''} 
                    onChange={(e) => handleInfoChange('email', e.target.value)} 
                    placeholder="Email" 
                />
                <span className="separator">|</span>
                <input 
                    className="cv-input" 
                    style={{ width: 'auto', textAlign: 'left' }} 
                    value={cvData.phone || ''} 
                    onChange={(e) => handleInfoChange('phone', e.target.value)} 
                    placeholder="Phone" 
                />
            </div>
            <input 
                className="cv-input" 
                style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '4px' }}
                value={cvData.designation || ''} 
                onChange={(e) => handleInfoChange('designation', e.target.value)}
                placeholder="JOB TITLE"
            />
          </div>
        </div>

        {/* EDUCATION SECTION */}
        {educationList.length > 0 && (
          <div className="section-cv">
            <div className="section-title">Education</div>
            {educationList.map((edu, index) => (
              <div key={index} className="item-block">
                {/* Dòng 1: Trường | Địa điểm */}
                <div className="item-header">
                  <input 
                    className="cv-input" style={{ fontWeight: 'bold' }}
                    value={edu.organization || ''} 
                    onChange={(e) => handleSectionChange(edu._originalIndex, 'organization', e.target.value)}
                    placeholder="University Name"
                  />
                  <input 
                    className="cv-input" style={{ textAlign: 'right', width: '150px' }}
                    value="Vietnam" // Hardcode hoặc bind state location
                    onChange={() => {}} 
                  />
                </div>
                {/* Dòng 2: Ngành | Thời gian */}
                <div className="item-sub">
                  <input 
                    className="cv-input" style={{ fontStyle: 'italic' }}
                    value={edu.title || ''} 
                    onChange={(e) => handleSectionChange(edu._originalIndex, 'title', e.target.value)}
                    placeholder="Degree / Major"
                  />
                  <div style={{ display: 'flex', fontStyle: 'italic', justifyContent: 'flex-end', minWidth: '160px' }}>
                     <input 
                        className="cv-input" style={{ textAlign: 'right', width: '70px' }}
                        value={edu.startDate || ''} 
                        onChange={(e) => handleSectionChange(edu._originalIndex, 'startDate', e.target.value)}
                     />
                     <span style={{ margin: '0 2px' }}>–</span>
                     <input 
                        className="cv-input" style={{ textAlign: 'right', width: '70px' }}
                        value={edu.endDate || 'Present'} 
                        onChange={(e) => handleSectionChange(edu._originalIndex, 'endDate', e.target.value)}
                     />
                  </div>
                </div>
                {/* Bullet Points */}
                <ul className="cv-ul">
                  {edu.description && edu.description.map((desc, i) => (
                    <li key={i}>
                        <AutoResizeTextarea 
                            className="cv-textarea"
                            value={desc}
                            onChange={(e) => handleDescriptionChange(edu._originalIndex, i, e.target.value)}
                        />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* EXPERIENCE SECTION */}
        {experienceList.length > 0 && (
          <div className="section-cv">
            <div className="section-title">Professional Experience</div>
            {experienceList.map((exp, index) => (
              <div key={index} className="item-block">
                {/* Dòng 1: Công ty | Địa điểm */}
                <div className="item-header">
                  <input 
                    className="cv-input" style={{ fontWeight: 'bold' }}
                    value={exp.organization || ''} 
                    onChange={(e) => handleSectionChange(exp._originalIndex, 'organization', e.target.value)}
                    placeholder="Company Name"
                  />
                  <input 
                     className="cv-input" style={{ textAlign: 'right', width: '150px' }}
                     value="Remote/On-site" 
                     onChange={() => {}}
                  />
                </div>
                {/* Dòng 2: Chức danh | Thời gian */}
                <div className="item-sub">
                  <input 
                    className="cv-input" style={{ fontStyle: 'italic' }}
                    value={exp.title || ''} 
                    onChange={(e) => handleSectionChange(exp._originalIndex, 'title', e.target.value)}
                    placeholder="Job Title"
                  />
                   <div style={{ display: 'flex', fontStyle: 'italic', justifyContent: 'flex-end', minWidth: '160px' }}>
                     <input 
                        className="cv-input" style={{ textAlign: 'right', width: '70px' }}
                        value={exp.startDate || ''} 
                        onChange={(e) => handleSectionChange(exp._originalIndex, 'startDate', e.target.value)}
                     />
                     <span style={{ margin: '0 2px' }}>–</span>
                     <input 
                        className="cv-input" style={{ textAlign: 'right', width: '70px' }}
                        value={exp.endDate || 'Present'} 
                        onChange={(e) => handleSectionChange(exp._originalIndex, 'endDate', e.target.value)}
                     />
                  </div>
                </div>
                {/* Bullet Points */}
                <ul className="cv-ul">
                  {exp.description && exp.description.map((desc, i) => (
                    <li key={i}>
                        <AutoResizeTextarea 
                            className="cv-textarea"
                            value={desc}
                            onChange={(e) => handleDescriptionChange(exp._originalIndex, i, e.target.value)}
                        />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* SKILLS SECTION */}
        {cvData.skills && cvData.skills.length > 0 && (
          <div className="section-cv">
            <div className="section-title">Technical Skills</div>
            <div className="skills-block">
               {cvData.skills.map((skill, index) => (
                 <div key={index} style={{ marginBottom: '3px' }}>
                    <AutoResizeTextarea 
                        className="cv-textarea"
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                    />
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* SUMMARY SECTION */}
        {cvData.summary && (
          <div className="section-cv">
            <div className="section-title">Professional Summary</div>
            <AutoResizeTextarea 
                className="cv-textarea"
                style={{ textAlign: 'justify' }}
                value={cvData.summary}
                onChange={(e) => handleInfoChange('summary', e.target.value)}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default CvViewer;