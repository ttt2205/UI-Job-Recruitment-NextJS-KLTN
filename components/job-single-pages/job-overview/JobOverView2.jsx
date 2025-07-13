const JobOverView2 = ({ job }) => {
  return (
    <ul>
      <li>
        <i className="icon icon-calendar"></i>
        <h5>Date Posted:</h5>
        {/* <span>Posted 1 hours ago</span> */}
        <span>{job.datePosted}</span>
      </li>
      <li>
        <i className="icon icon-expiry"></i>
        <h5>Expiration date:</h5>
        {/* <span>April 06, 2021</span> */}
        <span>{job.expireDate}</span>
      </li>
      <li>
        <i className="icon icon-location"></i>
        <h5>Location:</h5>
        {/* <span>London, UK</span> */}
        <span>{job.location}</span>
      </li>
      <li>
        <i className="icon icon-user-2"></i>
        <h5>Job Title:</h5>
        {/* <span>Designer</span> */}
        <span>{job.jobTitle}</span>
      </li>
      <li>
        <i className="icon icon-clock"></i>
        <h5>Hours:</h5>
        {/* <span>50h / week</span> */}
        <span>{job.time}</span>
      </li>
      {/* <li>
        <i className="icon icon-rate"></i>
        <h5>Rate:</h5>
        <span>$15 - $25 / hour</span>
      </li> */}
      <li>
        <i className="icon icon-salary"></i>
        <h5>Salary:</h5>
        {/* <span>$35k - $45k</span> */}
        <span>{job.salary} VND</span>
      </li>
    </ul>
  );
};

export default JobOverView2;
