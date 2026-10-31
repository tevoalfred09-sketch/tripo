const crypto = require("crypto");
const b64 = (s) => Buffer.from(s).toString("base64url");
const mac = (body, secret) => crypto.createHmac("sha256", secret).update(body).digest("base64url");

function sign(payload, secret) {
  const body = b64(JSON.stringify(payload));
  return body + "." + mac(body, secret);
}
function verify(token, secret) {
  if (!token || !secret) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const a = Buffer.from(sig), c = Buffer.from(mac(body, secret));
  if (a.length !== c.length || !crypto.timingSafeEqual(a, c)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString());
    return p.exp > Date.now() / 1000 ? p : null;
  } catch { return null; }
}
const cookie = (name, val, maxAge) =>
  `${name}=${val}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
function parse(req) {
  const o = {};
  (req.headers.cookie || "").split(";").forEach((c) => {
    const i = c.indexOf("=");
    if (i > 0) o[c.slice(0, i).trim()] = c.slice(i + 1).trim();
  });
  return o;
}
module.exports = { sign, verify, cookie, parse };
