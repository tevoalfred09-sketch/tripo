const { verify, parse } = require("./_session");

module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const p = verify(parse(req).tripo_session, process.env.SESSION_SECRET);
  res.status(200).json({ user: p ? { id: p.id, name: p.name, email: p.email, picture: p.picture } : null });
};
