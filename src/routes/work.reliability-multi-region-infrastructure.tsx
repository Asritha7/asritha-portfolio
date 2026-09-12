import { createFileRoute, redirect } from "@tanstack/react-router";

// This work is now part of the combined Goldman Sachs case study. The old URL
// is kept and redirects to the matching section so existing links keep working.
export const Route = createFileRoute("/work/reliability-multi-region-infrastructure")({
  beforeLoad: () => {
    throw redirect({
      to: "/work/goldman-sachs-platform-engineering",
      hash: "reliability-multi-region-infrastructure",
    });
  },
});
