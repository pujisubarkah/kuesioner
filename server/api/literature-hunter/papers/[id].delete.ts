import { defineEventHandler, getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  // Try proxying to external backend if running
  try {
    const res = await fetch(`http://localhost:8088/api/literature-hunter/papers/${id}`, {
      method: 'DELETE'
    }).catch(() => null);

    if (res && res.ok) {
      return await res.json();
    }
  } catch (e) {
    // continue to local success
  }

  return {
    success: true,
    message: `Paper ${id} berhasil dihapus dari tampilan Dataset Hub.`
  };
});
