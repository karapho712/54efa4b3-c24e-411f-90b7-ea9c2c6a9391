import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrate1715293467301 implements MigrationInterface {
    name = 'InitialMigrate1715293467301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "code" varchar NOT NULL, "title" varchar NOT NULL, "author" varchar NOT NULL, "stock" numeric NOT NULL DEFAULT (1))`);
        await queryRunner.query(`CREATE TABLE "members" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "code" varchar NOT NULL, "name" varchar NOT NULL, "penaltyUntil" date, CONSTRAINT "UQ_8b08a36b59b238402b8c38d1f6f" UNIQUE ("code"))`);
        await queryRunner.query(`CREATE TABLE "borrowings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "borrow_date" date NOT NULL, "return_date" date NOT NULL, "original_return_date" date, "memberId" integer, "bookId" integer)`);
        await queryRunner.query(`CREATE INDEX "IDX_98ce86180d96a4473a57f7f061" ON "borrowings" ("memberId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5da2b7ee3b60c381d4bbdb5066" ON "borrowings" ("bookId") `);
        await queryRunner.query(`DROP INDEX "IDX_98ce86180d96a4473a57f7f061"`);
        await queryRunner.query(`DROP INDEX "IDX_5da2b7ee3b60c381d4bbdb5066"`);
        await queryRunner.query(`CREATE TABLE "temporary_borrowings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "borrow_date" date NOT NULL, "return_date" date NOT NULL, "original_return_date" date, "memberId" integer, "bookId" integer, CONSTRAINT "FK_98ce86180d96a4473a57f7f0615" FOREIGN KEY ("memberId") REFERENCES "members" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_5da2b7ee3b60c381d4bbdb50668" FOREIGN KEY ("bookId") REFERENCES "books" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_borrowings"("id", "borrow_date", "return_date", "original_return_date", "memberId", "bookId") SELECT "id", "borrow_date", "return_date", "original_return_date", "memberId", "bookId" FROM "borrowings"`);
        await queryRunner.query(`DROP TABLE "borrowings"`);
        await queryRunner.query(`ALTER TABLE "temporary_borrowings" RENAME TO "borrowings"`);
        await queryRunner.query(`CREATE INDEX "IDX_98ce86180d96a4473a57f7f061" ON "borrowings" ("memberId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5da2b7ee3b60c381d4bbdb5066" ON "borrowings" ("bookId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_5da2b7ee3b60c381d4bbdb5066"`);
        await queryRunner.query(`DROP INDEX "IDX_98ce86180d96a4473a57f7f061"`);
        await queryRunner.query(`ALTER TABLE "borrowings" RENAME TO "temporary_borrowings"`);
        await queryRunner.query(`CREATE TABLE "borrowings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "borrow_date" date NOT NULL, "return_date" date NOT NULL, "original_return_date" date, "memberId" integer, "bookId" integer)`);
        await queryRunner.query(`INSERT INTO "borrowings"("id", "borrow_date", "return_date", "original_return_date", "memberId", "bookId") SELECT "id", "borrow_date", "return_date", "original_return_date", "memberId", "bookId" FROM "temporary_borrowings"`);
        await queryRunner.query(`DROP TABLE "temporary_borrowings"`);
        await queryRunner.query(`CREATE INDEX "IDX_5da2b7ee3b60c381d4bbdb5066" ON "borrowings" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_98ce86180d96a4473a57f7f061" ON "borrowings" ("memberId") `);
        await queryRunner.query(`DROP INDEX "IDX_5da2b7ee3b60c381d4bbdb5066"`);
        await queryRunner.query(`DROP INDEX "IDX_98ce86180d96a4473a57f7f061"`);
        await queryRunner.query(`DROP TABLE "borrowings"`);
        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
