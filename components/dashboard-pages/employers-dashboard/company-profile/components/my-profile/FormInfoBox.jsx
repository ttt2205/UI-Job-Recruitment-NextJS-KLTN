"use client";

import { updatePartialCompany } from "@/services/company-feature.service";
import { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import { getIndustryOfCompanyList } from "@/services/company-feature.service";
import { normalize } from "@/utils/helper-function";

const FormInfoBox = ({ companyInfo, fetchCompanyInfoByUserId }) => {
  // ========================= State ==============================/
  const id = companyInfo.id;
  const userId = companyInfo.userId;
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    foundedIn: "",
    size: "",
    website: "",
    description: "",
    primaryIndustry: "",
    status: undefined,
  });
  const [industryOfCompanies, setIndustryOfCompanies] = useState([]);

  useEffect(() => {
    if (companyInfo?.id) {
      setProfileForm({
        name: companyInfo.name || "",
        email: companyInfo.email || "",
        phone: companyInfo.phone || "",
        foundedIn: companyInfo.foundedIn || "",
        size: companyInfo.size || "",
        website: companyInfo.website || "",
        description: companyInfo.description || "",
        primaryIndustry: companyInfo.primaryIndustry || "",
        status: companyInfo.status || false,
      });
      setSelectedOptions({
        label: companyInfo.primaryIndustry || "",
        value: companyInfo.primaryIndustry || "",
      });
    }
    fetchIndustryOfCompanies();
  }, [companyInfo]);

  // ========================= Fetch Function ==============================/
  const fetchIndustryOfCompanies = async () => {
    const res = await getIndustryOfCompanyList();
    console.log("res industry of companies: ", res.results);
    setIndustryOfCompanies(res?.results || []);
  };

  // ========================= Hanle Function ==============================/
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const data = {
      ...profileForm,
      foundedIn: parseInt(profileForm.foundedIn),
      status: profileForm.status === "true" || profileForm.status === true,
    };
    try {
      await updatePartialCompany(id, data);
      toast.success("Cập nhật thành công!");
      await fetchCompanyInfoByUserId(userId);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Lỗi cập nhật!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSelectPrimaryIndustry = async (instance) => {
    const exist = checkExistIndustryOfCompany(instance, industryOfCompanies);
    if (exist) {
      setProfileForm((prev) => ({ ...prev, primaryIndustry: exist.value }));
      setSelectedOptions(exist);
    } else {
      setProfileForm((prev) => ({ ...prev, primaryIndustry: instance.value }));
      setSelectedOptions(instance);
    }
  };

  // Helper function
  const checkExistIndustryOfCompany = (target, array) => {
    const normValue = normalize(target.value);
    const normLabel = normalize(target.label);

    return array.find(
      (item) =>
        normalize(item.value) === normValue &&
        normalize(item.label) === normLabel
    );
  };

  // const catOptions = [
  //   { value: "Banking", label: "Banking" },
  //   { value: "Digital & Creative", label: "Digital & Creative" },
  //   { value: "Retail", label: "Retail" },
  //   { value: "Human Resources", label: "Human Resources" },
  //   { value: "Managemnet", label: "Managemnet" },
  //   { value: "Accounting & Finance", label: "Accounting & Finance" },
  //   { value: "Digital", label: "Digital" },
  //   { value: "Creative Art", label: "Creative Art" },
  // ];

  // ========================= Render UI ==============================/
  return (
    <form className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Company name</label>
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
          <label>Email address</label>
          <input
            type="text"
            value={profileForm.email}
            name="email"
            onChange={handleInputChange}
            placeholder="ib-themes"
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
            placeholder="0 123 456 7890"
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website</label>
          <input
            type="text"
            value={profileForm.website}
            name="website"
            onChange={handleInputChange}
            placeholder="www.example.com"
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Est. Since</label>
          <input
            type="text"
            value={profileForm.foundedIn}
            name="foundedIn"
            onChange={handleInputChange}
            placeholder="06.04.2020"
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Team Size</label>
          <select
            className="chosen-single form-select"
            required
            value={profileForm.size}
            onChange={(e) =>
              setProfileForm((prev) => ({ ...prev, size: e.target.value }))
            }
          >
            <option>50 - 100</option>
            <option>100 - 150</option>
            <option>200 - 250</option>
            <option>300 - 350</option>
            <option>500 - 1000</option>
            <option>1000+</option>
          </select>
        </div>

        {/* <!-- Search Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Primary Industry Select</label>
          <CreatableSelect
            name="colors"
            options={industryOfCompanies}
            className="basic-multi-select"
            classNamePrefix="select"
            value={selectedOptions}
            onChange={(newValue) => handleSelectPrimaryIndustry(newValue)}
          />
        </div>

        {/* <!-- Search Select --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Multiple Select boxes </label>
          <Select
            defaultValue={[catOptions[2]]}
            isMulti
            name="colors"
            options={catOptions}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div> */}

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Operating status</label>
          <select
            className="chosen-single form-select"
            value={profileForm.status}
            onChange={(e) =>
              setProfileForm((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>About Company</label>
          <textarea
            name="description"
            value={profileForm.description}
            onChange={handleInputChange}
            placeholder="Nhập mô tả về công ty"
          />
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
