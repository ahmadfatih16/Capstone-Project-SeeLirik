import { getUserToken } from './auth-user.js';

export async function fetchRecentRiwayat(limit = 5) {
  try {
    const token = getUserToken();
    const response = await fetch('https://backend-seelirik-production.up.railway.app/riwayat', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    const data = result.data;

    if (!Array.isArray(data)) return [];

    return data.slice().reverse().slice(0, limit);
  } catch (err) {
    console.error('Gagal mengambil data riwayat:', err);
    return [];
  }
}
