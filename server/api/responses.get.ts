import { db } from '../db';
import { responses } from '../db/schema';
import { desc } from 'drizzle-orm';

export default defineEventHandler(async () => {
  try {
    const list = await db.select().from(responses).orderBy(desc(responses.createdAt));
    return {
      success: true,
      count: list.length,
      data: list
    };
  } catch (error: any) {
    console.error('Error fetching responses from PostgreSQL:', error);
    return {
      success: false,
      error: error.message || 'Gagal mengambil data dari database PostgreSQL.'
    };
  }
});
