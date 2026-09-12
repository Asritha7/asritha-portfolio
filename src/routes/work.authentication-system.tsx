import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyLayout, SimpleArchitectureDiagram } from "@/components/CaseStudyLayout";
import { PROJECTS } from "@/content/portfolio";

const study = PROJECTS.find((c) => c.slug === "authentication-system")!;
const url = "https://asritha.dev/work/authentication-system";

export const Route = createFileRoute("/work/authentication-system")({
  head: () => ({
    meta: [
      { title: `${study.title} - Asritha Nibhanupudi` },
      { name: "description", content: study.blurb },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:title", content: study.title },
      { property: "og:description", content: study.blurb },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          author: { "@type": "Person", name: "Asritha Nibhanupudi" },
          description: study.blurb,
          url,
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <CaseStudyLayout
      study={study}
      diagram={
        <SimpleArchitectureDiagram
          title="Client → Keycloak (OIDC) → Service (JWT + RBAC)"
          desc="Clients perform an OIDC flow against Keycloak; services validate the resulting JWT and enforce role claims on protected routes."
          nodes={["Client", "Keycloak (OIDC)", "Service · JWT validate", "RBAC check"]}
        />
      }
    />
  );
}
