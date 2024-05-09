import { Controller, Post, Body } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { ReturnBorrowedBookDto } from './dto/return-borrowed-book.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('borrowing')
@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @ApiOperation({ summary: 'Create borrowing data' })
  @Post()
  create(@Body() createBorrowingDto: CreateBorrowingDto) {
    return this.borrowingService.createBorrowBook(createBorrowingDto);
  }

  @ApiOperation({ summary: 'Update borrowing data when member return book ' })
  @Post('returnbook')
  returnBook(@Body() returnBorrowedBookDto: ReturnBorrowedBookDto) {
    return this.borrowingService.returnBorrowedBook(returnBorrowedBookDto);
  }
}
