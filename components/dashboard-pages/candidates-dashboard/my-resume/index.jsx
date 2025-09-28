"use client";

import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import Resume from "./components";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";

const index = () => {
  // <!-------------------- Handler Functions -------------------->
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // <!-------------------- Render UI -------------------->
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardCandidatesSidebar />
      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="My Resume!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>My Profile</h4>
                  </div>
                  {/* End widget-title */}

                  <div className="widget-content">
                    <form className="default-form" onClick={handleSubmit}>
                      <div className="row">
                        <div className="form-group col-lg-6 col-md-12">
                          <label>Select Your CV</label>
                          <select className="chosen-single form-select">
                            <option>My CV</option>
                          </select>
                        </div>
                        {/* <!-- Input --> */}

                        <div className="form-group col-lg-12 col-md-12">
                          <label>Description</label>
                          <textarea placeholder="Introduce yourself to the employer"></textarea>
                        </div>
                        {/* <!-- About Candidate --> */}

                        <div className="form-group col-lg-12 col-md-12">
                          <button
                            type="submit"
                            className="theme-btn btn-style-one"
                          >
                            Save
                          </button>
                        </div>
                        {/* <!-- Input --> */}
                      </div>
                    </form>
                  </div>
                  {/* End widget-content */}
                </div>
              </div>
              {/* End ls-widget */}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Your Qualifications</h4>
                  </div>
                  {/* End widget-title */}

                  <div className="widget-content">
                    <Resume />
                  </div>
                  {/* End widget-content */}
                </div>
              </div>
              {/* End ls-widget */}
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;
