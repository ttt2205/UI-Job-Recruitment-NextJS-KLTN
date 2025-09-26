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

/*
  form = {
    candidateId: "string",
    title: "Work & Experience",
    industry: "string",
    business: "string",
    startTime: Date,
    endTime: Date,
    text: "string",
  }
*/

const Experiences = ({ data }) => {
  const { account } = useSelector((state) => state.auth);

  // <!-------------------- State -------------------->
  const [experienceList, setExperienceList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [form, setForm] = useState({
    title: "Work & Experience",
    industry: "",
    business: "",
    startTime: "",
    endTime: "",
    text: "",
  });

  const [instanceUpdateId, setInstanceUpdateId] = useState(null);
  const [formUpdate, setFormUpdate] = useState({
    title: "Work & Experience",
    industry: "",
    business: "",
    startTime: "",
    endTime: "",
    text: "",
  });

  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    console.log("Experience data prop:", data?.blockList);
    if (data) {
      setExperienceList(data?.blockList || []);
    }
  }, [data]);

  // <!-------------------- Functions Handler -------------------->
  const handleAddExperience = async () => {
    try {
      // Kiểm tra dữ liệu đầu vào
      if (!checkDates(form.startTime, form.endTime)) {
        return false;
      }

      // Lọc bỏ các trường có giá trị rỗng
      const filterData = filterEmptyFields(form);

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
      console.log("New experience instance:", newInstance);
      // Cập nhật danh sách kinh nghiệm với instance mới
      setExperienceList([...experienceList, { ...newInstance }]);
      setForm({
        title: "Work & Experience",
        industry: "",
        business: "",
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

  const handleUpdateExperience = async (id) => {
    try {
      if (!checkDates(formUpdate.startTime, formUpdate.endTime)) {
        return false;
      }

      // Gọi API cập nhật
      const filteredData = filterEmptyFields(formUpdate);
      const res = await updateCandidateSection(id, filteredData);
      if (!res || !res.data) {
        toast.error(res.message || "Cập nhật kinh nghiệm làm việc thất bại!");
        return;
      }
      toast.success("Cập nhật kinh nghiệm làm việc thành công!");
      setIsModalUpdateOpen(false);

      // Cập nhật danh sách kinh nghiệm trong state
      const updatedData = res.data;
      const updatedList = experienceList.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      );
      setExperienceList(updatedList);
    } catch (error) {
      console.error("Lỗi khi cập nhật kinh nghiệm làm việc:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật kinh nghiệm làm việc.");
    }
  };

  const handleClickOpenUpdateModal = (item) => {
    setInstanceUpdateId(item.id);
    setFormUpdate({
      title: "Work & Experience",
      industry: item.industry || "",
      business: item.business || "",
      startTime: item.startTime || "",
      endTime: item.endTime || "",
      text: item.text || "",
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

  const handleDeletedExperience = async () => {
    try {
      const res = await deleteCandidateSection(selectedId);
      if (!res || !res.data) {
        toast.error(res.message || "Xóa kinh nghiệm làm việc thất bại!");
        return;
      }
      setShow(false);
      toast.success("Xóa kinh nghiệm làm việc thành công!");
      // Cập nhật lại danh sách kinh nghiệm trong state
      const updatedList = experienceList.filter(
        (item) => item.id !== selectedId
      );
      setExperienceList(updatedList);
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
  const filterEmptyFields = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => value !== "")
    );
  };

  const checkDates = (start, end) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset về đầu ngày

    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    if (startDate && startDate > today) {
      toast.error("Ngày bắt đầu không được sau ngày hiện tại.");
      return false;
    }

    if (startDate && endDate && startDate > endDate) {
      toast.error("Ngày bắt đầu không được sau ngày kết thúc.");
      return false;
    }

    if (endDate && endDate > today) {
      toast.error("Ngày kết thúc không được sau ngày hiện tại.");
      return false;
    }

    return true;
  };

  // <!-------------------- Render UI -------------------->
  return (
    <div className="resume-outer theme-blue">
      <div className="upper-title">
        <h4>Work & Experience</h4>
        <button
          className="add-info-btn"
          onClick={() => {
            setIsModalOpen(true);
            console.log("Add Work button clicked");
          }}
        >
          <span className="icon flaticon-plus"></span> Add Work
        </button>
      </div>

      {/* <!-- Resume BLock --> */}
      {experienceList && experienceList.length > 0 ? (
        experienceList.map((item, index) => (
          <div className="resume-block">
            <div className="inner">
              <span className="name">{item.meta}</span>
              <div className="title-box">
                <div className="info-box">
                  <h3>{item.industry}</h3>
                  <span>{item.business}</span>
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
        <p>No experience data available. Please add your work experience.</p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <ModalApp
          label={"Work & Experience"}
          data={form}
          onChange={handleInputChange}
          onChangeDate={handleDatePickerChange}
          onSave={handleAddExperience}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isModalUpdateOpen && (
        <ModalApp
          label={"Update Work & Experience"}
          data={formUpdate}
          onChange={handleInputChangeUpdate}
          onChangeDate={handleDatePickerChangeUpdate}
          onSave={() => handleUpdateExperience(instanceUpdateId)}
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
          <Button variant="danger" onClick={handleDeletedExperience}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Experiences;
