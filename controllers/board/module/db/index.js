const { db } = require('configs')
const models = require('models')(db)

// use this pattern when need to pass object to function
const dbTransaction = require('controllers/board/module/db/db.transaction')({ models })
const dbGet = require('controllers/board/module/db/db.get')({ models })
const dbCreate = require('controllers/board/module/db/db.create')({ models })
const dbUpdate = require('controllers/board/module/db/db.update')({ models })

module.exports = {
  ...dbTransaction,
  ...dbGet,
  ...dbCreate,
  ...dbUpdate,
}
