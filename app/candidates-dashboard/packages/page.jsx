import dynamic from "next/dynamic";
import CandidatePackages from "@/components/dashboard-pages/candidates-dashboard/packages";

export const metadata = {
  title: "Packages || Superio - Job Board React NextJS Template",
  description: "Superio - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <CandidatePackages />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });