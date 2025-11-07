import Social from "../social/Social";

const CompanyInfo = ({ company }) => {
  return (
    <ul className="company-info">
      <li>
        Primary industry: <span>{company?.primaryIndustry || "---"}</span>
      </li>
      <li>
        Company size: <span>{company?.size || "---"}</span>
      </li>
      <li>
        Founded in: <span>{company?.foundedIn || "---"}</span>
      </li>
      <li>
        Phone: <span>{company?.phone || "---"}</span>
      </li>
      <li>
        Email: <span>{company?.email || "---"}</span>
      </li>
      <li>
        Location: <span>{company?.address || "---"}</span>
      </li>
      <li>
        Social media:
        <Social socialMedias={company?.socialMedias || []} />
      </li>
    </ul>
  );
};

export default CompanyInfo;
