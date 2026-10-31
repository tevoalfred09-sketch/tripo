const { cookie } = require("./_session");

module.exports = (req, res) => {
  res.setHeader("Set-Cookie", cookie("tripo_session", "", 0));
  res.status(200).json({ ok: true });
};
