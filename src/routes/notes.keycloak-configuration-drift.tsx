import { createFileRoute, notFound } from "@tanstack/react-router";
import { NoteArticle } from "@/components/NoteArticle";
import { ENGINEERING_NOTES } from "@/content/portfolio";

const SLUG = "automating-keycloak-identity-workflows";
const URL = "https://asritha.dev/notes/keycloak-configuration-drift";

export const Route = createFileRoute("/notes/keycloak-configuration-drift")({
  head: () => {
    const n = ENGINEERING_NOTES.find((x) => x.slug === SLUG);
    const title = n ? `${n.title} - Engineering Notes` : "Engineering Note";
    const desc = n?.summary ?? "Engineering note.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: URL },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
      links: [{ rel: "canonical", href: URL }],
    };
  },
  component: Page,
});

function Page() {
  const note = ENGINEERING_NOTES.find((n) => n.slug === SLUG);
  if (!note) throw notFound();
  return <NoteArticle note={note} />;
}
