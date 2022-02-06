const fs = require('fs')
const logger = require('helpers/logger')

module.exports = async (app) => {
  const normalizedPath = require('path').join(__dirname)

  fs.readdirSync(normalizedPath)
    .filter((file) => {
      return (file.indexOf('.') > 0) && (file !== 'index.js')
    })
    .sort((a, b) => {
      return a < b ? -1 : 1
    })
    .forEach((file, key) => {    
      logger.info(`Load ${file}`)
      require(`./${file}`)(app)      
    })
}