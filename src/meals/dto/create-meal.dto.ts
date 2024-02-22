import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMealDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
