import { Borrowing } from 'src/modules/borrowing/entities/borrowing.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ type: 'numeric', default: 1 })
  stock: number;

  @OneToMany(() => Borrowing, (borrowing) => borrowing.book)
  bookMembers: Borrowing[];
}
