"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitEmpty1762876475440 = void 0;
class InitEmpty1762876475440 {
    async up(q) {
        await q.query(`
      CREATE TABLE IF NOT EXISTS "demo_migrations" (
        "id" SERIAL PRIMARY KEY,
        "note" VARCHAR(100) NOT NULL
      );
    `);
    }
    async down(q) {
        await q.query(`DROP TABLE IF EXISTS "demo_migrations";`);
    }
}
exports.InitEmpty1762876475440 = InitEmpty1762876475440;
//# sourceMappingURL=1762876475440-InitEmpty.js.map