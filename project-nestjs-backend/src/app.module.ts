import { Module } from '@nestjs/common';
import { MemberModule } from './modules/member/member.module';
import { BookModule } from './modules/book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source/data-source';
import { BorrowingModule } from './modules/borrowing/borrowing.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    MemberModule,
    BookModule,
    BorrowingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
