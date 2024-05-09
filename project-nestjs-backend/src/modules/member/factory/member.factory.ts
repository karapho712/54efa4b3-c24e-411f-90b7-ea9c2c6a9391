import { randAlpha, randFirstName } from '@ngneat/falso';
import { Member } from 'src/modules/member/entities/member.entity';
import { define } from 'typeorm-seeding';

define(Member, () => {
  const member = new Member();

  member.name = randFirstName();
  member.code = randAlpha({ length: 3 }).join('').toUpperCase();

  return member;
});
