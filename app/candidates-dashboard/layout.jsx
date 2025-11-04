import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthorized } from "@/services/auth-feature.service";

export default function Layout({ children }) {
  const token = cookies().get("accessToken")?.value;

  if (!isAuthorized(token, process.env.NEXT_PUBLIC_USER_ROLE_CANDIDATE)) {
    redirect("/access-denied");
  }

  return <>{children}</>;
}
