module.exports = {
  baseUrl: process.env.BASE_URL,
  salt: process.env.SALT,
  jwtSecret: process.env.JWT_SECRET,
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
  storage: {
    region: process.env.STORAGE_REGION,
    bucketName: process.env.STORAGE_BUCKET,
  },
}
