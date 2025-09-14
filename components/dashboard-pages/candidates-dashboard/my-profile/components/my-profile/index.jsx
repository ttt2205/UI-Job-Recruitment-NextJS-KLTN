import FormInfoBox from "./FormInfoBox";
import LogoUpload from "./LogoUpload";

const index = ({ candidateInfo, fetchCadidateInfo }) => {
  return (
    <div className="widget-content">
      <LogoUpload candidateId={candidateInfo?.id || ""} />
      {/* End logo and cover photo components */}

      <FormInfoBox
        candidateInfo={candidateInfo}
        fetchCandidateInfo={fetchCadidateInfo}
      />
      {/* compnay info box */}
    </div>
  );
};

export default index;
