import { defineEventHandler, createError } from 'h3';
import { db } from '../../db';
import { researchGapsSimple } from '../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const idParam = event.context.params?.id;
    if (!idParam || isNaN(Number(idParam))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID parameter harus berupa angka yang valid.'
      });
    }

    const id = Number(idParam);
    const result = await db
      .select()
      .from(researchGapsSimple)
      .where(eq(researchGapsSimple.id, id))
      .limit(1);

    if (result.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: `Research Gap dengan ID ${id} tidak ditemukan.`
      });
    }

    return {
      success: true,
      data: result[0]
    };
  } catch (error: any) {
    console.error(`Error fetching research_gap_simple by ID:`, error);
    return {
      success: false,
      error: error.message || 'Gagal mengambil data dari database PostgreSQL.'
    };
  }
});
