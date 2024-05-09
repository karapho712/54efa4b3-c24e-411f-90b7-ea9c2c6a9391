import { PartialType } from '@nestjs/swagger';
import { CreateBorrowingDto } from './create-borrowing.dto';
import { IsNumber } from 'class-validator';

export class ReturnBorrowedBookDto extends PartialType(CreateBorrowingDto) {
  @IsNumber()
  book: number;

  @IsNumber()
  member: number;
}
