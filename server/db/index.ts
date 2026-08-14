import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || 'postgresql://makarti:SuperRahasia123%21@172.236.154.243:5432/makarti';

// Disable SSL or configure connection options for local/remote pg
const client = postgres(connectionString, { max: 10 });

export const db = drizzle(client, { schema });
