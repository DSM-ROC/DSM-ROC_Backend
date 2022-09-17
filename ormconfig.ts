const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;

const ext = process.env.NODE_ENV === 'development' ? 'ts' : 'js';

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  logging: false,
  entities: [`src/entity/**/*.${ext}`],
  migrations: [`src/migration/**/*.${ext}`],
  subscribers: [`src/subscriber/**/*.${ext}`],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  namingStrategy: new SnakeNamingStrategy(),
};
