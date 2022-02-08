const Joi = require('joi')

module.exports = {
  getUsers: async (req) => {
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
