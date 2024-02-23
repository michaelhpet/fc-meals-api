import { Inject, Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { ModelClass } from 'objection';
import { MealModel } from 'src/database/models/meal.model';
import { GetMealsDto } from './dto/get-meals-dto';
import { getPagination } from 'src/utils';

@Injectable()
export class MealsService {
  constructor(@Inject('MealModel') private Meal: ModelClass<MealModel>) {}

  async create(createMealDto: CreateMealDto) {
    const meal = await this.Meal.query().insert(createMealDto);
    return { meal };
  }

  async findAll(page: number, limit: number, filter: GetMealsDto) {
    const meals = await this.Meal.query()
      .where(filter)
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();
    return {
      meals,
      pagination: getPagination(
        { page, limit },
        meals.length,
        await this.Meal.query().resultSize(),
      ),
    };
  }

  async findOne(id: number) {
    const meal = await this.Meal.query().findById(id).execute();
    return { meal };
  }

  async update(id: number, updateMealDto: UpdateMealDto) {
    const meal = await this.Meal.query().findById(id).patch(updateMealDto);
    return { meal };
  }

  remove(id: number) {
    return `This action removes a #${id} meal`;
  }
}
