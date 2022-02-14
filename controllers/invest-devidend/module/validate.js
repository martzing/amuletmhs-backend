const Joi = require('joi')

module.exports = {
  getInvestmentTransaction: async (req) => {
    const data = {
      investmentTid: req.params.investment_tid,
    }
    const schema = Joi.object({
      investmentTid: Joi.number().integer().positive().required(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  getInvestmentTransactions: async (req) => {
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
  createInvestmentTransaction: async (req) => {
    const data = {
      user_id: req.get('x-user-id'),
      from_user_id: req.body.from_user_id,
      amount: req.body.amount,
      bank_slip_image: req.body.bank_slip_image,
      remark: req.body.remark,
    }
    const schema = Joi.object({
      user_id: Joi.number().integer().positive().required(),
      from_user_id: Joi.number().integer().positive().required(),
      amount: Joi.number().positive().required(),
      bank_slip_image: Joi.string().required(),
      remark: Joi.string().optional(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  updateInvestmentTransaction: async (req) => {
    const data = {
      investmentTid: req.body.investment_tid,
      value: {},
    }
    if (req.body.from_user_id !== undefined) data.value.from_user_id = req.body.from_user_id
    if (req.body.amount !== undefined) data.value.amount = req.body.amount
    if (req.body.bank_slip_image !== undefined) data.value.bank_slip_image = req.body.bank_slip_image
    if (req.body.remark !== undefined) data.value.remark = req.body.remark
    const schema = Joi.object({
      investmentTid: Joi.number().integer().positive().required(),
      value: Joi.object({
        from_user_id: Joi.number().integer().positive().optional(),
        amount: Joi.number().positive().optional(),
        bank_slip_image: Joi.string().optional(),
        remark: Joi.string().optional(),
      }),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  getDividendTransaction: async (req) => {
    const data = {
      dividendTid: req.params.dividend_tid,
    }
    const schema = Joi.object({
      dividendTid: Joi.number().integer().positive().required(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  getDividendTransactions: async (req) => {
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
  createDividendTransaction: async (req) => {
    const data = {
      user_id: req.get('x-user-id'),
      to_user_id: req.body.to_user_id,
      amount: req.body.amount,
      bank_slip_image: req.body.bank_slip_image,
      remark: req.body.remark,
    }
    const schema = Joi.object({
      user_id: Joi.number().integer().positive().required(),
      to_user_id: Joi.number().integer().positive().required(),
      amount: Joi.number().positive().required(),
      bank_slip_image: Joi.string().required(),
      remark: Joi.string().optional(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  updateDividendTransaction: async (req) => {
    const data = {
      dividendTid: req.body.dividend_tid,
      value: {},
    }
    if (req.body.to_user_id !== undefined) data.value.to_user_id = req.body.to_user_id
    if (req.body.amount !== undefined) data.value.amount = req.body.amount
    if (req.body.bank_slip_image !== undefined) data.value.bank_slip_image = req.body.bank_slip_image
    if (req.body.remark !== undefined) data.value.remark = req.body.remark
    const schema = Joi.object({
      dividendTid: Joi.number().integer().positive().required(),
      value: Joi.object({
        to_user_id: Joi.number().integer().positive().optional(),
        amount: Joi.number().positive().optional(),
        bank_slip_image: Joi.string().optional(),
        remark: Joi.string().optional(),
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
