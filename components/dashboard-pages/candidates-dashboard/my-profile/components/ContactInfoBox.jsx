"use client";

import { useEffect, useState } from "react";
import Map from "../../../Map";
import { toast } from "react-toastify";
import { updatePartialInfo } from "@/services/candidate-feature.service";

const ContactInfoBox = ({ data }) => {
  // ============================= State ============================/
  const [candidateId, setCandidateId] = useState("");
  const [contactInfo, setContactInfo] = useState({
    country: "",
    city: "",
    location: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  // ============================= Data from API ============================/
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (data?.id) {
      setContactInfo({
        country: data?.country || "",
        city: data?.city || "",
        location: data?.location || "",
      });
      setCandidateId(data.id);
    }
    fetchCountries();
  }, [data]);

  // ============================= Fetch Functions ============================/
  const fetchCountries = async () => {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2"
    );
    const data = await res.json();
    const sorted = data
      .map((c) => ({ name: c.name.common, code: c.cca2 }))
      .sort((a, b) => a.name.localeCompare(b.name));
    setCountries(sorted);
  };

  // ============================= Handle Functions ============================/
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      setContactInfo((prev) => ({
        ...prev,
        country: value,
        city: "", // Reset thành phố khi đổi quốc gia
      }));
    } else {
      setContactInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!candidateId) {
        toast.error("Không thể cập nhật do không tìm thấy ứng viên!");
        return;
      }
      setSubmitLoading(true);
      await updatePartialInfo(candidateId, contactInfo);
      setSubmitLoading(false);
      toast.success("Cập nhật thông tin địa chỉ ứng viên thành công!");
    } catch (error) {
      console.error("Lỗi cập nhật thông tin địa chỉ ứng viên: ", error);
      toast.error("Cập nhật thông tin địa chỉ ứng viên không thành công!");
    }
  };

  // ============================= Render UI ============================/
  return (
    <form className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <select
            className="form-select"
            name="country"
            value={contactInfo.country}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select country --</option>
            {countries.map((item) => (
              <option key={item.code} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={contactInfo.city}
            onChange={handleInputChange}
            placeholder="Enter city"
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="location"
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
            value={contactInfo.location}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Find On Map</label>
          <input
            type="text"
            name="name"
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
            required
          />
        </div> */}

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-3 col-md-12">
          <label>Latitude</label>
          <input type="text" name="name" placeholder="Melbourne" required />
        </div> */}

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-3 col-md-12">
          <label>Longitude</label>
          <input type="text" name="name" placeholder="Melbourne" required />
        </div> */}

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-12 col-md-12">
          <button className="theme-btn btn-style-three">Search Location</button>
        </div> */}

        {/* <div className="form-group col-lg-12 col-md-12">
                    <div className="map-outer">
                        <div style={{ height: "420px", width: "100%" }}>
                            <Map />
                        </div>
                    </div>
                </div> */}
        {/* End MapBox */}

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <button
            type="submit"
            className="theme-btn btn-style-one"
            onClick={handleSubmit}
            disabled={submitLoading}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactInfoBox;
