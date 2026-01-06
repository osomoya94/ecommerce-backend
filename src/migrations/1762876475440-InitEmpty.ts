import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitEmpty1762876475440 implements MigrationInterface {
  public async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE IF NOT EXISTS "demo_migrations" (
        "id" SERIAL PRIMARY KEY,
        "note" VARCHAR(100) NOT NULL
      );
    `);
  }

  public async down(q: QueryRunner): Promise<void> {
    await q.query(`DROP TABLE IF EXISTS "demo_migrations";`);
  }
}
