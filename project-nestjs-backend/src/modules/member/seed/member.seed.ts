import { Seeder, Factory } from 'typeorm-seeding';
import { Member } from 'src/modules/member/entities/member.entity';

export class MemberCreateSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Member)().create({
      code: 'M001',
      name: 'Angga',
    });

    await factory(Member)().create({
      code: 'M002',
      name: 'Ferry',
    });

    await factory(Member)().create({
      code: 'M003',
      name: 'Putri',
    });

    await factory(Member)().createMany(10);
  }
}
