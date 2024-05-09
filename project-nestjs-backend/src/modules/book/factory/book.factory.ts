import { randAlpha, randBook } from '@ngneat/falso';
import { Book } from 'src/modules/book/entities/book.entity';
import { define } from 'typeorm-seeding';

define(Book, () => {
  const book = new Book();

  const bookExample = randBook();

  book.author = bookExample.author;
  book.stock = 1;
  book.title = bookExample.title;
  book.code = randAlpha({ length: 3 }).join('').toUpperCase();

  return book;
});
