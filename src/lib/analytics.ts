// Privacy-conscious analytics wrapper.
// No-op when window.plausible is missing. Never sends form contents or PII.

type AnalyticsEvent =
  | "case_study_opened"
  | "resume_downloaded"
  | "github_opened"
  | "linkedin_opened"
  | "research_opened"
  | "contact_started"
  | "contact_submitted"
  | "work_filter_selected";

type PlausibleFn = (
  event: string,
  options?: { props?: Record<string, string | number | boolean> },
) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

export function track(
  event: AnalyticsEvent,
  props?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  const fn = window.plausible;
  if (typeof fn !== "function") return;
  try {
    fn(event, props ? { props } : undefined);
  } catch {
    // never let analytics break the UI
  }
}
