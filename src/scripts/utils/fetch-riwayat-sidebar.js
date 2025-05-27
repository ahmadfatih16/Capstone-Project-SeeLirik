export async function fetchRecentRiwayat(limit = 5) {
  try {
    const response = await fetch('https://backend-seelirik-production.up.railway.app/riwayat');
    const data = await response.json();

    if (!Array.isArray(data)) return [];

    // Urutkan berdasarkan waktu terbaru jika ada, fallback ke data as-is
    return data.slice().reverse().slice(0, limit);
  } catch (err) {
    console.error('Gagal mengambil data riwayat:', err);
    return [];
  }
}
