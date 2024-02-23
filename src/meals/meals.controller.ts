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
      throw new HttpException('Meal does not exist', HttpStatus.BAD_REQUEST);
    return success(data, 'Meal fetched successfully');
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    const oldData = await this.mealsService.findOne(+id);
    if (!oldData.meal)
      throw new HttpException('Meal does not exist', HttpStatus.BAD_REQUEST);
    const data = await this.mealsService.update(+id, updateMealDto);
    return success(data, 'Meal updated successfully');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const oldData = await this.mealsService.findOne(+id);
    if (!oldData.meal)
      throw new HttpException('Meal does not exist', HttpStatus.BAD_REQUEST);
    const data = await this.mealsService.remove(+id);
    return success(data, 'Meal deleted successfully');
  }
}
