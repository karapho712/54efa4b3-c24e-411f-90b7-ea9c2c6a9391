import { Seeder, Factory } from 'typeorm-seeding';
import { Book } from 'src/modules/book/entities/book.entity';

export class BookCreateSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Book)().create({
      code: 'JK-45',
      title: 'Harry Potter',
      author: 'J.K Rowling',
      stock: 1,
    });

    await factory(Book)().create({
      code: 'SHR-1',
      title: 'A Study in Scarlet',
      author: 'Arthur Conan Doyle',
      stock: 1,
    });

    await factory(Book)().create({
      code: 'TW-11',
      title: 'Twilight',
      author: 'Stephenie Meyer',
      stock: 1,
    });

    await factory(Book)().create({
      code: 'HOB-83',
      title: 'The Hobbit, or There and Back Again',
      author: 'J.R.R. Tolkien',
      stock: 1,
    });

    await factory(Book)().create({
      code: 'NRN-7',
      title: 'The Lion, the Witch and the Wardrobe',
      author: 'C.S. Lewis',
      stock: 1,
    });

    await factory(Book)().createMany(20);
  }
}
