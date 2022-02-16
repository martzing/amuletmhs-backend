const Joi = require('joi')

module.exports = {
  login: async (req) => {
    const data = {
      username: req.body.username,
      password: req.body.password,
    }
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  changePassword: async (req) => {
    const data = {
      userId: req.get('x-user-id'),
      oldPassword: req.body.old_password,
      newPassword: req.body.new_password,
    }
    const schema = Joi.object({
      userId: Joi.number().integer().positive().required(),
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
    })
    const opts = {
      abortEarly: true,
      allowUnknown: false,
    }
    const result = await schema.validateAsync(data, opts)
    return result
  },
  getUser: async (req) => {
    const data = {
      userId: req.get('x-user-id'),
    }

    const schema = Joi.object({
      userId: Joi.number().integer().positive().required(),
    })
    const result = await schema.validate(data)
    return result
  }
}
