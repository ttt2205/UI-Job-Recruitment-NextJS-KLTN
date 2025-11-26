"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalApp from "./Modal";
import {
  createCandidateSection,
  deleteCandidateSection,
  updateCandidateSection,
} from "@/services/candidate-about-feature.service";
import { useSelector } from "react-redux";
import { filter } from "@/data/blogs";
import { Button, Modal } from "react-bootstrap";
import {
  convertStringToDateForCandidateSection,
  formatDate,
} from "@/utils/convert-function";
import { checkDates } from "@/utils/helper-function";

/*
  form = {
    candidateId: "string",
    category: "Education",
    title: "",
    organization: "",
    startTime: "",
    endTime: "",
    text: "",
  }

  data.blockList = [
    {
      id: "string",
      candidateId: "string",
      category: "Education",
      title: "",
      organization: "",
      startTime: "",
      endTime: "",
      text: "",
    }
  ]
*/

const Education = ({ data }) => {
  const { account } = useSelector((state) => state.auth);

  // <!-------------------- State -------------------->
  const [educationList, setEducationList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [form, setForm] = useState({
    category: "Educations",
    title: "",
    organization: "",
    startTime: "",
    endTime: "",
    text: "",
  });

  // for update
  const [instanceUpdateId, setInstanceUpdateId] = useState(null);
  const [formUpdate, setFormUpdate] = useState({
    category: "Educations",
    title: "",
    organization: "",
    startTime: "",
    endTime: "",
    text: "",
  });

  // for delete
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    console.log("Educations data prop:", data?.blockList);
    if (data) {
      setEducationList(data?.blockList || []);
    }
  }, [data]);

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isModalOpen || isModalUpdateOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isModalOpen, isModalUpdateOpen]);

  // <!-------------------- Functions Handler -------------------->
  const handleAddEducation = async () => {
    try {
      // Kiểm tra dữ liệu đầu vào
      if (!checkDates(form.startTime, form.endTime)) {
        return false;
      }

      // Lọc bỏ các trường có giá trị rỗng
      const filterData = normalizeCandidateSectionData(form);

      const res = await createCandidateSection({
        candidateId: account.id,
        ...filterData,
      });

      if (!res || !res.data) {
        toast.error(res.message || "Thêm kinh nghiệm làm việc thất bại!");
        return;
      }
      toast.success("Thêm kinh nghiệm làm việc thành công!");
      const newInstance = res.data;
      console.log("New education instance:", newInstance);
      // Cập nhật danh sách kinh nghiệm với instance mới
      setEducationList([...educationList, { ...newInstance }]);
      setForm({
        category: "Educations",
        title: "",
        organization: "",
        startTime: "",
        endTime: "",
        text: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi thêm kinh nghiệm làm việc.");
      console.error("Lỗi khi thêm kinh nghiệm làm việc:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleDatePickerChange = (key, date) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: date,
    }));
  };

  const handleUpdateEducation = async (id) => {
    try {
      if (!checkDates(formUpdate.startTime, formUpdate.endTime)) {
        return false;
      }

      // Gọi API cập nhật
      const filteredData = normalizeCandidateSectionData(formUpdate);
      const res = await updateCandidateSection(id, filteredData);
      if (!res || !res.data) {
        toast.error(res.message || "Cập nhật kinh nghiệm làm việc thất bại!");
        return;
      }
      toast.success("Cập nhật kinh nghiệm làm việc thành công!");
      setIsModalUpdateOpen(false);

      // Cập nhật danh sách kinh nghiệm trong state
      const updatedData = res.data;
      const updatedList = educationList.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      );
      setEducationList(updatedList);
    } catch (error) {
      console.error("Lỗi khi cập nhật kinh nghiệm làm việc:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật kinh nghiệm làm việc.");
    }
  };

  const handleClickOpenUpdateModal = (item) => {
    setInstanceUpdateId(item.id);

    // Gọi hàm convert, kiểm tra nếu null thì gán mặc định {}
    const timeObj = convertStringToDateForCandidateSection(item.time) || {};
    let { start, end } = timeObj;

    start = start ? formatDate(start, "MM/DD/YYYY") : "";
    end = end ? formatDate(end, "MM/DD/YYYY") : "";

    const safeValue = (value) => (value && value !== "N/A" ? value : "");

    setFormUpdate({
      category: "Educations",
      title: safeValue(item.title),
      organization: safeValue(item.organization),
      startTime: safeValue(start),
      endTime: safeValue(end),
      text: safeValue(item.text),
    });

    setIsModalUpdateOpen(true);
  };

  const handleInputChangeUpdate = (e) => {
    const { name, value } = e.target;
    setFormUpdate((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleDatePickerChangeUpdate = (key, date) => {
    setFormUpdate((prevForm) => ({
      ...prevForm,
      [key]: date,
    }));
  };

  const handleDeletedEducation = async () => {
    try {
      const res = await deleteCandidateSection(selectedId);
      if (!res || res.statusCode !== 200) {
        toast.error(res.message || "Xóa kinh nghiệm làm việc thất bại!");
        return;
      }
      setShow(false);
      toast.success("Xóa kinh nghiệm làm việc thành công!");
      // Cập nhật lại danh sách kinh nghiệm trong state
      const updatedList = educationList.filter(
        (item) => item.id !== selectedId
      );
      setEducationList(updatedList);
    } catch (error) {
      console.error("Lỗi khi xóa kinh nghiệm làm việc:", error);
      toast.error("Đã xảy ra lỗi khi xóa kinh nghiệm làm việc.");
    }
  };

  const handleClickDeleted = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  // <!-------------------- Functions Helper -------------------->
  function normalizeCandidateSectionData(formUpdate) {
    // 1️⃣ Loại bỏ field rỗng, null, undefined
    const filtered = Object.fromEntries(
      Object.entries(formUpdate).filter(([_, value]) => {
        if (value === null || value === undefined) return false;
        if (typeof value === "string" && value.trim() === "") return false;
        if (Array.isArray(value) && value.length === 0) return false;
        // ❗️Nếu là object rỗng nhưng KHÔNG phải Date thì loại bỏ
        if (
          typeof value === "object" &&
          !(value instanceof Date) &&
          Object.keys(value).length === 0
        )
          return false;
        return true;
      })
    );

    // 2️⃣ Chuyển đổi định dạng ngày về ISO-8601 nếu có startTime / endTime
    if (filtered.startTime) {
      const start = new Date(filtered.startTime);
      filtered.startTime = isNaN(start) ? null : start.toISOString();
    }

    if (filtered.endTime) {
      const end = new Date(filtered.endTime);
      filtered.endTime = isNaN(end) ? null : end.toISOString();
    }

    // 3️⃣ Chuẩn hóa text (trim tránh khoảng trắng dư)
    for (const key in filtered) {
      if (typeof filtered[key] === "string") {
        filtered[key] = filtered[key].trim();
      }
    }

    return filtered;
  }

  // <!-------------------- Render UI -------------------->
  return (
    <div className="resume-outer">
      <div className="upper-title">
        <h4>Education</h4>
        <button
          className="add-info-btn"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
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
                  <h3>{item.title}</h3>
                  <span>{item.organization}</span>
                </div>
                <div className="edit-box">
                  <span className="year">{item.time}</span>
                  <div className="edit-btns">
                    <button onClick={() => handleClickOpenUpdateModal(item)}>
                      <span className="la la-pencil"></span>
                    </button>
                    <button onClick={() => handleClickDeleted(item.id)}>
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
      {/* Modal */}
      {isModalOpen && (
        <ModalApp
          label={"New Education"}
          data={form}
          onChange={handleInputChange}
          onChangeDate={handleDatePickerChange}
          onSave={handleAddEducation}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isModalUpdateOpen && (
        <ModalApp
          label={"Update Education"}
          data={formUpdate}
          onChange={handleInputChangeUpdate}
          onChangeDate={handleDatePickerChangeUpdate}
          onSave={() => handleUpdateEducation(instanceUpdateId)}
          onClose={() => setIsModalUpdateOpen(false)}
        />
      )}

      {/* Modal of bootstrap to confirm */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeletedEducation}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Education;
