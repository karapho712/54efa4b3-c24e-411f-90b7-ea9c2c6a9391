import { MemberService } from './member.service';
import { Member } from './entities/member.entity';
import { DataSource, Repository } from 'typeorm';
import { Borrowing } from '../borrowing/entities/borrowing.entity';
import { Book } from '../book/entities/book.entity';
import { omit } from 'lodash';
import { addDays, format } from 'date-fns';

describe('MemberService', () => {
  let repositoryMember: Repository<Member>;
  let memberService: MemberService;

  let repositoryBook: Repository<Book>;

  let repositoryBorrowing: Repository<Borrowing>;

  const dataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Book, Member, Borrowing],
    synchronize: true,
    logging: false,
    name: 'testConnectionBook',
  });

  beforeEach(async () => {
    repositoryMember = dataSource.manager.getRepository(Member);
    memberService = new MemberService(repositoryMember);

    repositoryBook = dataSource.manager.getRepository(Book);

    repositoryBorrowing = dataSource.manager.getRepository(Borrowing);
    return dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  it('should be defined', () => {
    expect(memberService).toBeDefined();
  });

  it('should be find all existing member', async () => {
    const dummyMembers: Member[] = [
      {
        id: 1,
        code: 'M001',
        name: 'Angga',
        memberBooks: [],
        penaltyUntil: null,
      },
      {
        id: 2,
        code: 'M002',
        name: 'Ferry',
        memberBooks: [],
        penaltyUntil: null,
      },
      {
        id: 3,
        code: 'M003',
        name: 'Putri',
        memberBooks: [],
        penaltyUntil: null,
      },
    ];

    await repositoryMember.insert(dummyMembers);

    await expect(memberService.findAll({ book: false })).resolves.toEqual(
      dummyMembers.map((member) => omit(member, 'memberBooks')),
    );
  });

  it('should be find all existing member and The number of books being borrowed by each member', async () => {
    const dummyMembers: Member[] = [
      {
        id: 1,
        code: 'M001',
        name: 'Angga',
        memberBooks: [],
        penaltyUntil: null,
      },
      {
        id: 2,
        code: 'M002',
        name: 'Ferry',
        memberBooks: [],
        penaltyUntil: null,
      },
      {
        id: 3,
        code: 'M003',
        name: 'Putri',
        memberBooks: [],
        penaltyUntil: null,
      },
    ];

    await repositoryMember.insert(dummyMembers);

    const dummyBooks: Book[] = [
      {
        id: 1,
        author: 'author1',
        code: '001',
        stock: 1,
        title: 'title',
        bookMembers: [],
      },
      {
        id: 2,
        author: 'author2',
        code: '002',
        stock: 0,
        title: 'title1',
        bookMembers: [],
      },
      {
        id: 3,
        author: 'author3',
        code: '003',
        stock: 0,
        title: 'title3',
        bookMembers: [],
      },
    ];

    await repositoryBook.insert(dummyBooks);

    const dummyBorrowing: Borrowing[] = [
      {
        id: 1,
        borrow_date: new Date(),
        return_date: addDays(new Date(), 7),
        member: 1,
        book: 1,
        original_return_date: null,
        setReturnDate: async function () {},
      },
      {
        id: 2,
        borrow_date: new Date(),
        return_date: addDays(new Date(), 7),
        member: 1,
        book: 2,
        original_return_date: null,
        setReturnDate: async function () {},
      },
      {
        id: 3,
        borrow_date: new Date(),
        return_date: addDays(new Date(), 7),
        member: 3,
        book: 3,
        original_return_date: null,
        setReturnDate: async function () {},
      },
    ];
    await repositoryBorrowing.insert(dummyBorrowing);

    const currentDate = new Date();

    await expect(memberService.findAll({ book: true })).resolves.toEqual([
      {
        id: 1,
        code: 'M001',
        name: 'Angga',
        penaltyUntil: null,
        memberBooks: [
          {
            id: 1,
            borrow_date: format(currentDate, 'yyyy-MM-dd'),
            return_date: format(addDays(currentDate, 7), 'yyyy-MM-dd'),
            original_return_date: null,
          },
          {
            id: 2,
            borrow_date: format(currentDate, 'yyyy-MM-dd'),
            return_date: format(addDays(currentDate, 7), 'yyyy-MM-dd'),
            original_return_date: null,
          },
        ],
      },
      {
        id: 2,
        code: 'M002',
        name: 'Ferry',
        penaltyUntil: null,
        memberBooks: [],
      },
      {
        id: 3,
        code: 'M003',
        name: 'Putri',
        penaltyUntil: null,
        memberBooks: [
          {
            id: 3,
            borrow_date: format(currentDate, 'yyyy-MM-dd'),
            return_date: format(addDays(currentDate, 7), 'yyyy-MM-dd'),
            original_return_date: null,
          },
        ],
      },
    ]);
  });
});
