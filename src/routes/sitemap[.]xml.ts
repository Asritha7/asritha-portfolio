import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://asritha.dev";

const entries = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/work", changefreq: "weekly", priority: "0.9" },
  { path: "/notes", changefreq: "monthly", priority: "0.6" },
  { path: "/work/aws-microservices-cdk-ecs", changefreq: "monthly", priority: "0.8" },
  { path: "/work/automation-framework", changefreq: "monthly", priority: "0.8" },
  { path: "/work/keycloak-identity-flow", changefreq: "monthly", priority: "0.8" },
  { path: "/work/kafka-strimzi-upgrade", changefreq: "monthly", priority: "0.8" },
  { path: "/work/kubernetes-cicd-reliability", changefreq: "monthly", priority: "0.8" },
  { path: "/work/rfid-pin-authentication-research", changefreq: "monthly", priority: "0.7" },
  { path: "/notes/keycloak-configuration-drift", changefreq: "monthly", priority: "0.5" },
  { path: "/notes/kafka-strimzi-upgrade-checklist", changefreq: "monthly", priority: "0.5" },
  { path: "/notes/kubernetes-deployment-debugging", changefreq: "monthly", priority: "0.5" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries
          .map((e) =>
            [
              `  <url>`,
              `    <loc>${BASE_URL}${e.path}</loc>`,
              `    <changefreq>${e.changefreq}</changefreq>`,
              `    <priority>${e.priority}</priority>`,
              `  </url>`,
            ].join("\n"),
          )
          .join("\n");

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
