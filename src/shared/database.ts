import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { env } from "./env.js";

export interface Database {}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({ connectionString: env.DATABASE_URL }),
  }),
});
