import { getRiwayat } from '../../data/api.js';

export default class RiwayatPresenter {
  constructor(view) {
    this.view = view;
  }

  async init() {
    this.view.showLoading();
    await this.getRiwayat();
    this.listenToRealtimeDetection(); // Tambahkan listener WebSocket setelah data awal di-load
  }

  async getRiwayat() {
    try {
      const response = await getRiwayat();
      const data = response.histories;

      console.log('Hasil dari backend:', data);

      if (!data || data.length === 0) {
        this.view.showEmpty();
        return;
      }

      this.view.showRiwayat(data);
    } catch (err) {
      console.error('Gagal mendapatkan riwayat:', err);
      this.view.showError('Gagal memuat riwayat.');
    }
  }

  listenToRealtimeDetection() {
    const socket = window.socket;
    if (!socket) return;

    socket.on('new_detection', (data) => {
      const tableBody = document.getElementById('riwayat-table-body');
      const now = new Date();
      const tanggalFormatted = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const waktuFormatted = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const newRow = document.createElement('tr');
      newRow.className = 'hover:bg-neutral-800 cursor-pointer';
      newRow.setAttribute('data-id', 'realtime');
      newRow.innerHTML = `
        <td class="px-4 py-2">${tanggalFormatted}</td>
        <td class="px-4 py-2">${waktuFormatted} WIB</td>
        <td class="px-4 py-2">${data.camera_name}</td>
        <td class="px-4 py-2">${data.label}</td>
      `;

      newRow.addEventListener('click', () => {
        sessionStorage.setItem('selectedActivityData', JSON.stringify(data));
        window.location.href = '#/detail-riwayat';
      });

      // Tambahkan baris di atas
      tableBody.prepend(newRow);

      // Batasi maksimal 10 baris agar tidak overload
      const allRows = tableBody.querySelectorAll('tr');
      if (allRows.length > 10) {
        allRows[allRows.length - 1].remove();
      }
    });
  }
}
