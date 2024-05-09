import { IsNumber } from 'class-validator';

export class CreateBorrowingDto {
  @IsNumber()
  book: number;

  @IsNumber()
  member: number;
}
