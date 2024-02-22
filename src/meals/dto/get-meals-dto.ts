import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/database/dto/pagination.dto';

export class GetMealsDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;
}
