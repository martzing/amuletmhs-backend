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
    method: 'POST',
    path: '/dividend',
    handler: adapter.createDividendTransactionAdapter,
  },
  {
    method: 'PATCH',
    path: '/dividend',
    handler: adapter.updateDividendTransactionAdapter,
  },
  {
    method: 'GET',
    path: '/dividend',
    handler: adapter.getDividendTransactionsAdapter,
  },
  {
    method: 'GET',
    path: '/invest/:investment_tid',
    handler: adapter.getInvestmentTransactionAdapter,
  },
  {
    method: 'GET',
    path: '/dividend/:dividend_tid',
    handler: adapter.getDividendTransactionAdapter,
  },
]
