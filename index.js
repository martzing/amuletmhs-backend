require('dotenv').config()
require('app-module-path').addPath(__dirname)
const http = require('http')

const app = require('express')()
// TODO ADD MIDLEWARE
require('boot')(app)

const port = process.env.PORT || 9000
app.set('port', port)

const bindIp = process.env.NODE_BIND_IP || '0.0.0.0'

const server = http.createServer(app)

const onError = (error) => {
  console.log(error.message)
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break;
    default:
      throw error
  }
}

const onListening = () => {
  const message = `Started on ${server.address().address} port ${server.address().port} at in ${app.get('env')} env`
  const nodeVersion = `Node version ${process.version}`
  console.log(message)
  console.log(nodeVersion)
}


server.listen(port, bindIp)
server.on('error', onError)
server.on('listening', onListening)