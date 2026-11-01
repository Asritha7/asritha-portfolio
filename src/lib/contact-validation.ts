import { z } from "zod";

const MAX_BODY_BYTES = 16_384;
const fields = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(2000),
  website: z.string().max(2000).optional(),
});

type ContactInput = z.infer<typeof fields>;
type ValidationResult =
  | { ok: true; spam: true }
  | { ok: true; spam: false; data: ContactInput }
  | { ok: false; status: number; error: string };

export async function validateContactRequest(request: Request): Promise<ValidationResult> {
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return { ok: false, status: 415, error: "Please submit the contact form as JSON." };
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return { ok: false, status: 413, error: "Message is too large." };
  }
  const reader = request.body?.getReader();
  if (!reader) return { ok: false, status: 400, error: "Invalid contact form." };
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return { ok: false, status: 413, error: "Message is too large." };
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
    const body: unknown = JSON.parse(text);
    if (
      typeof body === "object" &&
      body !== null &&
      "website" in body &&
      typeof body.website === "string" &&
      body.website.trim() !== ""
    ) {
      return { ok: true, spam: true };
    }
    const result = fields.safeParse(body);
    if (!result.success) {
      return { ok: false, status: 400, error: "Please check your name, email, and message." };
    }
    return { ok: true, spam: false, data: result.data };
  } catch {
    return { ok: false, status: 400, error: "Invalid contact form." };
  } finally {
    reader.releaseLock();
  }
}
