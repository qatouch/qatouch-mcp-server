export const QATOUCH_API_TOKEN = process.env.QATOUCH_API_TOKEN;
export const QATOUCH_DOMAIN = process.env.QATOUCH_DOMAIN;

if (!QATOUCH_API_TOKEN || !QATOUCH_DOMAIN) {
  console.error("FATAL: QATOUCH_API_TOKEN and QATOUCH_DOMAIN are required");
  process.exit(1);
}
