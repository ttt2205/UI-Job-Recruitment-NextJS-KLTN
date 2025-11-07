const JobDetailsDescriptions = ({ job }) => {
  return (
    <div className="job-detail">
      <h4>Job Description</h4>
      <p>{job?.description || ""}</p>
      <h4>Key Responsibilities</h4>
      <ul className="list-style-three">
        {job.responsibilities &&
          job.responsibilities.map((instance, index) => (
            <li key={index}>{instance}</li>
          ))}
      </ul>
      <h4>Skill & Experience</h4>
      <ul className="list-style-three">
        {job.skillAndExperiences &&
          job.skillAndExperiences.map((instance, index) => (
            <li key={index}>{instance}</li>
          ))}
      </ul>
    </div>
  );
};

export default JobDetailsDescriptions;
