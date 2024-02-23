import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { PaginationDto } from 'src/database/dto/pagination.dto';
import { filter } from 'rxjs';
import { GetMealsDto } from './dto/get-meals-dto';
import { success } from 'src/utils';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  async create(@Body() createMealDto: CreateMealDto) {
    const data = await this.mealsService.create(createMealDto);
    return success(data, 'Meal created successfully');
  }

  @Get()
  async findAll(@Query() query: GetMealsDto) {
    const { page = 1, limit = 10, ...filter } = query;
    const data = await this.mealsService.findAll(page, limit, filter);
    return success(data, 'Meals fetched successfully');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.mealsService.findOne(+id);
    if (!data.meal)
      throw new HttpException('Meal not found', HttpStatus.BAD_REQUEST);
    return success(data, 'Meal fetched successfully');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    return this.mealsService.update(+id, updateMealDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealsService.remove(+id);
  }
}
