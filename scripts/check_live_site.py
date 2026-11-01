#!/usr/bin/env python3
"""Read-only published-site checks from a GitHub-hosted runner.

No secret tokens, login, contact-form submission or deployment required.
"""
import html
from html.parser import HTMLParser
import json
import socket
import sys
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

HOST = "asritha.dev"
PATHS = ("/", "/work", "/work/runreviq", "/work/job-intake-service", "/sitemap.xml")


class HeadInspector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.canonicals = []
        self.description = []
        self.links = []
    def handle_starttag(self, tag, attrs):
        fields = dict(attrs)
        if tag == "title":
            self.in_title = True
        if tag == "link" and fields.get("rel") == "canonical":
            self.canonicals.append(fields.get("href", ""))
        if tag == "meta" and fields.get("name") == "description":
            self.description.append(fields.get("content", ""))
        if tag == "a" and "href" in fields:
            self.links.append(fields["href"])
    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
    def handle_data(self, data):
        if self.in_title:
            self.title += data


def check_path(path):
    url = "https://" + HOST + path
    result = {"path": path, "url": url, "ok": False}
    try:
        request = Request(url, headers={"User-Agent": "PortfolioSmokeCheck/1.0"})
        with urlopen(request, timeout=15) as response:
            result["status"] = response.status
            result["final_url"] = response.geturl()
            result["content_type"] = response.headers.get("Content-Type", "")
            body = response.read(500_000).decode("utf-8", "replace")
        if response.status != 200:
            result["problem"] = "Unexpected HTTP status"
            return result
        if path == "/sitemap.xml":
            result["sitemap_has_runreviq"] = "/work/runreviq" in body
            result["sitemap_has_job_intake"] = "/work/job-intake-service" in body
            result["ok"] = (result["sitemap_has_runreviq"]
                            and result["sitemap_has_job_intake"]
                            and "xml" in result["content_type"].lower())
            if not result["ok"]:
                result["problem"] = "Sitemap missing expected routes or XML content type"
            return result
        inspector = HeadInspector()
        inspector.feed(body)
        result.update({"title": html.unescape(inspector.title).strip(),
                       "canonical": inspector.canonicals,
                       "description_present": bool(inspector.description and inspector.description[0].strip()),
                       "html_bytes_checked": len(body.encode("utf-8"))})
        expected = url.rstrip("/") if path != "/" else "https://" + HOST
        normalized = [c.rstrip("/") for c in inspector.canonicals]
        result["ok"] = (bool(result["title"]) and result["description_present"]
                        and expected in normalized)
        if not result["ok"]:
            result["problem"] = "Missing title, description, or matching canonical"
        if path == "/":
            result["mentions_runreviq"] = "Runreviq" in body
            result["mentions_job_intake"] = "Job Intake Service" in body
            result["ok"] = result["ok"] and result["mentions_runreviq"] and result["mentions_job_intake"]
            if not result["ok"] and not result.get("problem"):
                result["problem"] = "Homepage HTML does not expose both projects"
        return result
    except (HTTPError, URLError, TimeoutError, OSError) as error:
        result["problem"] = type(error).__name__ + ": " + str(error)[:180]
        return result


def main():
    try:
        addresses = sorted({item[4][0] for item in socket.getaddrinfo(HOST, 443, type=socket.SOCK_STREAM)})
        dns = {"ok": bool(addresses), "addresses": addresses}
    except OSError as error:
        dns = {"ok": False, "problem": type(error).__name__ + ": " + str(error)[:180]}
    results = [check_path(p) for p in PATHS] if dns["ok"] else [
        {"path": p, "ok": False, "problem": "DNS resolution failed"} for p in PATHS
    ]
    output = {"dns": dns, "results": results}
    with open("live-site-smoke-report.json", "w", encoding="utf-8") as file:
        json.dump(output, file, indent=2)
    lines = ["## Published portfolio smoke check", "",
             f"**DNS:** {'PASS' if dns['ok'] else 'FAIL'}", "",
             "| URL path | Result | Details |", "|---|---|---|"]
    for r in results:
        description = str(r.get("problem") or r.get("status") or "").replace("|", "/")
        lines.append(f"| `{r['path']}` | {'PASS' if r['ok'] else 'FAIL'} | {description} |")
    lines.extend(["", "This checks public HTTP/HTML only. It cannot prove visual layout, interactions, contact form delivery, or which Lovable revision is deployed.", ""])
    summary = "\n".join(lines)
    print(summary)
    import os
    if os.getenv("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as file:
            file.write(summary)
    return 0 if dns["ok"] and all(r["ok"] for r in results) else 1


if __name__ == "__main__":
    sys.exit(main())
