const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;

const setCookie = (id, res) => {
  const payload = { id };
  const token = jwt.sign(payload, secret, { expiresIn: "2 days" });

  res.cookie("token", token, { httpOnly: true });
};

const removeCookie = res => {
  res.clearCookie("token");
};

module.exports = {
  set: setCookie,
  remove: removeCookie
}