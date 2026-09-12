import { createFileRoute, redirect } from "@tanstack/react-router";

// This work is now part of the combined Goldman Sachs case study. The old URL
// is kept and redirects to the matching section so existing links keep working.
export const Route = createFileRoute("/work/java-application-service-engineering")({
  beforeLoad: () => {
    throw redirect({
      to: "/work/goldman-sachs-platform-engineering",
      hash: "java-application-service-engineering",
    });
  },
});
