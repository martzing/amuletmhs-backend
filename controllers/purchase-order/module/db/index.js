const { db } = require('configs')
const models = require('models')(db)

// use this pattern when need to pass object to function
const dbTransaction = require('controllers/purchase-order/module/db/db.transaction')({ models })
const dbGet = require('controllers/purchase-order/module/db/db.get')({ models })
const dbCreate = require('controllers/purchase-order/module/db/db.create')({ models })
const dbUpdate = require('controllers/purchase-order/module/db/db.update')({ models })

module.exports = {
  ...dbTransaction,
  ...dbGet,
  ...dbCreate,
  ...dbUpdate,
}
