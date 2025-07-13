// import { useEffect, useState } from "react";
import FooterDefault from "../../../components/footer/common-footer";
import LoginPopup from "../../common/form/login/LoginPopup";
import DefaulHeader2 from "../../header/DefaulHeader2";
import MobileMenu from "../../header/MobileMenu";
import FilterJobBox from "./FilterJobBox";
import JobSearchForm from "./JobSearchForm";
// import { useDispatch, useSelector } from "react-redux";
// import { getListJobPagination } from "@/services/job-feature.service";

const index = () => {
  // State store
  // const { jobList, jobSort } = useSelector((state) => state.filter);
  // const { sort, page, size } = jobSort;
  // const {
  //   keyword,
  //   location,
  //   destination,
  //   category,
  //   datePosted,
  //   jobTypeSelect,
  //   experienceSelect,
  //   salary,
  // } = jobList || {};

  // State Variable
  // const [listJob, setListJob] = useState([]);
  // const [meta, setMeta] = useState({
  //   currentPage: 1,
  //   pageSize: 10,
  //   totalItems: 0,
  //   totalPages: 0,
  // });

  // useEffect(() => {
  //   fetchJobsPagination({
  //     page,
  //     size,
  //     sort,
  //     keyword,
  //     location,
  //     category,
  //     jobTypeSelect,
  //     datePosted,
  //     experienceSelect,
  //     salary,
  //   });
  // }, []);

  //============================== Handle Fetch ================================/
  // const fetchJobsPagination = async (pagination) => {
  //   const res = await getListJobPagination(pagination);
  //   console.log("res list job pagination: ", res);
  //   setListJob(res?.results || []);
  //   setMeta(
  //     res?.meta || {
  //       currentPage: 1,
  //       pageSize: 10,
  //       totalItems: 0,
  //       totalPages: 0,
  //     }
  //   );
  // };

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader2 />
      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}

      <section className="page-title style-two">
        <div className="auto-container">
          <JobSearchForm />
          {/* <!-- Job Search Form --> */}
        </div>
      </section>
      {/* <!--End Page Title--> */}

      <section className="ls-section">
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-12">
              <div className="ls-outer">
                <FilterJobBox
                // listJobProp={listJob}
                // metaProp={meta}
                // fetchListJobPagination={fetchJobsPagination}
                />
              </div>
            </div>
            {/* <!-- End Content Column --> */}
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </section>
      {/* <!--End Listing Page Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
