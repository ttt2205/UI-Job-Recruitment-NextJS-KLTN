"use client";

import { updatePartialCompany } from "@/services/company-feature.service";
import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const FormInfoBox = ({ companyInfo, fetchCompanyInfoByUserId }) => {
  // ========================= State ==============================/
  const id = companyInfo.id;
  const userId = companyInfo.userId;
  const [submitLoading, setSubmitLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    foundedIn: "",
    size: "",
    description: "",
  });

  useEffect(() => {
    if (companyInfo?.id) {
      setProfileForm({
        name: companyInfo.name || "",
        email: companyInfo.email || "",
        phone: companyInfo.phone || "",
        foundedIn: companyInfo.foundedIn || "",
        size: companyInfo.size || "",
        description: companyInfo.description || "",
      });
    }
  }, [companyInfo]);
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

  const catOptions = [
    { value: "Banking", label: "Banking" },
    { value: "Digital & Creative", label: "Digital & Creative" },
    { value: "Retail", label: "Retail" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Managemnet", label: "Managemnet" },
    { value: "Accounting & Finance", label: "Accounting & Finance" },
    { value: "Digital", label: "Digital" },
    { value: "Creative Art", label: "Creative Art" },
  ];

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
            name="name"
            placeholder="www.invision.com"
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
          <label>Multiple Select boxes </label>
          <Select
            defaultValue={[catOptions[2]]}
            isMulti
            name="colors"
            options={catOptions}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Allow In Search & Listing</label>
          <select className="chosen-single form-select">
            <option>Yes</option>
            <option>No</option>
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
          <button className="theme-btn btn-style-one" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
