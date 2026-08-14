import type { Config } from 'drizzle-kit';

export default {
  schema: './server/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || 'postgresql://makarti:SuperRahasia123%21@172.236.154.243:5432/makarti'
  }
} satisfies Config;
