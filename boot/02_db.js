const models = require('models')
const { db } = require('configs')

module.exports = () => {
  models(db)
}