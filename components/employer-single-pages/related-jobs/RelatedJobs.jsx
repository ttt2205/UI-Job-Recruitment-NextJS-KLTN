"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getRelatedJobsByCompanyId } from "@/services/company-feature.service";
import { formatJobResults } from "@/utils/convert-function";

const RelatedJobs = ({ companyId }) => {
  // ======================================= States ==================================//
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ======================================= Effects ==================================//
  useEffect(() => {
    fetchRelatedJobs();
  }, [companyId]);

  // ======================================= Fetch Function ==================================//
  const fetchRelatedJobs = async () => {
    try {
      setLoading(true);
      // Simulate fetching company details
      const res = await getRelatedJobsByCompanyId(companyId);
      const format = res.results ? formatJobResults(res.results) : [];
      setRelatedJobs(format || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ======================================= Render Function ==================================//
  return (
    <>
      {relatedJobs?.map((item) => (
        <div className="job-block" key={item.id}>
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                <Image
                  width={50}
                  height={50}
                  src={
                    item?.logo
                      ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${item.logo}`
                      : ""
                  }
                  alt="resource"
                />
              </span>
              <h4>
                <Link href={`/job-single-v3/${item.id}`}>{item.jobTitle}</Link>
              </h4>

              <ul className="job-info">
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {item?.company?.name}
                </li>
                {/* compnay info */}
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {item.location}
                </li>
                {/* location info */}
                <li>
                  <span className="icon flaticon-clock-3"></span> {item.time}
                </li>
                {/* time info */}
                <li>
                  <span className="icon flaticon-money"></span>{" "}
                  {`${item.salary.min} - ${item.salary.max} ${
                    item.salary.currency
                  }/${item.salary.unit} ${
                    item.salary.negotiable ? "- Thỏa thuận" : ""
                  }`}
                </li>
                {/* salary info */}
              </ul>
              {/* End .job-info */}

              {item.jobType ? (
                <ul className="job-other-info">
                  {item.jobType?.map((val, i) => (
                    <li key={i} className={`${val.styleClass}`}>
                      {val.type}
                    </li>
                  ))}
                </ul>
              ) : null}
              {/* End .job-other-info */}
              <button className="bookmark-btn">
                <span className="flaticon-bookmark"></span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RelatedJobs;
