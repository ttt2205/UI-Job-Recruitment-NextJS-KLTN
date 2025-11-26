"use client";

import { useEffect, useState } from "react";
import Map from "../../../Map";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  createJob,
  getListCategory,
  getListCities,
  getListSkill,
} from "@/services/job-feature.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { formatDateToHHmm } from "@/utils/helper-function";
import { jobTypeOptions } from "@/data/job-type";

const PostBoxForm = () => {
  // ============================= Redux State ==============================/
  const { account } = useSelector((state) => state.auth);

  // ============================= State ==============================/
  const [formData, setFormData] = useState({
    title: "",
    companyId: "",
    description: "",
    jobTypes: [],
    salary: {
      min: 0,
      max: 0,
      currency: "",
      negotiable: false,
    },
    level: "",
    responsibilities: [""],
    skillAndExperiences: [""],
    experience: 0,
    workTime: {
      from: "",
      to: "",
    },
    industry: "",
    quantity: 1,
    salary: {
      min: 0,
      max: 0,
      currency: "",
      negotiable: false,
    },
    country: "",
    city: "",
    location: "",
    expirationDate: "",
    skills: [""],
    status: true,
  });

  const [workTime, setWorkTime] = useState({
    from: "",
    to: "",
  });

  // Use for Select and CreateSelect
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState({});
  const [selectCurrency, setSelectedCurrency] = useState({});

  // Select List
  const [currencies, setCurrencies] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [skillList, setSkillList] = useState([]);

  useEffect(() => {
    if (account?.id) {
      fetchCurrencies();
      fetchCountries();
      fetchCategoryList();
      fetchSkillList();
      // fetchCityList();
    }
  }, []);

  useEffect(() => {
    if (account?.id) {
      setFormData((prev) => ({
        ...prev,
        companyId: account.id,
      }));
    }
  }, [account]);

  // ============================= Fetch Functions ==============================/
  // Gọi từ API ngoài
  const fetchCurrencies = async () => {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=currencies"
    );
    const data = await res.json();

    if (!data) {
      return;
    }

    const currenciesMap = {};
    data.forEach((country) => {
      const curr = country.currencies;
      if (curr) {
        Object.entries(curr).forEach(([code, info]) => {
          if (!currenciesMap[code]) {
            currenciesMap[code] =
              info.name + (info.symbol ? ` (${info.symbol})` : "");
          }
        });
      }
    });

    const currencyOptions = Object.entries(currenciesMap).map(
      ([code, name]) => ({
        value: code,
        label: `${code} - ${name}`,
      })
    );

    if (currencyOptions) {
      setCurrencies(currencyOptions);
    }
  };

  // Gọi từ API ngoài
  const fetchCountries = async () => {
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca2"
      );
      const data = await res.json();
      const sorted = data
        .map((c) => ({
          value: c.name.common,
          label: `${c.cca2} - ${c.name.common}`,
        }))
        .sort((a, b) => a.value.localeCompare(b.value));
      setCountries(sorted);
    } catch (error) {
      console.error("Tải danh sách quốc gia không thành công!");
    }
  };

  const fetchCategoryList = async () => {
    try {
      const res = await getListCategory();
      const mapToCreateSelect = res?.results.map((item) => ({
        value: item,
        label: item,
      }));
      setCategoryList(mapToCreateSelect || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách danh mục!");
    }
  };

  const fetchSkillList = async () => {
    try {
      const res = await getListSkill();
      const mapToCreateSelect = res?.results.map((item) => ({
        value: item,
        label: item,
      }));
      setSkillList(mapToCreateSelect || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách kỹ năng!");
    }
  };

  const fetchCityList = async () => {
    try {
      const res = await getListCities();
      const mapToCreateSelect = res?.results.map((item) => ({
        value: item,
        label: item,
      }));
      setCities(mapToCreateSelect || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thành phố!");
    }
  };

  // ============================= Handle Functions ==============================/
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiSelectJobTypeChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      ["jobTypes"]: Array.isArray(selectedOptions)
        ? selectedOptions.map((item) => item.value.type)
        : selectedOptions
        ? [selectedOptions.value.type] // trường hợp chọn 1 item
        : [],
    }));
    setSelectedJobTypes(selectedOptions);
  };

  const handleMultiSelectSkillChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      ["skills"]: Array.isArray(selectedOptions)
        ? selectedOptions.map((item) => item.value)
        : selectedOptions
        ? [selectedOptions.value] // trường hợp chọn 1 item
        : [],
    }));
    setSelectedSkills(selectedOptions);
  };

  const handleSelectIndustryChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      ["industry"]: selectedOptions?.value || "",
    }));
    setSelectedIndustry(selectedOptions);
  };

  const handleCurrencyChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        currency: selectedOptions.value || "",
      },
    }));
    setSelectedCurrency(selectedOptions);
  };

  const handleCountryChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      country: selectedOptions.value || "",
    }));
  };

  const handleCityChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      city: selectedOptions.value || "",
    }));
  };

  const handleDeadlineDateChange = (value) => {
    const today = new Date();
    // Xóa giờ phút giây để so sánh chỉ theo ngày
    today.setHours(0, 0, 0, 0);

    if (value && value > today) {
      setFormData((prev) => ({
        ...prev,
        expirationDate: value,
      }));
    } else {
      toast.error("Ngày hết hạn phải lớn hơn ngày hiện tại.");
    }
  };

  const handleAddField = (key) => {
    setFormData((prev) => ({
      ...prev,
      [key]: [...prev[key], ""],
    }));
  };

  const handleChange = (index, value, key) => {
    const newLines = [...formData[key]];
    newLines[index] = value;
    setFormData((prev) => ({
      ...prev,
      [key]: newLines,
    }));
  };

  const handleRemove = (index, key) => {
    const newLines = formData[key].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [key]: newLines,
    }));
  };

  const handleWorkTimeChange = (fromTime, toTime) => {
    setWorkTime({
      from: fromTime,
      to: toTime,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!account.id) {
        toast.error(
          "Không thể tạo công việc do không tìm thấy tài khoản đăng tuyển!"
        );
        return;
      }

      const data = {
        ...formData,
        workTime: {
          from: formatDateToHHmm(workTime.from),
          to: formatDateToHHmm(workTime.to),
        },
      };

      const res = await createJob(data);
      if (res) {
        toast.success(res?.message || "Tạo công việc thành công!");
        setFormData({
          title: "",
          companyId: account.id || "",
          description: "",
          jobTypes: [""],
          salary: {
            min: 0,
            max: 0,
            currency: "",
            negotiable: false,
          },
          level: "",
          responsibilities: [""],
          skillAndExperiences: [""],
          experience: 0,
          workTime: {
            from: "",
            to: "",
          },
          industry: "",
          quantity: 1,
          country: "",
          salary: {
            min: 0,
            max: 0,
            currency: "",
            negotiable: false,
          },
          city: "",
          location: "",
          expirationDate: "",
          skills: [""],
          status: true,
        });

        setSelectedIndustry({});
        setSelectedJobTypes([]);
        setSelectedSkills([]);
        setWorkTime({ from: "", to: "" });
        setSelectedCurrency({});
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Có lỗi xảy ra khi đăng tuyển công việc mới!";

      // Nếu message là array (do ValidationPipe)
      if (Array.isArray(message)) {
        toast.error(message[0]);
      } else {
        toast.error(message); // hiện 1 lỗi
      }
    }
  };

  // ============================= Render UI ==============================/
  return (
    <form className="default-form" onSubmit={(e) => e.preventDefault()}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            value={formData?.title || ""}
            onChange={handleInputChange}
            placeholder="Title"
          />
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Description</label>
          <textarea
            name="description"
            onChange={handleInputChange}
            value={formData?.description || ""}
            placeholder="Examle: Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"
          ></textarea>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Job Types</label>
          <Select
            isMulti
            name="jobTypes"
            value={selectedJobTypes}
            options={jobTypeOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleMultiSelectJobTypeChange}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Career Level</label>
          <select
            className="chosen-single form-select"
            name="level"
            value={formData?.level || ""}
            onChange={handleInputChange}
          >
            <option value="">Choose candidate's education level</option>
            <option value={"Đại học"}>Đại học</option>
            <option value={"Cao đẳng"}>Cao đẳng</option>
            <option value={"Khác"}>Khác</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Years of experience</label>
          <select
            className="chosen-single form-select"
            name="experience"
            value={formData?.experience || ""}
            onChange={handleInputChange}
          >
            <option value="">Chọn số năm</option>
            <option value="0">Chưa có kinh nghiệm</option>
            <option value="1">1 năm</option>
            <option value="2">2 năm</option>
            <option value="3">3 năm</option>
            <option value="4">4 năm</option>
            <option value="5">5 năm</option>
            <option value="6">6 năm</option>
            <option value="7">7 năm</option>
            <option value="8">8 năm</option>
            <option value="9">9 năm</option>
            <option value="10">10+ năm</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Industry</label>
          <CreatableSelect
            name="industry"
            options={categoryList}
            value={selectedIndustry}
            classNamePrefix="select"
            isClearable
            onChange={handleSelectIndustryChange}
            placeholder="Select or type to add..."
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Skills</label>
          <CreatableSelect
            isMulti
            name="skills"
            value={selectedSkills}
            options={skillList}
            classNamePrefix="select"
            onChange={handleMultiSelectSkillChange}
            placeholder="Select or type to add..."
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Application Deadline Date</label>
          <div className="row">
            {/* Ngày hết hạn */}
            <div className="col-12 mb-3">
              <DatePicker
                selected={formData.expirationDate}
                onChange={(date) => handleDeadlineDateChange(date)}
                className="form-control"
                dateFormat="dd.MM.yyyy"
                placeholderText="Chọn ngày"
              />
            </div>
          </div>
        </div>

        {/* Thời gian làm việc */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Work Time</label>
          <div className="row">
            <div className="col-6">
              <DatePicker
                selected={workTime.from}
                onChange={(time) => handleWorkTimeChange(time, workTime.to)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Start Time"
                dateFormat="HH:mm"
                className="form-control"
                placeholderText="Giờ bắt đầu"
              />
            </div>
            <div className="col-6">
              <DatePicker
                selected={workTime.to}
                onChange={(time) => handleWorkTimeChange(workTime.from, time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="End Time"
                dateFormat="HH:mm"
                className="form-control"
                placeholderText="Giờ kết thúc"
              />
            </div>
          </div>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Offered Salary</label>

          {/* Khoảng lương */}
          <div className="row">
            <div className="col-6">
              <input
                type="number"
                name="salaryMin"
                className="form-control"
                placeholder="Min Salary"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    salary: {
                      ...prev.salary,
                      min: parseInt(e.target.value) || 0,
                    },
                  }))
                }
              />
            </div>
            <div className="col-6">
              <input
                type="number"
                name="salaryMax"
                className="form-control"
                placeholder="Max Salary"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    salary: {
                      ...prev.salary,
                      max: parseInt(e.target.value) || 0,
                    },
                  }))
                }
              />
            </div>
          </div>

          {/* Loại tiền */}
          <div className="mt-2">
            <CreatableSelect
              name="salaryCurrency"
              value={selectCurrency}
              options={currencies}
              classNamePrefix="select"
              onChange={handleCurrencyChange}
              placeholder="Select currency or type to add..."
            />
          </div>

          {/* Có thương lượng hay không */}
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="negotiable"
              checked={formData.salary.negotiable}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  salary: {
                    ...prev.salary,
                    negotiable: e.target.checked,
                  },
                }))
              }
            />
            <label className="form-check-label" htmlFor="negotiable">
              Negotiable
            </label>
          </div>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Country</label>
          <div className="row">
            <div className="col-6">
              <Select
                name="country"
                options={countries}
                classNamePrefix="select"
                onChange={handleCountryChange}
                placeholder="Select country or type to add..."
              />
            </div>
            <div className="col-6">
              {/* <CreatableSelect
                name="city"
                options={cities}
                classNamePrefix="select"
                onChange={handleCityChange}
                placeholder="Select city or type to add..."
              /> */}
              <input
                type="text"
                name="city"
                value={formData?.city || ""}
                placeholder="Enter your city"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="location"
            value={formData?.location || ""}
            onChange={handleInputChange}
            placeholder="Example: 329 Queensberry Street, North Melbourne VIC 3051, Australia."
          />
        </div>

        {/* Skill and Experience */}
        <div className="form-group col-12">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="mb-0" style={{ fontWeight: 500 }}>
              Skill and Experience
            </label>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleAddField("skillAndExperiences")}
            >
              + Thêm dòng mới
            </button>
          </div>

          {/* Khung chứa các textbox */}
          <div className="border p-3 rounded" style={{ background: "#f8f9fa" }}>
            {formData.skillAndExperiences.map((item, index) => (
              <div className="d-flex align-items-center mb-2" key={index}>
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder={`Nhập kỹ năng / kinh nghiệm #${index + 1}`}
                  value={item}
                  onChange={(e) =>
                    handleChange(index, e.target.value, "skillAndExperiences")
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddField("skillAndExperiences");
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemove(index, "skillAndExperiences")}
                  title="Xóa dòng này"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Responsibility */}
        <div className="form-group col-12">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="mb-0" style={{ fontWeight: 500 }}>
              Responsibilities
            </label>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleAddField("responsibilities")}
            >
              + Thêm dòng mới
            </button>
          </div>

          {/* Khung chứa các textbox */}
          <div className="border p-3 rounded" style={{ background: "#f8f9fa" }}>
            {formData.responsibilities.map((item, index) => (
              <div className="d-flex align-items-center mb-2" key={index}>
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder={`Nhập kỹ năng / kinh nghiệm #${index + 1}`}
                  value={item}
                  onChange={(e) =>
                    handleChange(index, e.target.value, "responsibilities")
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddField("responsibilities");
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemove(index, "responsibilities")}
                  title="Xóa dòng này"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Find On Map</label>
          <input
            type="text"
            name="name"
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
          />
        </div> */}

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-3 col-md-12">
          <label>Latitude</label>
          <input type="text" name="name" placeholder="Melbourne" />
        </div> */}

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-3 col-md-12">
          <label>Longitude</label>
          <input type="text" name="name" placeholder="Melbourne" />
        </div> */}

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-12 col-md-12">
          <button className="theme-btn btn-style-three">Search Location</button>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <div className="map-outer">
            <div style={{ height: "420px", width: "100%" }}>
              <Map />
            </div>
          </div>
        </div> */}

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button
            type="button"
            className="theme-btn btn-style-one"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
