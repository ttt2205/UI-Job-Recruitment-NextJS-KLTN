"use client";

import {
  getIndustryOfCandidateList,
  getListSkill,
} from "@/services/candidate-feature.service";
import { useEffect, useState } from "react";
import Select from "react-select";
import SalaryInput from "../SalaryInput";
import CreatableSelect from "react-select/creatable";
import { updateInfo } from "@/services/candidate-feature.service";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const FormInfoBox = ({ candidateInfo, fetchCandidateInfo }) => {
  // ========================= State ==============================/
  const id = candidateInfo.id;
  const userId = candidateInfo.userId;
  const [email, setEmail] = useState(candidateInfo.email || "");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    industry: "",
    designation: "",
    hourlyRate: "",
    description: "",
    experience: 0,
    currentSalary: "",
    expectSalary: "",
    gender: "",
    educationLevel: "",
    skills: [],
    language: [],
    status: undefined,
  });

  // <------------------------ Data from API -----------------------------/
  const [industryList, setIndustryList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [skillList, setSkillList] = useState([]);

  // <------------------------ Data of Select -----------------------------/
  const [industry, setIndustry] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);

  // ========================= Use Effect ==============================/
  useEffect(() => {
    if (candidateInfo?.id) {
      setProfileForm({
        name: candidateInfo.name || "",
        phone: candidateInfo.phone || "",
        birthday: formatDate(candidateInfo.birthday) || "",
        industry: candidateInfo.industry || "",
        designation: candidateInfo.designation || "",
        hourlyRate: candidateInfo.hourlyRate || "",
        description: candidateInfo.description || "",
        experience: candidateInfo.experience || 0,
        currentSalary: candidateInfo.currentSalary || "",
        expectSalary: candidateInfo.expectSalary || "",
        gender: candidateInfo.gender || "",
        educationLevel: candidateInfo.educationLevel || "",
        skills: candidateInfo.skills || [],
        language: candidateInfo.language || [],
        status: candidateInfo.status || false,
      });
      setIndustry({
        label: candidateInfo.industry || "",
        value: candidateInfo.industry || "",
      });
      updateIfArrayNotEmpty(candidateInfo?.language, setLanguages);
      updateIfArrayNotEmpty(candidateInfo?.skills, setSkills);
    }
    fetchIndustryOfCandidate();
    fetchLanguages();
    fetchSkillList();
  }, [candidateInfo]);

  // ========================= Fetch Function ==============================/
  const fetchIndustryOfCandidate = async () => {
    const res = await getIndustryOfCandidateList();
    console.log("res industry of candidates: ", res.results);
    setIndustryList(res?.results || []);
  };

  const fetchLanguages = async () => {
    try {
      // Gọi API lấy thông tin các quốc gia
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=languages"
      );
      const countries = await res.json();

      // Lấy tất cả các ngôn ngữ từ từng quốc gia
      const allLanguages = countries.flatMap((country) =>
        country.languages ? Object.values(country.languages) : []
      );

      // Lọc trùng lặp
      const uniqueLanguages = [...new Set(allLanguages)];

      // Chuyển đổi thành định dạng phù hợp cho react-select
      const transformedLanguages = transformedToLabelAndValue(uniqueLanguages);

      setLanguageList(transformedLanguages);
    } catch (error) {
      console.error("Lỗi khi lấy ngôn ngữ:", error);
      return [];
    }
  };

  const fetchSkillList = async () => {
    try {
      const res = await getListSkill();
      const mapToCreateSelect = transformedToLabelAndValue(res?.results);
      setSkillList(mapToCreateSelect || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách kỹ năng!");
    }
  };

  // ========================= Hanle Function ==============================/
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChangeEmail = (e) => {
    const { name, value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const data = { ...profileForm };
    console.log("data before submit: ", data);
    try {
      const res = await updateInfo(id, data);
      if (res?.success) {
        toast.success("Cập nhật thành công!");
      } else {
        toast.error(res?.message || "Cập nhật thất bại!");
        return;
      }
      await fetchCandidateInfo(userId);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Lỗi cập nhật!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCurrentSalaryInputChange = (value) => {
    setProfileForm((prev) => ({ ...prev, currentSalary: value }));
  };

  const handleExpectSalaryInputChange = (value) => {
    setProfileForm((prev) => ({ ...prev, expectSalary: value }));
  };

  const handleExperienceInputChange = (e) => {
    const value = filterDigits(e);
    setProfileForm((prev) => ({ ...prev, experience: value }));
  };

  const handleMultiSelectChange = (selectedOptions, key) => {
    setProfileForm((prev) => ({
      ...prev,
      [key]: Array.isArray(selectedOptions)
        ? selectedOptions.map((item) => item.value)
        : selectedOptions
        ? [selectedOptions.value] // trường hợp chọn 1 item
        : [],
    }));
    if (key === "language") {
      setLanguages(selectedOptions);
    } else if (key === "skills") {
      setSkills(selectedOptions);
    }
  };

  const handleIndustrySelectChange = (instance) => {
    setProfileForm((prev) => ({
      ...prev,
      industry: instance.value,
    }));
    setIndustry(instance);
  };

  // Helper function
  const filterDigits = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // bỏ ký tự không phải số
    return value;
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format("YYYY-MM-DD");
  };

  const transformedToLabelAndValue = (array) => {
    const results = array.map((item) => ({
      value: item,
      label: item,
    }));
    return results;
  };

  const updateIfArrayNotEmpty = (data, setter) => {
    console.log("Data to update select: ", data);
    if (Array.isArray(data) && data.length > 0) {
      const transformed = transformedToLabelAndValue(data);
      console.log("Transformed data: ", transformed);
      setter(transformed);
    }
  };

  // ========================= Render UI ==============================/
  return (
    <form action="#" className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email address</label>
          <input
            type="text"
            value={email}
            name="email"
            onChange={handleInputChangeEmail}
            placeholder="abc@gmail.com"
            disabled
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Full Name</label>
          <input
            type="text"
            value={profileForm.name}
            name="name"
            onChange={handleInputChange}
            placeholder="Invisionn"
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Birthday</label>
          <input
            type="date"
            className="form-control"
            value={profileForm.birthday}
            name="birthday"
            onChange={handleInputChange}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Phone</label>
          <input
            type="text"
            value={profileForm.phone}
            name="phone"
            onChange={handleInputChange}
            placeholder="0123 456 789"
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Industry</label>
          <CreatableSelect
            name="industry"
            options={[]}
            className="basic-multi-select"
            classNamePrefix="select"
            value={industry}
            onChange={(newValue) => handleIndustrySelectChange(newValue)}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Designation</label>
          <input
            type="text"
            value={profileForm.designation}
            name="designation"
            onChange={handleInputChange}
            placeholder="Invisionn"
            required
          />
        </div>

        {/* <!-- Input --> */}
        <SalaryInput
          label={"Current Salary"}
          value={profileForm.currentSalary}
          onChange={handleCurrentSalaryInputChange}
        />

        {/* <!-- Input --> */}
        <SalaryInput
          label={"Expect Salary"}
          value={profileForm.expectSalary}
          onChange={handleExpectSalaryInputChange}
        />

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <select
            name="gender"
            value={profileForm.gender}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <input
            type="number"
            name="experience"
            value={profileForm.experience}
            placeholder="Enter number of years"
            onChange={handleExperienceInputChange}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website</label>
          <input
            type="text"
            name="name"
            placeholder="www.jerome.com"
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Education Levels</label>
          <select
            className="chosen-single form-select"
            name="educationLevel"
            value={profileForm.educationLevel}
            onChange={handleInputChange}
          >
            <option value="">Choose your education level</option>
            <option value={"Đại học"}>Đại học</option>
            <option value={"Cao đẳng"}>Cao đẳng</option>
            <option value={"Khác"}>Khác</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Languages</label>
          <CreatableSelect
            isMulti
            name="language"
            options={languageList}
            value={languages}
            classNamePrefix="select"
            onChange={(selectedOptions) => {
              handleMultiSelectChange(selectedOptions, "language");
            }}
            placeholder="Select or type to add..."
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Skills</label>
          <CreatableSelect
            isMulti
            name="skills"
            options={skillList}
            value={skills}
            classNamePrefix="select"
            onChange={(selectedOptions) => {
              handleMultiSelectChange(selectedOptions, "skills");
            }}
            placeholder="Select or type to add..."
          />
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea
            name="description"
            value={profileForm.description}
            onChange={handleInputChange}
            placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"
          ></textarea>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          {submitLoading ? (
            <p>Loading...</p> // hoặc spinner
          ) : (
            <button className="theme-btn btn-style-one" onClick={handleSubmit}>
              Save
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
