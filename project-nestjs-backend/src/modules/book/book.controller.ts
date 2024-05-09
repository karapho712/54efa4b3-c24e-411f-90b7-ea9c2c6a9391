import { Controller, Get, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({
    summary: 'Get All book',
    description: 'Get all books except stock 0',
  })
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @ApiOperation({ summary: 'Get a book' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }
}
