const fs = require('fs')
const path = require('path')
const { Sequelize, DataTypes, Op } = require('sequelize')
const logger = require('helpers/logger')

let db = {}
let isInit = false

const promiseErrorHandler = (callback, customMessage, error) => {
  let msg
  let info

  // If no specify customMessage, error will be undefined
  if (typeof error === 'undefined') {
    error = customMessage
    msg = error.message
  } else if (typeof customMessage === 'string') {
    msg = customMessage
  } else if (typeof customMessage === 'object') {
    msg = customMessage.msg
    info = customMessage.info
  } else {
    msg = error.message
  }

  logger.error(error)

  if (error instanceof Sequelize.Error) {
    const _err = { err: 1, info, msg: `Please try again later. (${msg})` }
    return callback(_err)
  }

  return callback({ err: 1, msg: error.message })
}

const recursiveLookForModelFile = (sequelize, dir) => {
  fs.readdirSync(dir)
    .filter(file => (file.toLowerCase().indexOf('.func.js') < 0 && (file !== 'index.js')))
    .forEach((file) => {
      if (file.indexOf('.js') >= 0) {
        // const model = sequelize.import(path.join(dir, file))
        const model = require(path.join(dir, file))(sequelize, DataTypes)
        db[model.name] = model
      } else {
        // directory
        recursiveLookForModelFile(sequelize, path.join(dir, file))
      }
    })
}

const init = (options) => {
  const opts = options || {
    dbName: 'test',
    username: 'root',
    password: 'root',
  }

  logger.debug('------> ModelSql Initializing <------')

  db = {}
  const sequelize = new Sequelize(
    opts.dbName,
    opts.username,
    opts.password,
    opts.options)

  recursiveLookForModelFile(sequelize, __dirname)

  Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db)
    }
  })

  db.sequelize = sequelize || undefined
  db.Sequelize = Sequelize
  db.SequelizeErrorHandler = promiseErrorHandler
  db.Op = Op

  logger.debug('------> ModelSql Loaded <------')

  isInit = true

  return db
}

module.exports = (options) => {
  if (isInit) {
    logger.debug('Load model!')
    return db
  }

  if (typeof options === 'object') {
    logger.debug('Init model!')
    return init(options)
  }

  logger.warn('Using module without init. (pass {config} to options)')
  return false
}

module.exports.dispose = function dispose() {
  isInit = false
  db = undefined

  logger.debug('------> ModelSql Disposed <------')
}

module.exports.begin = ({
  models: { sequelize },
  options,
}) => {
  const opts = options || {
    autocommit: false,
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
  }
  return sequelize.transaction(opts)
}
module.exports.commit = ({ transaction }) => (transaction.commit())
module.exports.rollback = ({ transaction }) => (transaction.rollback())
