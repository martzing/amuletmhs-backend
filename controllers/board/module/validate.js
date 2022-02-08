const Joi = require('joi')

module.exports = {
  getBoards: async (req) => {
    const data = {
      searchText: req.query.search_text,
    }
    const schema = Joi.object({
      searchText: Joi.string().optional(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validate(data, opts)
    return result
  },
  createBoard: async (req) => {
    const data = {
      user_id: req.get('x-user-id'),
      name: req.body.name,
      cost: req.body.cost,
      total_ticket: req.body.total_ticket,
      ticket_price: req.body.ticket_price,
    }
    const schema = Joi.object({
      user_id: Joi.number().integer().positive().required(),
      name: Joi.string().required(),
      cost: Joi.number().positive().required(),
      total_ticket: Joi.number().integer().positive().required(),
      ticket_price: Joi.number().integer().positive().required(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validate(data, opts)
    return result
  },
  createBoardItemList: async (req) => {
    const data = {
      user_id: req.get('x-user-id'),
      board_id: req.body.board_id,
      customer_name: req.body.customer_name,
      sell_ticket_amount: req.body.sell_ticket_amount,
      free_ticket_amount: req.body.free_ticket_amount,
    }
    const schema = Joi.object({
      user_id: Joi.number().integer().positive().required(),
      board_id: Joi.number().integer().positive().required(),
      customer_name: Joi.string().required(),
      sell_ticket_amount: Joi.number().integer().positive().required(),
      free_ticket_amount: Joi.number().integer().positive().required(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validate(data, opts)
    return result
  }
}
