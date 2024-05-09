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
import { MemberStatus } from 'src/types';

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
    // Should do transaction

    const member = await this.memberService.findOne(createBorrowingDto.member);
    if (member.status !== MemberStatus.CLEAR)
      throw new ConflictException('Member Penalty');

    const checkMemberBorrowBook = await this.checkMemberBorrowingBook(
      createBorrowingDto.member,
    );

    if (checkMemberBorrowBook.length >= 2)
      throw new ConflictException('Maximal booking');

    await this.bookService.checkAvailabilityBook(createBorrowingDto.book);

    const memberBorrowBook = await this.borrowingRepository.save(
      this.borrowingRepository.create({
        ...createBorrowingDto,
        borrow_date: new Date(),
      }),
    );

    await this.bookService.update(createBorrowingDto.book, { stock: 0 });

    return memberBorrowBook;
  }

  async returnBorrowedBook(returnBorrowdBookDto: ReturnBorrowedBookDto) {
    // Should do transaction
    const borrowing = await this.borrowingRepository
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
        status: MemberStatus.PENALTY,
      });
    }

    await this.bookService.update(returnBorrowdBookDto.book, { stock: 1 });

    const newBookingData = await this.borrowingRepository.save(
      this.borrowingRepository.create({
        ...borrowing,
        original_return_date: new Date(),
      }),
    );

    return newBookingData;
  }
}
