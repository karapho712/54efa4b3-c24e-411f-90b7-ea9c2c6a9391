import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { ReturnBorrowedBookDto } from './dto/return-borrowed-book.dto';
import { Borrowing } from './entities/borrowing.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookService } from 'src/modules/book/book.service';
import { MemberService } from 'src/modules/member/member.service';
import dataSource from 'src/data-source/data-source';
import { Book } from 'src/modules/book/entities/book.entity';
import { addDays } from 'date-fns';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(Borrowing)
    private borrowingRepository: Repository<Borrowing>,
    private bookService: BookService,
    private memberService: MemberService,
  ) {}

  async checkMemberBorrowingBook(memberId: number) {
    const data = await this.borrowingRepository.find({
      relations: {
        book: true,
        member: true,
      },
      where: {
        member: {
          id: memberId,
        },
        original_return_date: IsNull(),
      },
    });

    return data;
  }

  async createBorrowBook(createBorrowingDto: CreateBorrowingDto) {
    return dataSource.manager.transaction(async (entityManager) => {
      const trxBorrowingRepository = entityManager.getRepository(Borrowing);
      const trxBookRepository = entityManager.getRepository(Book);

      const member = await this.memberService.findOne(
        createBorrowingDto.member,
      );

      if (
        member.penaltyUntil !== null &&
        new Date(member.penaltyUntil) > new Date()
      )
        throw new ConflictException('Member Penalty');

      const checkMemberBorrowBook = await this.checkMemberBorrowingBook(
        createBorrowingDto.member,
      );

      if (checkMemberBorrowBook.length >= 2)
        throw new ConflictException('Maximal booking');

      await this.bookService.checkAvailabilityBook(createBorrowingDto.book);

      const memberBorrowBook = await trxBorrowingRepository.save(
        trxBorrowingRepository.create({
          ...createBorrowingDto,
          borrow_date: new Date(),
        }),
      );

      await trxBookRepository.save(
        trxBookRepository.create({
          id: createBorrowingDto.book,
          stock: 0,
        }),
      );

      return memberBorrowBook;
    });
  }

  async returnBorrowedBook(returnBorrowdBookDto: ReturnBorrowedBookDto) {
    return dataSource.manager.transaction(async (entityManager) => {
      const trxBorrowingRepository = entityManager.getRepository(Borrowing);
      const trxBookRepository = entityManager.getRepository(Book);

      const borrowing = await trxBorrowingRepository
        .findOneOrFail({
          where: {
            member: {
              id: returnBorrowdBookDto.member,
            },
            book: {
              id: returnBorrowdBookDto.book,
            },
            original_return_date: IsNull(),
          },
        })
        .catch(() => {
          throw new NotFoundException('Data not found');
        });

      if (borrowing.return_date < new Date()) {
        await this.memberService.update(returnBorrowdBookDto.member, {
          penaltyUntil: addDays(new Date(), 3),
        });
      }

      await trxBookRepository.save(
        trxBookRepository.create({
          id: returnBorrowdBookDto.book,
          stock: 1,
        }),
      );

      const newBookingData = await trxBorrowingRepository.save(
        trxBorrowingRepository.create({
          ...borrowing,
          original_return_date: new Date(),
        }),
      );

      return newBookingData;
    });
  }
}
