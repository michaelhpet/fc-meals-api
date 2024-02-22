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

  create(createMealDto: CreateMealDto) {
    return 'This action adds a new meal';
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

  findOne(id: number) {
    return `This action returns a #${id} meal`;
  }

  update(id: number, updateMealDto: UpdateMealDto) {
    return `This action updates a #${id} meal`;
  }

  remove(id: number) {
    return `This action removes a #${id} meal`;
  }
}
