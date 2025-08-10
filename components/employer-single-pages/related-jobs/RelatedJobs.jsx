"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getRelatedJobsByCompanyId } from "@/services/company-feature.service";

/* 
"results": [
  {
    "id": "68736ca827ebd628fc528ed2",
    "logo": "",
    "jobTitle": "Lập trình viên Backend Node.js",
    "company": {
        "id": "68736afc61942cb6f1e0141c",
        "email": "VNP@company.com",
        "name": "Công ty TNHH Công Nghệ VNP",
        "userId": "686f5683f6e123fa2042954f",
        "primaryIndustry": "Infomation Technology",
        "size": "100 - 150",
        "foundedIn": 2015,
        "description": "Công ty chuyên cung cấp giải pháp phần mềm và dịch vụ CNTT.",
        "phone": "0987654321",
        "address": "Quận 2, TP.HCM",
        "logo": "file-1753588732487-4780477.jpg",
        "socialMedias": [
            {
                "platform": "facebook",
                "url": "https://facebook.com/congtyabc"
            },
            {
                "platform": "twitter",
                "url": "https://twitter.com/congtyabc"
            },
            {
                "platform": "linkedin",
                "url": "https://linkedin.com/company/congtyabc"
            },
            {
                "platform": "googlePlus",
                "url": "https://googleplus.com/company/congtyabc"
            }
        ],
        "isDeleted": false,
        "createdAt": "2025-07-13T08:14:52.413Z",
        "updatedAt": "2025-07-30T07:07:22.379Z"
    },
    "location": "123 Đường Lê Văn Việt, Quận 9",
    "description": "Chúng tôi đang tìm kiếm lập trình viên backend có kinh nghiệm với NestJS.",
    "responsibilities": [
        "Phát triển và duy trì các API RESTful sử dụng NestJS.",
        "Thiết kế cấu trúc cơ sở dữ liệu hiệu quả với MongoDB hoặc PostgreSQL.",
        "Phối hợp với frontend team để triển khai chức năng theo yêu cầu nghiệp vụ."
    ],
    "skillAndExperience": [
        "Có kinh nghiệm tối thiểu 2-3 năm làm việc với Node.js và NestJS.",
        "Hiểu biết về mô hình kiến trúc microservices và giao tiếp qua REST / message broker.",
        "Thành thạo TypeScript, hiểu rõ về SOLID và nguyên lý thiết kế phần mềm."
    ],
    "time": "08:00 - 17:00",
    "salary": {
        "min": 10000000,
        "max": 15000000,
        "currency": "VND",
        "unit": "month",
        "negotiable": false
    },
    "industry": "Infomation Technology",
    "quantity": 3,
    "country": "Việt Nam",
    "city": "Hồ Chí Minh",
    "jobType": [
        {
            "styleClass": "time",
            "type": "Fulltime"
        }
    ],
    "destination": null,
    "datePosted": "13/7/2025",
    "expireDate": "1/8/2025"
  }
] 
*/

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
      const response = await getRelatedJobsByCompanyId(companyId);
      setRelatedJobs(response?.results || []);
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

              <ul className="job-other-info">
                {item.jobType.map((val, i) => (
                  <li key={i} className={`${val.styleClass}`}>
                    {val.type}
                  </li>
                ))}
              </ul>
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
