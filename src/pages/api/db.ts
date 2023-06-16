import pgPromise from "pg-promise";
import { createSingleton } from "@/helpers/singletonCreator";

const pgp = pgPromise({});

const devConfig = `${process.env.PG_USER}://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const prodConfig = `${process.env.SUPABASE_DATABASE}://${process.env.SUPABASE_USER}:${process.env.SUPABASE_PASSWORD}@${process.env.SUPABASE_HOST}:${process.env.SUPABASE_PORT}/${process.env.SUPABASE_DATABASE_NAME}`;

// const dbConnection = process.env.VERCEL_ENV ? prodConfig : devConfig;
const dbConnection = `${process.env.SUPABASE_DATABASE}://${process.env.SUPABASE_USER}:${process.env.SUPABASE_PASSWORD}@${process.env.SUPABASE_HOST}:${process.env.SUPABASE_PORT}/${process.env.SUPABASE_DATABASE_NAME}`;

console.log(dbConnection);

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
