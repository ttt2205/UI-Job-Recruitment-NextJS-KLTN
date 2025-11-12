import dynamic from "next/dynamic";
import AccountPage from "./accounts/page";

const index = () => {
  return (
    <>
      <AccountPage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
