import { redirect } from "react-router";

// Håndværker pivot (Task 10): /tjenester used to be the fest/events page.
// Per the pivot plan the single-product IA folds "hvad vi tilbyder" into the
// /indkvartering-haandvaerkere pillar, so this now 301s there to preserve any
// link equity (mirrors app/routes/hotel.tsx).
export function loader() {
  return redirect("/indkvartering-haandvaerkere", 301);
}
