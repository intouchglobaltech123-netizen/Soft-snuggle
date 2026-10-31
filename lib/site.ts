/**
 * The address people reach the site at, e.g. https://soft-snuggle-production.up.railway.app.
 *
 * Behind Railway's proxy the server itself listens on http://localhost:8080,
 * so req.url points there: a redirect built from it sends the browser nowhere,
 * and Google refuses a sign-in whose return address it doesn't recognise.
 * SITE_URL wins when set (needed once a custom domain is added); otherwise the
 * proxy's forwarded host and protocol are used.
 */
export function siteOrigin(req: Request) {
  const configured = process.env.SITE_URL?.replace(/\/+$/, "");
  if (configured) return configured;
  const url = new URL(req.url);
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? url.host;
  const proto = req.headers.get("x-forwarded-proto")?.split(",")[0] ?? url.protocol.replace(":", "");
  return `${proto}://${host}`;
}

/**
 * True when a state-changing request came from one of our own pages. Browsers
 * always send Origin on fetch POSTs, so a form on another site posting here
 * (cross-site request forgery) is turned away even if the cookie went along.
 */
export function fromOwnSite(req: Request) {
  const origin = req.headers.get("origin");
  return !!origin && origin === siteOrigin(req);
}
