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
  createInvestmentTransaction: async ({ fields, files, req }) => {
    const data = {
      user_id: req.get('x-user-id'),
      from_user_id: fields.from_user_id,
      amount: fields.amount,
      bank_slip_image: files.bank_slip_image,
    }
    if (fields.remark !== undefined) data.remark = fields.remark
    const schema = Joi.object({
      user_id: Joi.number().integer().positive().required(),
      from_user_id: Joi.number().integer().positive().required(),
      amount: Joi.number().positive().required(),
      bank_slip_image: Joi.object().required(),
      remark: Joi.string().optional(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  updateInvestmentTransaction: async ({ fields, files, req }) => {
    const data = {
      userId: req.get('x-user-id'),
      investmentTid: fields.investment_tid,
      value: {},
    }
    if (fields.from_user_id !== undefined) data.value.from_user_id = fields.from_user_id
    if (fields.amount !== undefined) data.value.amount = fields.amount
    if (files.bank_slip_image !== undefined) data.value.bank_slip_image = files.bank_slip_image
    if (fields.remark !== undefined) data.value.remark = fields.remark
    const schema = Joi.object({
      userId: Joi.number().integer().positive().required(),
      investmentTid: Joi.number().integer().positive().required(),
      value: Joi.object({
        from_user_id: Joi.number().integer().positive().optional(),
        amount: Joi.number().positive().optional(),
        bank_slip_image: Joi.object().optional(),
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
  createDividendTransaction: async ({ fields, files, req }) => {
    const data = {
      user_id: req.get('x-user-id'),
      to_user_id: fields.to_user_id,
      amount: fields.amount,
      bank_slip_image: files.bank_slip_image,
    }
    if (fields.remark !== undefined) data.remark = fields.remark
    const schema = Joi.object({
      user_id: Joi.number().integer().positive().required(),
      to_user_id: Joi.number().integer().positive().required(),
      amount: Joi.number().positive().required(),
      bank_slip_image: Joi.object().required(),
      remark: Joi.string().optional(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  updateDividendTransaction: async ({ fields, files, req }) => {
    const data = {
      userId: req.get('x-user-id'),
      dividendTid: fields.dividend_tid,
      value: {},
    }
    if (fields.to_user_id !== undefined) data.value.to_user_id = fields.to_user_id
    if (fields.amount !== undefined) data.value.amount = fields.amount
    if (files.bank_slip_image !== undefined) data.value.bank_slip_image = files.bank_slip_image
    if (fields.remark !== undefined) data.value.remark = fields.remark
    const schema = Joi.object({
      userId: Joi.number().integer().positive().required(),
      dividendTid: Joi.number().integer().positive().required(),
      value: Joi.object({
        to_user_id: Joi.number().integer().positive().optional(),
        amount: Joi.number().positive().optional(),
        bank_slip_image: Joi.object().optional(),
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
