import { db } from '../../db';
import { expertValidations } from '../../db/schema';
import { desc } from 'drizzle-orm';

export default defineEventHandler(async () => {
  try {
    let dbRecords: any[] = [];
    try {
      dbRecords = await db.select().from(expertValidations).orderBy(desc(expertValidations.createdAt));
    } catch (err: any) {
      console.warn('DB select error on expertValidations:', err.message);
    }

    return {
      success: true,
      totalExperts: dbRecords.length,
      data: dbRecords
    };
  } catch (error: any) {
    return {
      success: true,
      totalExperts: 0,
      data: []
    };
  }
});
