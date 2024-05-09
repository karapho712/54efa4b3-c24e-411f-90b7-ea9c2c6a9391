import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsOptional } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsOptional()
  code?: string;

  @IsOptional()
  title?: string;

  @IsOptional()
  author?: string;

  @IsOptional()
  stock?: number;
}
