import { redirect } from "react-router";

// Håndværker pivot: /inspiration used to be the fest/events inspiration page
// (bryllup, konfirmation, julefrokost ideas). That content is retired along
// with the event offering, so this now 301s to the håndværker pillar page.
export function loader() {
  return redirect("/indkvartering-haandvaerkere", 301);
}
