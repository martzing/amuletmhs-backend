const logger = require('helpers/logger')
const db = require('controllers/user/module/db')
const validate = require('controllers/user/module/validate')
const ctrl = require('controllers/user/user.ctrl')
const secure = require('helpers/secure')

const jwt = require('jsonwebtoken')
const secret = 'shhhhh'

module.exports = {
  loginAdapter: async (req, res) => {
    try {
      const data = await validate.login(req)
      const result = await ctrl.login({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  changePasswordAdapter: async (req, res) => {
    try {
      const data = await validate.changePassword(req)
      const result = await ctrl.changePassword({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  getUsers: async (req, res) => {
    try {
      const result = await ctrl.getUsers({
        func: { db, },
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  genPassword: async (req, res) => {
    try {
      const password = secure.generatePassword('1234')
      return res.json({ password })
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  verifyPassword: async (req, res) => {
    try {
      const verify = secure.verifyPassword('12345', '$2b$05$24Xc1evOFla6PMLZSF8cV.4Qwc.TOB1X1fAkTTOk61PvGMUg51/q6')
      return res.json({ verify })
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  genToken: async (req, res) => {
    try {
      const token = jwt.sign({ foo: 'bar' }, secret)
      return res.json({ token })
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  verifyToken: async (req, res) => {
    try {
      const decoded = jwt.verify(req.query.token, 'secret')
      console.log(decoded.foo)
      return res.json(decoded)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
}
