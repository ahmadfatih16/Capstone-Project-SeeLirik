import { getUserToken } from './auth-user.js';
import { BASE_URL_BACKEND } from '../data/api.js';
import { getRiwayat } from '../data/api.js';




export async function fetchRecentRiwayat(limit = 5) {
  try {
    const token = getUserToken();
    const response = await fetch(`${BASE_URL_BACKEND}/histories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    

    const result = await response.json();
    const data = result.histories; 
    

    if (!Array.isArray(data)) return [];

    return data.slice().reverse().slice(0, limit);
  } catch (err) {
    console.error('Gagal mengambil data riwayat:', err);
    return [];
  }
}
