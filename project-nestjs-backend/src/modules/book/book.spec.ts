import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { DataSource, Repository } from 'typeorm';
import { Member } from '../member/entities/member.entity';
import { Borrowing } from '../borrowing/entities/borrowing.entity';
import { omit } from 'lodash';

describe('BookService', () => {
  let service: BookService;
  let repositoryBook: Repository<Book>;

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
    repositoryBook = dataSource.manager.getRepository(Book);
    service = new BookService(repositoryBook);

    return dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be find all book', async () => {
    const dummyBooks: Book[] = [
      {
        id: 1,
        author: 'author',
        code: '000',
        stock: 1,
        title: 'title',
        bookMembers: [],
      },
      {
        id: 2,
        author: 'author',
        code: '000',
        stock: 1,
        title: 'title',
        bookMembers: [],
      },
    ];

    await repositoryBook.insert(dummyBooks);

    await expect(service.findAll()).resolves.toEqual(
      dummyBooks.map((book) => omit(book, 'bookMembers')),
    );
  });

  it('should be find all book except book.stock 0', async () => {
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

    await expect(service.findAll()).resolves.toEqual([
      {
        id: 1,
        author: 'author1',
        code: '001',
        stock: 1,
        title: 'title',
        // bookMembers: [],
      },
    ]);
  });
});
