import '@/server/envConfig';
import { defineConfig } from 'drizzle-kit';
 
export default defineConfig({
  schema: './server/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  tablesFilter: ['podcaster_*'],
  out: './server/db.ts',
  migrations: {
    table: "migrations",
    schema: "public"
}
});