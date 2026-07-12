import { Suspense } from "react";
import ExploreClient from "@/components/explore/ExploreClient";

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-cream/50">Loading...</div>
      }
    >
      <ExploreClient />
    </Suspense>
  );
}
