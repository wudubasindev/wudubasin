// CSRF guard for state-changing JSON routes. Browsers always attach an Origin
// header to cross-origin POSTs, so an Origin whose host doesn't match the
// request host is rejected. Requests without an Origin header (curl,
// server-to-server) aren't riding a victim's browser session — and these
// routes are cookie-less anyway — so they pass this check and are handled by
// rate limiting instead. Do NOT apply this to the Stripe webhook: Stripe
// posts without an Origin header and is authenticated by signature.
export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// Cross-origin requests can't send Content-Type: application/json without a
// CORS preflight (which we never grant), so requiring it blocks classic
// HTML-form CSRF as a second layer.
export function isJsonRequest(request: Request): boolean {
  return (
    request.headers.get("content-type")?.toLowerCase().includes("application/json") ??
    false
  );
}

// Fixed-window in-memory rate limiter. On Vercel's Fluid Compute, instances
// are reused across requests so this meaningfully slows abuse, but it is
// per-instance and resets on cold start — for hard guarantees add a Vercel
// WAF rate-limit rule in front of these routes.
type WindowEntry = { count: number; resetAt: number };

const windows = new Map<string, WindowEntry>();
const MAX_TRACKED_KEYS = 5000;

export function rateLimit(
  request: Request,
  bucket: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): boolean {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const key = `${bucket}:${ip}`;
  const now = Date.now();

  if (windows.size > MAX_TRACKED_KEYS) {
    for (const [k, v] of windows) {
      if (v.resetAt <= now) windows.delete(k);
    }
  }

  const entry = windows.get(key);
  if (!entry || entry.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  entry.count += 1;
  return entry.count <= limit;
}
