import { db } from '../../../db';
import { expertInterviews } from '../../../db/schema';
import { desc } from 'drizzle-orm';

export default defineEventHandler(async () => {
  try {
    let dbRecords: any[] = [];
    try {
      dbRecords = await db.select().from(expertInterviews).orderBy(desc(expertInterviews.createdAt));
    } catch (err: any) {
      console.warn('DB select error on expertInterviews:', err.message);
    }

    return {
      success: true,
      totalInterviews: dbRecords.length,
      data: dbRecords
    };
  } catch (error: any) {
    return {
      success: true,
      totalInterviews: 0,
      data: []
    };
  }
});
