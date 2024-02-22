import { BaseModel } from './base.model';

export class MealModel extends BaseModel {
  static tableName = 'meals';
  price: number;
  summary: string;
  created_at: string;
  updated_at: string;
}
