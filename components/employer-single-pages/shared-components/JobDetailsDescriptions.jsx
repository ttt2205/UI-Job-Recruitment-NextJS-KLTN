"use client";
import GalleryBox from "./GalleryBox";

const JobDetailsDescriptions = ({ description, employerId }) => {
  return (
    <div className="job-detail">
      <h4>About Company</h4>
      <p>{description ? description : "Loading company details..."}</p>
      <div className="row images-outer">
        <GalleryBox employerId={employerId} />
      </div>
    </div>
  );
};

export default JobDetailsDescriptions;
