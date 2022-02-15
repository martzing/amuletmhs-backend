const Joi = require('joi')

module.exports = {
  upload: async ({ fields, files }) => {
    try {
      const data = {
        // platformId: fields.platform_id,
        // name: fields.name,
        file: files.file
      }
      const schema = Joi.object({
        // platformId: Joi.number().integer().allow(null).required().label('platform_id'),
        // name: Joi.string().required(),
        file: Joi.object().required()
      })
      const opts = {
        abortEarly: true,
        allowUnknown: false,
      }
      const result = await schema.validateAsync(data, opts)
      return result
    } catch (err) {
      throw err
    }
  },
  download: async (req) => {
    try {
      const data = {
        key: req.query.key,
      }
      const schema = Joi.object({
        key: Joi.string().required(),
      })
      const opts = {
        abortEarly: true,
        allowUnknown: false,
      }
      const result = await schema.validateAsync(data, opts)
      return result
    } catch (err) {
      throw err
    }
  },
  getSignedUrl: async (req) => {
    try {
      const data = {
        key: req.query.key,
        expire: req.query.expire,
      }
      const schema = Joi.object({
        key: Joi.string().required(),
        expire: Joi.number().integer().positive().optional(),
      })
      const opts = {
        abortEarly: true,
        allowUnknown: false,
      }
      const result = await schema.validateAsync(data, opts)
      return result
    } catch (err) {
      throw err
    }
  },
}
