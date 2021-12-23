require('dotenv').config();
const join = require('path').join;

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '**', '*.entity.js')],
  migrations: [join(__dirname, 'dist', 'migrations', '*.js')],
  cli: {
    migrationsDir: join(__dirname, 'dist', 'migrations'),
  },
  logging: false,
};
