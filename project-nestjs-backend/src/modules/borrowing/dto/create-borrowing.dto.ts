import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateBorrowingDto {
  @ApiProperty({ required: true })
  @IsNumber()
  book: number;

  @ApiProperty({ required: true })
  @IsNumber()
  member: number;
}
