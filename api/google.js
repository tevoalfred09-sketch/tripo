const { OAuth2Client } = require("google-auth-library");
const { sign, cookie } = require("./_session");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Receives the Google ID token, VERIFIES it with Google, then starts a session.
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const ticket = await client.verifyIdToken({
      idToken: body.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const p = ticket.getPayload();
    if (!p.email_verified) return res.status(401).json({ error: "Email not verified" });
    const user = { id: p.sub, name: p.name, email: p.email, picture: p.picture };
    const week = 60 * 60 * 24 * 7;
    const token = sign({ ...user, exp: Math.floor(Date.now() / 1000) + week }, process.env.SESSION_SECRET);
    res.setHeader("Set-Cookie", cookie("tripo_session", token, week));
    res.status(200).json({ user });
  } catch (e) {
    res.status(401).json({ error: "Invalid Google token" });
  }
};
