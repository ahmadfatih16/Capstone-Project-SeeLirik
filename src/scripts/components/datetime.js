export default function DateTime() {
  return `
      <div class="text-white flex flex-row justify-between sm:items-center w-full mb-6 text-sm sm:text-base md:text-lg lg:text-2xl font-semibold gap-2">
        <h2 id="tanggal">Memuat tanggal...</h2>
        <h2 id="waktu">00:00:00 WIB</h2>
      </div>
    `;
}

export function initDateTime() {
  const formatTanggal = () => {
    const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bulan = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    const today = new Date();
    return `${hari[today.getDay()]}, ${today.getDate()} ${bulan[today.getMonth()]} ${today.getFullYear()}`;
  };

  const updateWaktu = () => {
    const now = new Date();
    const jam = now.toLocaleTimeString('id-ID', { hour12: false });
    const tanggalEl = document.getElementById('tanggal');
    const waktuEl = document.getElementById('waktu');
    if (tanggalEl) tanggalEl.textContent = formatTanggal();
    if (waktuEl) waktuEl.textContent = `${jam} WIB`;
  };

  updateWaktu(); // inisialisasi pertama
  setInterval(updateWaktu, 1000); // update per detik
}
