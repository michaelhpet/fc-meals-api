import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'fc_meals',
      user: 'postgres',
      password: 'root',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations',
    },
  },
};

module.exports = config;
