import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import faviconAsset from "../assets/favicon.png.asset.json";
import { reportLovableError } from "../lib/lovable-error-reporting";

const SITE_URL = "https://asritha.dev";
const OG_IMAGE_URL = "https://asritha.dev/og-image.jpg";
const SITE_DESC =
  "Software engineer at Goldman Sachs building API gateway infrastructure, cloud tooling, and observability for distributed systems.";

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-hairline bg-background/85">
        <div className="mx-auto flex max-w-[1024px] items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="mono-label !font-bold !text-text-primary !text-base">
            Asritha Nibhanupudi
          </Link>
          <Link to="/" className="mono-label hover:!text-terra">
            ← Home
          </Link>
        </div>
      </header>
      <main className="mx-auto flex min-h-[70vh] max-w-[720px] flex-col justify-center px-6 py-20 md:px-10">
        <p className="mono-label">404 · NOT FOUND</p>
        <h1 className="font-serif-display mt-4 text-[clamp(34px,5vw,52px)]">
          This page took an unexpected{" "}
          <em className="italic" style={{ color: "var(--accent-terra)" }}>route</em>.
        </h1>
        <p className="mt-6 max-w-[55ch] text-[18px] text-text-secondary">
          The link may be outdated, or the page may have moved.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-[3px] bg-terra px-5 py-3 text-[15px] font-medium text-panel transition-colors hover:bg-terra-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
          >
            Return home
          </Link>
          <Link
            to="/work"
            className="rounded-[3px] border border-hairline bg-panel px-5 py-3 text-[15px] font-medium transition-colors hover:bg-warm-fill focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
          >
            View my work
          </Link>
        </div>
      </main>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif-display text-2xl">This page didn't load</h1>
        <p className="mt-2 text-sm text-text-secondary">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-[3px] bg-terra px-4 py-2 text-sm text-panel hover:bg-terra-dark">Try again</button>
          <a href="/" className="rounded-[3px] border border-hairline px-4 py-2 text-sm hover:bg-warm-fill">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#C75A37" },
      { httpEquiv: "Cache-Control", content: "no-cache, no-store, must-revalidate" },
      { httpEquiv: "Pragma", content: "no-cache" },
      { httpEquiv: "Expires", content: "0" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Asritha Nibhanupudi" },
      { property: "og:locale", content: "en_US" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", href: faviconAsset.url },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Asritha Nibhanupudi",
          url: SITE_URL,
          image: OG_IMAGE_URL,
          jobTitle: "Software Engineer",
          worksFor: { "@type": "Organization", name: "Goldman Sachs" },
          description: SITE_DESC,
          sameAs: [
            "https://github.com/Asritha7",
            "https://www.linkedin.com/in/asritha-nibhanupudi/",
          ],
        }),
      },
      // Privacy-conscious analytics (Plausible). No cookies, no PII.
      // Counts on production domain only; no-op on previews.
      {
        defer: true,
        "data-domain": "asritha.dev",
        src: "https://plausible.io/js/script.tagged-events.js",
      },
      {
        children:
          "window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}",
      },
    ],
  }),


  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
