import Social from "../social/Social";
/* 
"
company": {
  "id": "68736afc61942cb6f1e0141c",
  "email": "VNP@company.com",
  "name": "Công ty TNHH Công Nghệ VNP",
  "userId": "686cb5d902a159956bb2a372",
  "primaryIndustry": "Công nghệ thông tin",
  "size": "51-200 nhân viên",
  "foundedIn": 2015,
  "description": "Công ty chuyên cung cấp giải pháp phần mềm và dịch vụ CNTT.",
  "phone": "0987654321",
  "address": "Quận 2, TP.HCM",
  "logo": "https://example.com/logo.png",
  "socialMedias": [
    {
      platform: string;
      url: string;
    }
  ],
  "isDeleted": false,
  "createdAt": "2025-07-13T08:14:52.413Z",
  "updatedAt": "2025-07-13T08:14:52.413Z"
},
*/

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
