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

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif-display text-7xl">404</h1>
        <h2 className="mt-4 font-serif-display text-2xl">Page not found</h2>
        <p className="mt-2 text-sm text-text-secondary">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-[3px] bg-terra px-4 py-2 text-sm font-medium text-panel transition-colors hover:bg-terra-dark">
            Go home
          </Link>
        </div>
      </div>
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
      { title: "Asritha Nibhanupudi - Software Engineer" },
      { name: "description", content: "Analyst, Systems Engineering at Goldman Sachs. Cloud platform engineering & distributed systems." },
      { name: "author", content: "Asritha Nibhanupudi" },
      { property: "og:title", content: "Asritha Nibhanupudi - Software Engineer" },
      { property: "og:description", content: "Analyst, Systems Engineering at Goldman Sachs. Cloud platform engineering & distributed systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Asritha Nibhanupudi - Software Engineer" },
      { name: "twitter:description", content: "Analyst, Systems Engineering at Goldman Sachs. Cloud platform engineering & distributed systems." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/177295f5-81f1-45f5-b5f8-f9af2b3369b3" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/177295f5-81f1-45f5-b5f8-f9af2b3369b3" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: faviconAsset.url },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
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
