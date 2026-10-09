import { redirect } from "react-router";

// Legacy WordPress lodging URL. /hotel (and /hotel/) used to be the overnatning
// page; it now lives at /vaerelser. Google still had /hotel/ indexed and it was
// 404'ing (see Search Console → Sider), so 301 it to preserve any link equity.
export function loader() {
  return redirect("/vaerelser", 301);
}
