import { TopLevelLanding } from "~/components/TopLevelLanding";
import { findTopLanding } from "~/lib/topLandingPages";
import { pageMeta } from "~/lib/seo";

const PAGE = findTopLanding("/haandvaerkere")!;

export function meta() {
  return pageMeta({ path: PAGE.path, title: PAGE.metaTitle, description: PAGE.metaDescription, image: PAGE.image, imageAlt: PAGE.imageAlt });
}

export default function HaandvaerkereRoute() {
  return <TopLevelLanding page={PAGE} />;
}
