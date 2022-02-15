const logger = require('helpers/logger')
const validate = require('controllers/file-system/module/validate')
const ctrl = require('controllers/file-system/file-system.ctrl')
const formParser = require('helpers/form-parser')

module.exports = {
  uploadAdapter: async (req, res) => {
    try {
      const { fields, files } = await formParser.parse(req)
      const data = await validate.upload({ fields, files })
      const result = await ctrl.upload({ data })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  downloadAdapter: async (req, res) => {
    try {
      const data = await validate.download(req)
      const result = await ctrl.download({ data })
      return result.pipe(res)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  getSignedUrlAdapter: async (req, res) => {
    try {
      const data = await validate.getSignedUrl(req)
      const result = await ctrl.getSignedUrl({ data })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
}
