const adapter = require('controllers/invest-devidend/invest-devidend.api')

module.exports = [
  {
    method: 'POST',
    path: '/invest',
    handler: adapter.createInvestmentTransactionAdapter,
  },
  {
    method: 'PATCH',
    path: '/invest',
    handler: adapter.updateInvestmentTransactiontionAdapter,
  },
  {
    method: 'GET',
    path: '/invest',
    handler: adapter.getInvestmentTransactionsAdapter,
  },
  {
    method: 'GET',
    path: '/invest/:investment_tid',
    handler: adapter.getInvestmentTransactionAdapter,
  },
]
