"use client";
import Link from "next/link";
import jobs from "../../../data/job-featured";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getRelatedJobs } from "@/services/job-feature.service";

const RelatedJobs2 = ({ id, industry, country, city }) => {
  // =================================== States ===========================/
  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    if (id) {
      fetchRelatedJobs(id, industry, country, city);
    }
  }, [industry, country, city]);
  // =================================== Fetch Function ===========================/
  const fetchRelatedJobs = async (id, industry, country, city) => {
    try {
      // console.log(
      //   "relatedJobs query: ",
      //   "id: ",
      //   id,
      //   "-industry: ",
      //   industry,
      //   "-city: ",
      //   city
      // );
      const res = await getRelatedJobs({ id, industry, country, city });
      console.log("relatedJobs data: ", res?.results || "");
      setRelatedJobs(res?.results || []);
    } catch (error) {}
  };
  // =================================== Handle Function ===========================/

  // =================================== UI ===========================/
  return (
    <>
      {relatedJobs.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-xl font-semibold">
            😥 Không tìm thấy công việc liên quan
          </p>
        </div>
      ) : (
        <div className="row">
          {relatedJobs.map((item) => (
            <div
              className="job-block-four col-xl-3 col-lg-4 col-md-6 col-sm-12"
              key={item.id}
            >
              <div className="inner-box shadow rounded p-3 bg-white">
                <ul className="job-other-info mb-2">
                  {item.jobType.map((val, i) => (
                    <li key={i} className={`${val.styleClass}`}>
                      {val.type}
                    </li>
                  ))}
                </ul>
                <span className="company-logo mb-2 block">
                  <Image
                    width={90}
                    height={90}
                    src={item.logo}
                    alt="featured job"
                    className="rounded-full"
                  />
                </span>
                <span className="company-name text-gray-600 text-sm block">
                  {item?.company?.name || "Công ty không xác định"}
                </span>
                <h4 className="text-lg font-semibold my-1">
                  <Link href={`/job-single-v3/${item.id}`}>
                    {item.jobTitle}
                  </Link>
                </h4>
                <div className="location text-sm text-gray-500">
                  <span className="icon flaticon-map-locator mr-1"></span>
                  {item.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RelatedJobs2;
