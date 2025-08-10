"use client";
import { useEffect, useState } from "react";
import { updatePartialCompany } from "@/services/company-feature.service";
import { toast } from "react-toastify";
import { da } from "@faker-js/faker";

/*
  data.socialMedias = [
    {
      platform: "facebook",
      url: ""
    }
  ]

  socialNetwork = {
    facebook: "",
    twitter: "",
    linkedin: "",
    googlePlus: "",
  }

  formData = [
    {
      platform: "facebook",
      url: ""
    }
  ]
*/

const template = [
  {
    title: "Facebook",
    name: "facebook",
    placeholder: "",
  },
  {
    title: "Twitter",
    name: "twitter",
    placeholder: "",
  },
  {
    title: "Linkedin",
    name: "linkedin",
    placeholder: "",
  },
  {
    title: "Google Plus",
    name: "googlePlus",
    placeholder: "",
  },
];

const SocialNetworkBox = ({ data }) => {
  // ========================== State =============================/
  const [socialNetwork, setSocialNetwork] = useState([]);
  const [companyId, setCompanyId] = useState();

  useEffect(() => {
    if (data.id) {
      const temp = data.socialMedias.reduce((acc, item) => {
        acc[item.platform] = item.url || "";
        return acc;
      }, {});
      setCompanyId(data.id);
      setSocialNetwork(temp);
    }
  }, [data]);

  // ========================== Handle Functions ==================/
  const hanleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialNetwork((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hanleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (data.id) {
        const socialMedias = Object.entries(socialNetwork).map(
          ([platform, url]) => ({
            platform,
            url,
          })
        );
        await updatePartialCompany(companyId, { socialMedias });
        toast.success("Cập nhật thông tin công ty thành công!");
      } else {
        toast.error("Không tìm thấy công ty!");
      }
    } catch (error) {
      toast.error("Cập nhật thông tin công ty thất bại!");
    }
  };

  return (
    <form className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Facebook</label>
          <input
            type="text"
            name="Facebook"
            value={socialNetwork.Facebook || ""}
            placeholder="www.facebook.com/Invision"
            required
          />
        </div> */}

        {template.map((item) => {
          return (
            <div className="form-group col-lg-6 col-md-12">
              <label>{item.title}</label>
              <input
                type="text"
                name={item.name}
                value={socialNetwork[item.name] || ""}
                onChange={hanleInputChange}
                placeholder={item.placeholder}
              />
            </div>
          );
        })}

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Twitter</label>
          <input
            type="text"
            name="Twitter"
            placeholder=""
            value={socialNetwork.Twitter || ""}
            required
          />
        </div> */}

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Linkedin</label>
          <input
            type="text"
            name="LinkedIn"
            placeholder=""
            value={socialNetwork.Linkedin || ""}
            required
          />
        </div> */}

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Google Plus</label>
          <input
            type="text"
            name="GooglePlus"
            placeholder=""
            value={socialNetwork.GooglePlus || ""}
            required
          />
        </div> */}

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button
            type="submit"
            className="theme-btn btn-style-one"
            onClick={hanleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default SocialNetworkBox;
