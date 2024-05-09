import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async checkAvailabilityBook(bookId: number) {
    const checkBook = await this.bookRepository
      .findOneOrFail({
        where: {
          id: bookId,
          stock: 1,
        },
      })
      .catch(() => {
        throw new NotFoundException('Book id not found or Already booked');
      });

    return checkBook;
  }

  findAll() {
    return this.bookRepository.find({
      where: {
        stock: 1,
      },
    });
  }

  findOne(bookId: number) {
    return this.bookRepository.findOneByOrFail({ id: bookId }).catch(() => {
      throw new NotFoundException('Book not found');
    });
  }

  async update(bookId: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(bookId);

    return await this.bookRepository.save(
      this.bookRepository.create({
        ...book,
        ...updateBookDto,
      }),
    );
  }
}
