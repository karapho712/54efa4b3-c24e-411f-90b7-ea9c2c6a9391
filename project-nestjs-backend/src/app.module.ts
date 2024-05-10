import { Module } from '@nestjs/common';
import { MemberModule } from './modules/member/member.module';
import { BookModule } from './modules/book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowingModule } from './modules/borrowing/borrowing.module';
import { default as newDataSource, safeInit } from './data-source/data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      dataSourceFactory: async () => {
        const dataSource = safeInit(newDataSource);
        return dataSource;
      },
      useFactory: () => ({
        autoLoadEntities: true,
      }),
    }),
    MemberModule,
    BookModule,
    BorrowingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
