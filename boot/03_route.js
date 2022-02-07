const fs = require('fs')
const path = require('path')
const express = require('express')
const logger = require('helpers/logger')

let appExpress = false

let baseDir
let baseRouteDir
let hasExpressRouteMiddleware = false
let dirExpressMiddleware

const loadMiddleware = (router, routeConfig) => {
  const middlewarePath = dirExpressMiddleware

  fs.readdirSync(middlewarePath)
    .sort((a, b) => (a < b ? -1 : 1))
    .filter(file => (file !== 'index.js' && file.search(/^x-/) === -1))  //
    .forEach((file) => {
      const middleware = require(path.join(middlewarePath, file))
      let retVal

      if (middleware) {
        if (typeof middleware === 'function') {
          retVal = middleware(router, routeConfig)
        } else if (middleware.init && typeof middleware.init === 'function') {
          retVal = middleware.init(router, routeConfig)
        }
      } else {
        logger.warn('middleware no init function')
      }

      if (retVal) logger.debug(`middleware loaded: ${file}`)
    })
  return true
}

const addExpressRoute = (router, route = { method: '', path: '' }) => {
  const method = route.method.toLowerCase()
  const path = route.path.toLowerCase()
  const routeConfig = {
    method: method,
    path: path,
    configs: route.configs,
    logData: route.logData,
  }

  logger.debug(`express route: '${method}' - ${path}`)

  if (Object.prototype.hasOwnProperty.call(route, 'x')) return false

  // ignore route if environment mismatch
  if (Object.prototype.hasOwnProperty.call(route, 'env')) {
    if (typeof process.env.NODE_ENV !== 'string') return false
    // env is a string
    else if (typeof route.env === 'string' && process.env.NODE_ENV !== route.env) return false
    // env is an array
    else if (Array.isArray(route.env) && !route.env.includes(process.env.NODE_ENV)) return false
  }
  // Add middleware
  if (hasExpressRouteMiddleware) {
    loadMiddleware(router, routeConfig)
  }

  if (!route.handler || typeof (route.handler) !== 'function') {
    throw new Error(`route handler required! (method: ${method}, path: ${path})`)
  }
  router[method](path, route.handler)
  return true
}

const addRoutes = (routes, baseRoute) => {
  const isArray = Array.isArray(routes)
  const isObject = typeof routes === 'object'
  let router
  let cntExpressRoute = 0

  if (appExpress) {
    router = express.Router()
  }

  if (isArray) {
    for (let i = 0, n = routes.length; i < n; i += 1) {
      const route = routes[i]

      if (!route.method) {
        return console.warn(`route "${route.path}" method or type must be defined!`)
      }

      if (appExpress && route.method) {
        addExpressRoute(router, route)
        cntExpressRoute += 1
      }
    }
  } else if (isObject) {
    console.warn('  object type not supported!')
  }

  if (appExpress && cntExpressRoute > 0) {
    logger.debug(`express:  ${baseRoute}`)
    appExpress.use(baseRoute, router)
  }
  return true
}

const mountRoutes = (baseRoute, dirName, dirPath, lv) => {
  const normalizedPath = dirPath

  fs.readdirSync(normalizedPath)
    .sort((a, b) => (a < b ? -1 : 1))
    .filter(file => (file.toLowerCase().indexOf('_ctrl.js') < 0 && file.toLowerCase().indexOf('_controller.js') < 0))
    .forEach((_file) => {
      const file = _file.toLowerCase()
      let space = ''

      for (let i = 0; i < lv; i += 1) space += '  '

      if (file.indexOf('.js') >= 0) {
        const filename = (file === 'index.js') ? '' : `${file.substring(0, file.length - 3)}`
        const newBaseRoute = file === 'index.js' ? (baseRoute || '/') : `${baseRoute}/${filename}`
        
        logger.debug(`${space}route path: ${newBaseRoute}`)

        const routeFile = require(path.join(dirPath, file))

        if (typeof routeFile === 'function') {
          addRoutes(routeFile(), newBaseRoute)
        } else {
          addRoutes(routeFile, newBaseRoute)
        }
      } else {
        const newBasePath = `${baseRoute}/${file}`
        const newDirPath = path.join(dirPath, file)
        mountRoutes(newBasePath, file, newDirPath, lv + 1)
      }
    })
}

const init = (_baseDir, routesDir, _appExpress, middlewaresDir = false) => {
  if (typeof _baseDir !== 'string') throw new Error('`baseDir` must be a string')
  if (typeof routesDir !== 'string') throw new Error('`routesDir` must be a string')
  if (!_appExpress) throw new Error('appExpress must be valid')
  appExpress = _appExpress

  baseDir = _baseDir
  baseRouteDir = path.join(baseDir, routesDir)

  logger.debug(`route dir: ${baseRouteDir}`)

  try {
    fs.accessSync(baseRouteDir, fs.F_OK)
  } catch (e) {
    throw new Error(`route directory not found! (${baseRouteDir})`)
  }

  dirExpressMiddleware = false
  hasExpressRouteMiddleware = false
  if (typeof middlewaresDir === 'string') {
    try {
      dirExpressMiddleware = path.join(_baseDir, middlewaresDir)
      fs.accessSync(dirExpressMiddleware, fs.F_OK)
      hasExpressRouteMiddleware = true
    } catch (e) {
      logger.debug('express middleware dir not found!')
      dirExpressMiddleware = false
      hasExpressRouteMiddleware = false
    }
  }

  mountRoutes('', '', baseRouteDir, 0)
}

module.exports = (app) => {
  const targetDir = 'routes/'
  init(`${__dirname}/..`, targetDir, app, 'boot/middlewares')
}

module.exports.addExpressRoute = addExpressRoute
