import { Borrowing } from 'src/modules/borrowing/entities/borrowing.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'members' })
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @OneToMany(() => Borrowing, (borrowing) => borrowing.member)
  memberBooks: Borrowing[];

  @Column({ type: 'date', nullable: true, default: null })
  penaltyUntil: Date | null;
}
