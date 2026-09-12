import { createFileRoute } from "@tanstack/react-router";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const TO_EMAIL = "nibhanupudiasritha@gmail.com";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          const RESEND_API_KEY = process.env.RESEND_API_KEY;
          if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
            return Response.json({ error: "Email service not configured" }, { status: 500 });
          }

          const body = (await request.json()) as {
            name?: string;
            email?: string;
            message?: string;
            website?: string;
          };

          // Honeypot
          if (body.website && body.website.trim() !== "") {
            return Response.json({ ok: true });
          }

          const name = (body.name ?? "").trim();
          const email = (body.email ?? "").trim();
          const message = (body.message ?? "").trim();

          if (!name || name.length > 100) {
            return Response.json({ error: "Invalid name" }, { status: 400 });
          }
          if (!email || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return Response.json({ error: "Invalid email" }, { status: 400 });
          }
          if (!message || message.length > 2000) {
            return Response.json({ error: "Invalid message" }, { status: 400 });
          }

          const subject = `Portfolio inquiry from ${name}`;
          const html = `
            <div style="font-family: ui-sans-serif, system-ui, sans-serif; color: #241E19; line-height: 1.55;">
              <p style="margin:0 0 16px"><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt; wrote:</p>
              <div style="white-space: pre-wrap; padding: 16px; background:#FBF3EA; border:1px solid #ECE0D2; border-radius: 3px;">${escapeHtml(message)}</div>
              <p style="margin-top:16px; font-size:12px; color:#8A7F74;">Sent from asritha.dev contact form</p>
            </div>
          `;

          const res = await fetch(`${GATEWAY_URL}/emails`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "X-Connection-Api-Key": RESEND_API_KEY,
            },
            body: JSON.stringify({
              from: "Portfolio Contact <onboarding@resend.dev>",
              to: [TO_EMAIL],
              reply_to: email,
              subject,
              html,
            }),
          });

          if (!res.ok) {
            const text = await res.text();
            console.error("Resend error", res.status, text);
            return Response.json({ error: "Failed to send" }, { status: 502 });
          }

          return Response.json({ ok: true });
        } catch (err) {
          console.error("Contact form error", err);
          return Response.json({ error: "Server error" }, { status: 500 });
        }
      },
    },
  },
});
