const Joi = require('joi')

module.exports = {
  getPurchaseOrder: async (req) => {
    const data = {
      purchaseOrderId: req.params.purchase_order_id,
    }
    const schema = Joi.object({
      purchaseOrderId: Joi.number().integer().positive().required(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  getPurchaseOrders: async (req) => {
    const data = {
      offset: req.query.offset,
      limit: req.query.limit,
      searchText: req.query.search_text,
    }
    const schema = Joi.object({
      offset: Joi.number().integer().min(0).optional(),
      limit: Joi.number().integer().positive().optional(),
      searchText: Joi.string().optional(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  createPurchaseOrder: async (req) => {
    const data = {
      user_id: req.get('x-user-id'),
      supplier_name: req.body.supplier_name,
      total_price: req.body.total_price,
      bank_slip_image: req.body.bank_slip_image,
      receipt_image: req.body.receipt_image,
    }
    const schema = Joi.object({
      user_id: Joi.number().integer().positive().required(),
      supplier_name: Joi.string().required(),
      total_price: Joi.number().positive().required(),
      bank_slip_image: Joi.string().optional(),
      receipt_image: Joi.string().optional(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  updatePurchaseOrder: async (req) => {
    const data = {
      purchaseOrderId: req.body.purchase_order_id,
      value: {},
    }
    if (req.body.supplier_name !== undefined) data.value.supplier_name = req.body.supplier_name
    if (req.body.total_price !== undefined) data.value.total_price = req.body.total_price
    if (req.body.bank_slip_image !== undefined) data.value.bank_slip_image = req.body.bank_slip_image
    if (req.body.receipt_image !== undefined) data.value.receipt_image = req.body.receipt_image
    const schema = Joi.object({
      purchaseOrderId: Joi.number().integer().positive().required(),
      value: Joi.object({
        supplier_name: Joi.string().optional(),
        total_price: Joi.number().positive().optional(),
        bank_slip_image: Joi.string().optional(),
        receipt_image: Joi.string().optional(),
      }),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  getPurchaseOrderLists: async (req) => {
    const data = {
      purchaseOrderId: req.query.purchase_order_id,
    }
    const schema = Joi.object({
      purchaseOrderId: Joi.number().integer().positive().required(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  createPurchaseOrderList: async (req) => {
    const data = {
      purchase_order_id: req.body.purchase_order_id,
      reward_type_id: req.body.reward_type_id,
      quantity: req.body.quantity,
      price_per_unit: req.body.price_per_unit,
      image: req.body.image,
    }
    const schema = Joi.object({
      purchase_order_id: Joi.number().integer().positive().required(),
      reward_type_id: Joi.number().integer().positive().required(),
      quantity: Joi.number().integer().positive().required(),
      price_per_unit: Joi.number().positive().required(),
      image: Joi.string().optional(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  updatePurchaseOrderList: async (req) => {
    const data = {
      purchaseOrderListId: req.body.purchase_order_list_id,
      value: {},
    }
    if (req.body.reward_type_id !== undefined) data.value.reward_type_id = req.body.reward_type_id
    if (req.body.quantity !== undefined) data.value.quantity = req.body.quantity
    if (req.body.price_per_unit !== undefined) data.value.price_per_unit = req.body.price_per_unit
    if (req.body.image !== undefined) data.value.image = req.body.image
    const schema = Joi.object({
      purchaseOrderListId: Joi.number().integer().positive().required(),
      value: Joi.object({
        reward_type_id: Joi.number().integer().positive().optional(),
        quantity: Joi.number().integer().positive().optional(),
        price_per_unit: Joi.number().positive().optional(),
        image: Joi.string().optional(),
      }),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  getUtilityPayment: async (req) => {
    const data = {
      utilityPaymentId: req.params.utility_payment_id,
    }
    const schema = Joi.object({
      utilityPaymentId: Joi.number().integer().positive().optional(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  getUtilityPayments: async (req) => {
    const data = {
      offset: req.query.offset,
      limit: req.query.limit,
      searchText: req.query.search_text,
    }
    const schema = Joi.object({
      offset: Joi.number().integer().min(0).optional(),
      limit: Joi.number().integer().positive().optional(),
      searchText: Joi.string().optional(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  createUtilityPayment: async (req) => {
    const data = {
      user_id: req.get('x-user-id'),
      name: req.body.name,
      price: req.body.price,
      bank_slip_image: req.body.bank_slip_image,
      receipt_image: req.body.receipt_image,
    }
    const schema = Joi.object({
      user_id: Joi.number().integer().positive().required(),
      name: Joi.string().required(),
      price: Joi.number().positive().required(),
      bank_slip_image: Joi.string().optional(),
      receipt_image: Joi.string().optional(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  updateUtilityPayment: async (req) => {
    const data = {
      utilityPaymentId: req.body.utility_payment_id,
      value: {},
    }
    if (req.body.name !== undefined) data.value.name = req.body.name
    if (req.body.price !== undefined) data.value.price = req.body.price
    if (req.body.bank_slip_image !== undefined) data.value.bank_slip_image = req.body.bank_slip_image
    if (req.body.receipt_image !== undefined) data.value.receipt_image = req.body.receipt_image
    const schema = Joi.object({
      utilityPaymentId: Joi.number().integer().positive().required(),
      value: Joi.object({
        name: Joi.string().optional(),
        price: Joi.number().positive().optional(),
        bank_slip_image: Joi.string().optional(),
        receipt_image: Joi.string().optional(),
      }),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
}
