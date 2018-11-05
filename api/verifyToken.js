const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;

const verifyToken = (token) => {
  // console.log(`inside verifyToken`)
  let result;

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      result = err
    }

    result = decoded
  })

  // console.log(`verifyToken result:`, result)
  return result
};

module.exports = verifyToken;