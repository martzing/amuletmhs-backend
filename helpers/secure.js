const bcrypt = require('bcrypt')

module.exports = {
  generatePassword: (plain) => {
    const salt = bcrypt.genSaltSync(5)
    const hash = bcrypt.hashSync(plain, salt)
    return hash
  },
  verifyPassword: (plain, hash) => {
    return bcrypt.compareSync(plain, hash)
  }
}