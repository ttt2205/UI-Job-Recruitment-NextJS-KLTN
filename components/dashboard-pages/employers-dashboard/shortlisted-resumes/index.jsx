"use client";

import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardEmployerHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import WidgetToFilterBox from "./components/WidgetToFilterBox";
import WidgetContentBox from "./components/WidgetContentBox";
import MenuToggler from "../../MenuToggler";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import { getPotentialCandidatesPagination } from "@/services/company-feature.service";

const index = () => {
  const { account } = useSelector((state) => state.auth);
  const [potentialCandidates, setPotentialCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [meta, setMeta] = useState({
    totalItems: 0,
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
  });

  useEffect(() => {
    if (
      !loading &&
      account &&
      account.id &&
      account.role.trim().toUpperCase() ===
        process.env.NEXT_PUBLIC_USER_ROLE_EMPLOYER.trim().toUpperCase()
    ) {
      setLoading(true);
      fetchPotentialCandidate();
      setLoading(false);
    }
  }, [page, size, account]);

  // ===================== Debounce search =======================
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (
        account &&
        account.id &&
        account.role.trim().toUpperCase() ===
          process.env.NEXT_PUBLIC_USER_ROLE_EMPLOYER.trim().toUpperCase()
      ) {
        fetchPotentialCandidate();
      }
    }, 500); // 0.5s delay

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // ===================== Fetch Functions =======================
  const fetchPotentialCandidate = async () => {
    try {
      const res = await getPotentialCandidatesPagination(
        account.id,
        page,
        size,
        search
      );
      if (res && res.statusCode === 200) {
        setPotentialCandidates(res?.results || []);
        setMeta({
          totalItems: res.meta.totalItems,
          currentPage: res.meta.currentPage,
          pageSize: res.meta.pageSize,
          totalPages: res.meta.totalPages,
        });
      }
    } catch (error) {}
  };

  // ===================== Handle Functions =======================
  // page handler
  const onChangePage = (currentPage) => {
    if (currentPage === meta.currentPage) return;
    setPage(currentPage);
  };

  // size handler
  const sizeHandler = (e) => {
    const newSize = e.target.value;
    setSize(newSize);
  };

  const onChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  // ===================== Render UI =======================
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Shortlisted Resumes!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              <div className="applicants-widget ls-widget">
                <div className="widget-title">
                  <h4>Shorlist Resumes</h4>
                  <WidgetToFilterBox
                    search={search}
                    onChangeSearch={onChangeSearch}
                    size={size}
                    sizeHandler={sizeHandler}
                  />
                </div>
                {/* End widget top filter box */}
                <WidgetContentBox
                  dataList={potentialCandidates}
                  fetchPotentialCandidate={fetchPotentialCandidate}
                />

                {/* <Pagination /> */}
                <div
                  style={{
                    paddingBottom: "10px",
                  }}
                >
                  <Pagination
                    page={page || 1}
                    totalPages={meta?.totalPages || 1}
                    onChangePage={onChangePage}
                  />
                </div>
              </div>
              {/* <!-- applicants Widget --> */}
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
