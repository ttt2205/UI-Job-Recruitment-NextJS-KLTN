import dynamic from "next/dynamic";
import CandidatePage from "./candidate/page";

const index = () => {
  return (
    <>
      <CandidatePage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
