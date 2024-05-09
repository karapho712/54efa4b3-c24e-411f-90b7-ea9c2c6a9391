import { Controller, Post, Body } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { ReturnBorrowedBookDto } from './dto/return-borrowed-book.dto';

@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Post()
  create(@Body() createBorrowingDto: CreateBorrowingDto) {
    return this.borrowingService.createBorrowBook(createBorrowingDto);
  }

  @Post('returnbook')
  returnBook(@Body() returnBorrowedBookDto: ReturnBorrowedBookDto) {
    return this.borrowingService.returnBorrowedBook(returnBorrowedBookDto);
  }
}
