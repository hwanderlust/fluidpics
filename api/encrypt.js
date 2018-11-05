const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT;

module.exports = (password) => {

  const salt = bcrypt.genSaltSync(parseInt(saltRounds, 10));
  const hash = bcrypt.hashSync(password, salt);
  
  return hash;
}