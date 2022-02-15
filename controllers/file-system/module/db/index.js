const { db } = require('configs')
const models = require('models')(db)

// use this pattern when need to pass object to function
const dbTransaction = require('controllers/file-system/module/db/db.transaction')({ models })
const dbGet = require('controllers/file-system/module/db/db.get')({ models })
const dbCreate = require('controllers/file-system/module/db/db.create')({ models })
const dbUpdate = require('controllers/file-system/module/db/db.update')({ models })

module.exports = {
  ...dbTransaction,
  ...dbGet,
  ...dbCreate,
  ...dbUpdate,
}
