const logger = require('helpers/logger')
const db = require('controllers/user/module/db')
const validate = require('controllers/user/module/validate')
const ctrl = require('controllers/user/user.ctrl')
// const func = require('controllers/auth/auth.func')

module.exports = {
  getUsers: async (req, res) => {
    try {
      const { value } = await validate.getUsers(req)
      const result = await ctrl.getUsers({
        func: { db, },
        data: value,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
}
