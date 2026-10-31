// Sends the (public) Google Client ID to the page, so you only set it once in Vercel.
module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ clientId: process.env.GOOGLE_CLIENT_ID || "" });
};
