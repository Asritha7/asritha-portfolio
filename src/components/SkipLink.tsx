export function SkipLink({ target = "top" }: { target?: string }) {
  return (
    <a
      href={`#${target}`}
      className="sr-only fixed left-4 top-4 z-50 rounded-[3px] bg-panel px-4 py-3 text-foreground focus:not-sr-only focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
    >
      Skip to content
    </a>
  );
}
