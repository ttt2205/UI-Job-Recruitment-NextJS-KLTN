import Home from "@/components/home-10";
import { candidateListPagination } from "@/data/admin/candidate.admin";

export const metadata = {
  title: "Home-1 || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};

export default function page() {
  const dataList = candidateListPagination;
  console.log("dataList: ", dataList);
  return <Home />;
}
