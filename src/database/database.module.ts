import Knex from 'knex';
import { Global, Module } from '@nestjs/common';
import { MealModel } from './models/meal.model';
import { Model } from 'objection';

const models = [MealModel];

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const environment = process.env.NODE_ENV || 'development';
      const config = require('../../knexfile')[environment];
      const knex = Knex(config);
      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
