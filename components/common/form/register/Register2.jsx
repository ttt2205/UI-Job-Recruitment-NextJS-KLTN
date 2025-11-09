"use client";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LoginWithSocial from "./LoginWithSocial";
import Form from "./FormContent2";
import Link from "next/link";
import { useState } from "react";

const Register2 = () => {
  // ============================= States =============================/
  const [selectTab, setSelectTab] = useState(0);
  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
    role: "candidate",
  });

  // ============================= Handle Functions =============================/
  const handleTabSelect = (index) => {
    setSelectTab(index);
    if (index === 0) {
      setFormRegister({
        ...formRegister,
        role: process.env.NEXT_PUBLIC_USER_ROLE_CANDIDATE,
      });
    } else {
      setFormRegister({
        ...formRegister,
        role: process.env.NEXT_PUBLIC_USER_ROLE_EMPLOYER,
      });
    }
  };

  const onChangeForm = (e) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };

  // ============================= Render UI =============================/
  return (
    <div className="form-inner">
      <h3>Create a Free Superio Account</h3>

      <Tabs
        selectedIndex={selectTab}
        onSelect={(index) => handleTabSelect(index)}
      >
        <div className="form-group register-dual">
          <TabList className="btn-box row">
            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-user"></i> Candidate
              </button>
            </Tab>

            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-briefcase"></i> Employer
              </button>
            </Tab>
          </TabList>
        </div>
        {/* End .form-group */}

        <TabPanel>
          <Form formRegister={formRegister} onChangeForm={onChangeForm} />
        </TabPanel>
        {/* End cadidates Form */}

        <TabPanel>
          <Form formRegister={formRegister} onChangeForm={onChangeForm} />
        </TabPanel>
        {/* End Employer Form */}
      </Tabs>
      {/* End form-group */}

      <div className="bottom-box">
        <div className="text">
          Do have an account? <Link href="/login">LogIn</Link>
        </div>
        <div className="divider">
          <span>or</span>
        </div>
        <LoginWithSocial />
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default Register2;
