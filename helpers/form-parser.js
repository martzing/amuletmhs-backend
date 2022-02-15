const formidable = require('formidable')

module.exports = {
  parse: async (payload) => {
    const result = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm()

      form.parse(payload, (err, fields, files) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            fields,
            files
          })
        }
      })
    })
    return result
  }
}