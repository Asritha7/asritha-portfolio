import { createFileRoute, Outlet } from "@tanstack/react-router";

const TITLE = "Engineering Notes - Asritha Nibhanupudi";
const DESC =
  "Practical engineering notes on Keycloak configuration drift, Kafka and Strimzi upgrade validation, and investigating Kubernetes deployment failures.";
const URL = "https://asritha.dev/notes";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: () => <Outlet />,
});
