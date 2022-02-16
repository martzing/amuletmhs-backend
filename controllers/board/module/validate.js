const Joi = require('joi')

module.exports = {
  getBoard: async (req) => {
    const data = {
      boardId: req.params.board_id,
    }
    const schema = Joi.object({
      boardId: Joi.number().integer().positive().required(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  getBoards: async (req) => {
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
    const result = await schema.validateAsync(data, opts)
    return result
  },
  updateBoard: async (req) => {
    const data = {
      boardId: req.body.board_id,
      value: {},
    }
    if (req.body.name !== undefined) data.value.name = req.body.name
    if (req.body.cost !== undefined) data.value.cost = req.body.cost
    if (req.body.total_ticket !== undefined) data.value.total_ticket = req.body.total_ticket
    if (req.body.ticket_price !== undefined) data.value.ticket_price = req.body.ticket_price
    const schema = Joi.object({
      boardId: Joi.number().integer().positive().required(),
      value: Joi.object({
        name: Joi.string().optional(),
        cost: Joi.number().positive().optional(),
        total_ticket: Joi.number().integer().positive().optional(),
        ticket_price: Joi.number().integer().positive().optional(),
      }),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  getBoardItemList: async (req) => {
    const data = {
      boardItemListId: req.params.board_item_list_id,
    }
    const schema = Joi.object({
      boardItemListId: Joi.number().integer().positive().required(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  getBoardItemLists: async (req) => {
    const data = {
      boardId: req.query.board_id,
      offset: req.query.offset,
      limit: req.query.limit,
      searchText: req.query.search_text,
    }
    const schema = Joi.object({
      boardId: Joi.number().integer().positive().required(),
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
    const result = await schema.validateAsync(data, opts)
    return result
  },
  updateBoardItemList: async (req) => {
    const data = {
      boardItemListId: req.body.board_item_list_id,
      value: {},
    }
    if (req.body.customer_name !== undefined) data.value.customer_name = req.body.customer_name
    if (req.body.sell_ticket_amount !== undefined) data.value.sell_ticket_amount = req.body.sell_ticket_amount
    if (req.body.free_ticket_amount !== undefined) data.value.free_ticket_amount = req.body.free_ticket_amount
    const schema = Joi.object({
      boardItemListId: Joi.number().integer().positive().required(),
      value: Joi.object({
        customer_name: Joi.string().optional(),
        sell_ticket_amount: Joi.number().integer().positive().optional(),
        free_ticket_amount: Joi.number().integer().positive().optional(),
      }),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  getRewardList: async (req) => {
    const data = {
      rewardListId: req.params.reward_list_id,
    }
    const schema = Joi.object({
      rewardListId: Joi.number().integer().positive().required(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  getRewardLists: async (req) => {
    const data = {
      boardItemListId: req.query.board_item_list_id,
    }
    const schema = Joi.object({
      boardItemListId: Joi.number().integer().positive().required(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  createRewardList: async (req) => {
    const data = {
      board_item_list_id: req.body.board_item_list_id,
      name: req.body.name,
      type_id: req.body.type_id,
      image: req.body.image,
    }
    const schema = Joi.object({
      board_item_list_id: Joi.number().integer().positive().required(),
      name: Joi.string().required(),
      type_id: Joi.number().integer().positive().required(),
      image: Joi.string().required(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  updateRewardList: async (req) => {
    const data = {
      rewardListId: req.body.reward_list_id,
      value: {},
    }
    if (req.body.name !== undefined) data.value.name = req.body.name
    if (req.body.type_id !== undefined) data.value.type_id = req.body.type_id
    if (req.body.image !== undefined) data.value.image = req.body.image
    const schema = Joi.object({
      rewardListId: Joi.number().integer().positive().required(),
      value: Joi.object({
        name: Joi.string().optional(),
        type_id: Joi.number().integer().positive().optional(),
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
  getRewardTypes: async (req) => {
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
  createRewardType: async ({ fields, files }) => {
    const data = {
      name: fields.name,
      image: files.image,
    }
    const schema = Joi.object({
      name: Joi.string().required(),
      image: Joi.object().required(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  updateRewardType: async ({ fields, files }) => {
    const data = {
      rewardTypeId: fields.reward_type_id,
      value: {},
    }
    if (fields.name !== undefined) data.value.name = fields.name
    if (files.image !== undefined) data.value.image = files.image
    const schema = Joi.object({
      rewardTypeId: Joi.number().integer().positive().required(),
      value: Joi.object({
        name: Joi.string().optional(),
        image: Joi.object().optional(),
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
