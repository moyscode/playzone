import pgPromise from "pg-promise";
import { createSingleton } from "@/helpers/singletonCreator";

const pgp = pgPromise({});

const devConfig = `${process.env.PG_USER}://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

const dbConnection =
  process.env.NODE_ENV === "production" ? prodConfig : devConfig;

interface IDatabaseScope {
  db: pgPromise.IDatabase<any>;
  pgp: pgPromise.IMain;
}

export function getDB(): IDatabaseScope {
  return createSingleton<IDatabaseScope>("my-app-db-space", () => {
    return {
      db: pgp(dbConnection),
      pgp,
    };
  });
}
