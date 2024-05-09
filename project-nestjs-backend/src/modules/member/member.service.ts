import { Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterMemberDto } from './dto/filter-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  // NOTE: for now show all book already borrowed by member
  findAll(options: FilterMemberDto) {
    return this.memberRepository.find({
      relations: {
        memberBooks: options?.book,
      },
    });
  }

  findOne(memberId: number) {
    return this.memberRepository
      .findOneOrFail({
        where: {
          id: memberId,
        },
        relations: {
          memberBooks: true,
        },
      })
      .catch(() => {
        throw new NotFoundException('Member not found');
      });
  }

  async update(memberId: number, updateMemberDto: UpdateMemberDto) {
    const member = await this.findOne(memberId);

    await this.memberRepository.save(
      this.memberRepository.create({
        ...member,
        ...updateMemberDto,
      }),
    );
  }
}
