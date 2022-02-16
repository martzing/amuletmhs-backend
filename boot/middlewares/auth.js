 
const { db } = require('configs')
const models = require('models')(db)
const { begin, commit, rollback } = require('models')
const moment = require('helpers/moment')
const CustomError = require('helpers/custom-error')

const jwt = require('jsonwebtoken')
const fs = require('fs')

const publicKey = fs.readFileSync('configs/key/rsa.public')

const AUTH_TYPE = 'auth'

const getToken = async ({ id, dbTxn }) => {
  const { Op } = models
  const options = {
    where: {
      id,
      expired_at: { [Op.gt]: moment() }
    },
    transaction: dbTxn,
  }
  const token = await models.Token.findOne(options)
  return token
} 

const checkToken = async (req, res, next) => {
  let dbTxn
  try {
    const token = req.get('Authorization') || req.get('authorization')
    const { id, iat, exp } = jwt.verify(token, publicKey)
    if (moment().unix() > exp) {
      throw new CustomError('Token is expired.')
    }
    dbTxn = await begin({ models })
    const userToken = await getToken({ id, dbTxn })
    if (!userToken) {
      throw new CustomError('Token is invalid.')
    }
    await commit({ transaction: dbTxn })
    dbTxn = undefined
    req.headers['x-user-id'] = userToken.user_id
    next()
  } catch (err) {
    if (dbTxn) await rollback({ transaction: dbTxn })
    res.json({ msg: err.message })
  }
}

module.exports = (router, _route) => {
  let result = 1
   if (typeof (_route.configs) !== 'object' || !_route.configs[AUTH_TYPE]) {
    result = 0
   } else if (_route.configs[AUTH_TYPE]) {
    router[_route.method](_route.path, checkToken)
   }
   return result
 }
