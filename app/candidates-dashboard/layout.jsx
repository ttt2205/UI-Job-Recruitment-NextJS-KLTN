import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthorized } from "@/services/auth-feature.service";

export default function Layout({ children }) {
  const token = cookies().get("accessToken")?.value;

  if (!isAuthorized(token, "candidate")) {
    redirect("/access-denied");
  }

  return <>{children}</>;
}
