import { Borrowing } from 'src/modules/borrowing/entities/borrowing.entity';
import { MemberStatus } from 'src/types';
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

  @Column({ enum: MemberStatus, default: MemberStatus.CLEAR })
  status: MemberStatus;
}
