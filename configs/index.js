module.exports = {
  db: {
    dbName: process.env.MARIADB_DBNAME,
    username: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    options: {
      host: process.env.MARIADB_HOST,
      port: process.env.MARIADB_PORT,
      dialect: 'mariadb',
      pool: {
        max: 100,
        min: 0,
        idle: 10000,
      },
      define: {
        charset: 'utf8',
      },
      timezone: '+07:00',
      logging: console.log,
      logQueryParameters: true,
    },
  },
}
