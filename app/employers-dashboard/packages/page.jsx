import dynamic from "next/dynamic";
import EmployerPackages from "@/components/dashboard-pages/employers-dashboard/packages";

export const metadata = {
  title: "Packages || Superio - Job Board React NextJS Template",
  description: "Superio - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <EmployerPackages />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });