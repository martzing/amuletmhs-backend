const CustomError = require('helpers/custom-error')
const logger = require('helpers/logger')
const secure = require('helpers/secure')
const uuid = require('uuid')
const moment = require('helpers/moment')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const privateKey = fs.readFileSync('configs/key/rsa.private')

module.exports = {
  getUsers: async ({
    func: { db },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const users = await db.getUsers({ dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      const result = users.map((user) => ({
        user_id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        display_name: user.display_name,
      }))
      return result
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  login: async ({
    func: { db },
    data: {
      username,
      password,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const user = await db.getUserByUsername({ username, dbTxn })
      if (!user) {
        throw new CustomError('Username is incorrect.')
      }
      verify = secure.verifyPassword(password, user.password)
      if (!verify) {
        throw new CustomError('Password is incorrect.')
      }
      const value = {
        id: uuid.v4().replace(/-/g, ''),
        user_id: user.id,
        expired_at: moment().add(2, 'h')
      }
      const userToken = await db.createToken({ value, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      const jwtOption = {
        algorithm: 'RS256',
        expiresIn: '2h'
      }
      const token = jwt.sign({ id: userToken.id }, privateKey, jwtOption)
      return { token }
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  changePassword: async ({
    func: { db },
    data: {
      userId,
      oldPassword,
      newPassword,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const user = await db.getUser({ id: userId, dbTxn })
      if (!user) {
        throw new CustomError('User not found.')
      }
      verify = secure.verifyPassword(oldPassword, user.password)
      if (!verify) {
        throw new CustomError('Password is incorrect.')
      }
      const newPasswordHash = secure.generatePassword(newPassword)
      await db.updateUser({
        id: user.id,
        value: { password: newPasswordHash },
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return { msg: 'success' }
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
}
