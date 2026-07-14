export const QATOUCH_API_TOKEN = process.env.QATOUCH_API_TOKEN;
export const QATOUCH_DOMAIN = process.env.QATOUCH_DOMAIN;
export const DEBUG = process.env.DEBUG === "true";

if (!QATOUCH_API_TOKEN || !QATOUCH_DOMAIN) {
  throw new Error(
      "QATOUCH_API_TOKEN and QATOUCH_DOMAIN are required"
  );
}