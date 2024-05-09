import { Module } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { BorrowingController } from './borrowing.controller';
import { Borrowing } from './entities/borrowing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from 'src/modules/book/book.module';
import { MemberModule } from 'src/modules/member/member.module';

@Module({
  imports: [TypeOrmModule.forFeature([Borrowing]), BookModule, MemberModule],
  controllers: [BorrowingController],
  providers: [BorrowingService],
})
export class BorrowingModule {}
