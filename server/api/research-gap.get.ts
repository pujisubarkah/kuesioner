import { defineEventHandler } from 'h3';
import { db } from '../db';
import { researchGapsSimple } from '../db/schema';
import { desc, asc } from 'drizzle-orm';

export default defineEventHandler(async () => {
  try {
    const list = await db
      .select()
      .from(researchGapsSimple)
      .orderBy(asc(researchGapsSimple.id));

    return {
      success: true,
      count: list.length,
      data: list
    };
  } catch (error: any) {
    console.error('Error fetching research_gaps_simple:', error);
    return {
      success: false,
      error: error.message || 'Gagal mengambil data research_gaps_simple dari PostgreSQL.',
      data: []
    };
  }
});

