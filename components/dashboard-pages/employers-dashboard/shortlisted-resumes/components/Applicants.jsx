"use client";

import { togglePotentialCandidate } from "@/services/company-feature.service";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Applicants = ({ dataList = [], fetchPotentialCandidate }) => {
  const { account } = useSelector((slice) => slice.auth);

  // Gom dữ liệu hiển thị ra UI
  const dataListShowUI = dataList.map((candidate) => ({
    id: candidate.id,
    avatar: candidate.avatar
      ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${candidate.avatar}`
      : `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT_AVATAR_FOR_CANDIDATE}`,
    name: candidate.name || "No name",
    designation: candidate.designation || "No designation",
    location:
      candidate.location ||
      `${candidate.city || ""}, ${candidate.country || ""}`,
    hourlyRate: candidate.hourlyRate || 0,
    tags: candidate.skills || [], // dùng skills làm tag
  }));

  // ===================== Handle Functions =======================
  const deletePotentialCanddiate = async (candidateId) => {
    try {
      if (
        !account ||
        account?.role?.trim().toUpperCase() !==
          process.env.NEXT_PUBLIC_USER_ROLE_EMPLOYER.trim().toUpperCase()
      )
        return;

      const res = await togglePotentialCandidate(account.id, candidateId);

      if (res && res.statusCode === 200) fetchPotentialCandidate();
      toast.success("Deleted potential candidate successfully");
    } catch (error) {
      console.error("Error deletePotentialCanddiate: ", error);
      toast.error("Fail to delete potential candidate");
    }
  };

  // ===================== Render UI =======================
  return (
    <>
      {dataListShowUI.length === 0 ? (
        <p className="text-gray-500 text-center">No candidates found.</p>
      ) : (
        dataListShowUI.map((candidate) => (
          <div
            className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
            key={candidate.id}
          >
            <div className="inner-box">
              <div className="content">
                <figure className="image">
                  <Image
                    width={90}
                    height={90}
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="rounded-full object-cover"
                    style={{
                      objectFit: "cover",
                      width: "90px",
                      height: "90px",
                    }}
                  />
                </figure>

                <h4 className="name">
                  <Link href={`/candidates-single-v1/${candidate.id}`}>
                    {candidate.name}
                  </Link>
                </h4>

                <ul className="candidate-info">
                  <li className="designation">{candidate.designation}</li>
                  <li>
                    <span className="icon flaticon-map-locator"></span>{" "}
                    {candidate.location}
                  </li>
                  <li>
                    <span className="icon flaticon-money"></span> $
                    {candidate.hourlyRate} / hour
                  </li>
                </ul>

                <ul className="post-tags">
                  {candidate.tags.map((tag, i) => (
                    <li key={i}>
                      <a href="#">{tag}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="option-box">
                <ul className="option-list">
                  {/* <li>
                    <button data-text="View Application">
                      <span className="la la-eye"></span>
                    </button>
                  </li>
                  <li>
                    <button data-text="Approve Application">
                      <span className="la la-check"></span>
                    </button>
                  </li>
                  <li>
                    <button data-text="Reject Application">
                      <span className="la la-times-circle"></span>
                    </button>
                  </li> */}
                  <li>
                    <button
                      data-text="Delete Application"
                      onClick={() => deletePotentialCanddiate(candidate.id)}
                    >
                      <span className="la la-trash"></span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Applicants;
