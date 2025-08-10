import FormInfoBox from "./FormInfoBox";
// import LogoCoverUploader from "./LogoCoverUploader";
import LogoCoverUploader from "./LogoUploadCustom";

const index = ({ companyInfo, fetchCompanyInfoByUserId }) => {
  return (
    <div className="widget-content">
      <LogoCoverUploader companyId={companyInfo.id} />
      {/* End logo and cover photo components */}

      <FormInfoBox
        companyInfo={companyInfo}
        fetchCompanyInfoByUserId={fetchCompanyInfoByUserId}
      />
      {/* compnay info box */}
    </div>
  );
};

export default index;
