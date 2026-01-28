const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

module.exports.verifyUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ status: false });

  jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
    if (err) return res.json({ status: false });

    const user = await User.findById(decoded.id);
    if (!user) return res.json({ status: false });

    res.json({ status: true, user: user.username });
  });
};
