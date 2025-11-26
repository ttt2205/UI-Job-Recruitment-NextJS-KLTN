"use client";

import { getDashboardStatsByEmployerId } from "@/services/company-feature.service";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TopCardBlock = () => {
  const { account } = useSelector((state) => state.auth);

  const [dashboardStat, setDashboardStat] = useState({});

  useEffect(() => {
    if (account && account.id) {
      fetchDashboardStatsByEmployerId();
    }
  }, [account]);

  // ================================ Fetch Functions ============================
  const fetchDashboardStatsByEmployerId = async () => {
    try {
      const res = await getDashboardStatsByEmployerId(account.id);
      if (res && res.statusCode === 200) {
        setDashboardStat(res?.data || null);
      }
    } catch (error) {
      console.error("Error fetchDashboardStatsByEmployerId: ", error);
    }
  };

  // ================================ Format Data ============================
  const cardContent = [
    {
      id: 1,
      icon: "flaticon-briefcase",
      countNumber: dashboardStat?.postedJobs || 0,
      metaName: "Posted Jobs",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "la-file-invoice",
      countNumber: dashboardStat?.applications || 0,
      metaName: "Application",
      uiClass: "ui-red",
    },
    {
      id: 3,
      icon: "la-comment-o",
      countNumber: dashboardStat?.messages || 0,
      metaName: "Messages",
      uiClass: "ui-yellow",
    },
    {
      id: 4,
      icon: "la-bookmark-o",
      countNumber: dashboardStat?.shortlist || 0,
      metaName: "Shortlist",
      uiClass: "ui-green",
    },
  ];

  return (
    <>
      {cardContent.map((item) => (
        <div
          className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className={`ui-item ${item.uiClass}`}>
            <div className="left">
              <i className={`icon la ${item.icon}`}></i>
            </div>
            <div className="right">
              <h4>{item.countNumber}</h4>
              <p>{item.metaName}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;
