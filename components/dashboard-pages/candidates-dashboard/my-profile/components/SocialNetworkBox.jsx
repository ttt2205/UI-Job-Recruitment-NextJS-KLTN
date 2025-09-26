"use client";
import { useEffect, useState } from "react";
import { updatePartialInfo } from "@/services/candidate-feature.service";
import { toast } from "react-toastify";
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
  const [candidateId, setCandidateId] = useState();

  useEffect(() => {
    if (data.id) {
      const temp = data.socialMedias.reduce((acc, item) => {
        acc[item.platform] = item.url || "";
        return acc;
      }, {});
      setCandidateId(data.id);
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
        await updatePartialInfo(candidateId, { socialMedias });
        toast.success("Cập nhật thông tin ứng viên thành công!");
      } else {
        toast.error("Không tìm thấy ứng viên!");
      }
    } catch (error) {
      toast.error("Cập nhật thông tin ứng viên thất bại!");
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
