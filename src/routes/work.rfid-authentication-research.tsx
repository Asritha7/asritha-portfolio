import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyLayout, SimpleArchitectureDiagram } from "@/components/CaseStudyLayout";
import { PROJECTS } from "@/content/portfolio";

const study = PROJECTS.find((c) => c.slug === "rfid-authentication-research")!;
const url = "https://asritha.dev/work/rfid-authentication-research";

export const Route = createFileRoute("/work/rfid-authentication-research")({
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
          "@type": "ScholarlyArticle",
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
          title="RFID + PIN → Controller → Access decision"
          desc="An RFID read unlocks the PIN-entry stage; correct PIN within the retry budget grants access. Any subsystem fault denies access."
          nodes={["RFID reader", "Keypad (PIN)", "Microcontroller", "Access / Log"]}
        />
      }
    />
  );
}
