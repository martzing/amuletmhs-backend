const adapter = require('controllers/purchase-order/purchase-order.api')

module.exports = [
  {
    method: 'POST',
    path: '/',
    handler: adapter.createPurchaseOrderAdapter,
  },
  {
    method: 'PATCH',
    path: '/',
    handler: adapter.updatePurchaseOrderAdapter,
  },
  {
    method: 'GET',
    path: '/',
    handler: adapter.getPurchaseOrdersAdapter,
  },
  {
    method: 'POST',
    path: '/list',
    handler: adapter.createPurchaseOrderListAdapter,
  },
  {
    method: 'PATCH',
    path: '/list',
    handler: adapter.updatePurchaseOrderListAdapter,
  },
  {
    method: 'GET',
    path: '/list',
    handler: adapter.getPurchaseOrderListsAdapter,
  },
  {
    method: 'POST',
    path: '/util-pay',
    handler: adapter.createUtilityPaymentAdapter,
  },
  {
    method: 'PATCH',
    path: '/util-pay',
    handler: adapter.updateUtilityPaymentAdapter,
  },
  {
    method: 'GET',
    path: '/util-pay',
    handler: adapter.getUtilityPaymentsAdapter,
  },
  {
    method: 'GET',
    path: '/:purchase_order_id',
    handler: adapter.getPurchaseOrderAdapter,
  },
  {
    method: 'GET',
    path: '/util-pay/:utility_payment_id',
    handler: adapter.getUtilityPaymentAdapter,
  },
]
