import { addDays } from 'date-fns';
import { Book } from 'src/modules/book/entities/book.entity';
import { Member } from 'src/modules/member/entities/member.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'borrowings' })
export class Borrowing {
  @BeforeInsert()
  async setReturnDate() {
    this.return_date = addDays(this.borrow_date, 7);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  borrow_date: Date;

  @Column({ type: 'date' })
  return_date: Date; // borrow_date + 7 days

  @Column({ type: 'date', nullable: true, default: null })
  original_return_date: Date | null; // actual user return it

  //   Relation
  @Index()
  @ManyToOne(() => Member, (member) => member.memberBooks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'memberId' })
  member: Member | number;

  @Index()
  @ManyToOne(() => Book, (book) => book.bookMembers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bookId' })
  book: Book | number;
}
