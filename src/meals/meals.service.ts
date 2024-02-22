import { Inject, Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { ModelClass } from 'objection';
import { MealModel } from 'src/database/models/meal.model';

@Injectable()
export class MealsService {
  constructor(@Inject('MealModel') private Meal: ModelClass<MealModel>) {}

  create(createMealDto: CreateMealDto) {
    return 'This action adds a new meal';
  }

  findAll() {
    return this.Meal.query();
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
