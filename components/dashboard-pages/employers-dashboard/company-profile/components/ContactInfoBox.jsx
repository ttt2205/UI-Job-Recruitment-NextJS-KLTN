"use client";

import { useEffect, useState } from "react";
import Map from "../../../Map";
import { toast } from "react-toastify";
import { updatePartialCompany } from "@/services/company-feature.service";

const ContactInfoBox = ({ data }) => {
  // ============================= State ============================/
  const [companyId, setCompanyId] = useState("");
  const [contactInfo, setContactInfo] = useState({
    country: "",
    city: "",
    address: "",
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryCodeMap, setCountryCodeMap] = useState({});

  useEffect(() => {
    if (data.id) {
      setContactInfo({
        country: data?.country || "",
        city: data?.city || "",
        address: data?.address || "",
      });
      setCompanyId(data.id);
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

    // Tạo map từ tên => mã code để tra ngược khi fetch city
    const map = {};
    sorted.forEach((c) => {
      map[c.name] = c.code;
    });
    setCountryCodeMap(map);
  };

  const fetchCities = async (countryCode) => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json"
      );
      const cities = await res.json();

      // Lọc theo countryCode (ISO Alpha-2, ví dụ 'VN', 'US')
      const filtered = cities.filter(
        (city) => city.country_code === countryCode
      );
      setCities(filtered.map((c) => c.name));
    } catch (error) {
      console.error("Lỗi khi tải danh sách thành phố:", error);
      toast.error("Không thể tải danh sách thành phố!");
    }
  };

  // ============================= Handle Functions ============================/
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      // const countryCode = countryCodeMap[value];
      // fetchCities(countryCode); // Load city mới
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
      if (!companyId) {
        toast.error("Không thể cập nhật do không tìm thấy công ty!");
        return;
      }
      await updatePartialCompany(companyId, contactInfo);
      toast.success("Cập nhật thông tin địa chỉ công ty thành công!");
    } catch (error) {
      console.error("Lỗi cập nhật thông tin địa chỉ công ty: ", error);
      toast.error("Cập nhật thông tin địa chỉ công ty không thành công!");
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
          <select
            className="form-select"
            name="city"
            value={contactInfo.city}
            onChange={handleInputChange}
            required
            disabled={!cities.length}
          >
            <option value="">-- Select city --</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="name"
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
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
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactInfoBox;
