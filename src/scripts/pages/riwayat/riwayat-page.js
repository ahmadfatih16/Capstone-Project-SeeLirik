import MobileNavbar, { initMobileNavbar } from '../../components/mobile-navbar.js';
import Sidebar from '../../components/sidebar.js';
import DateTime, { initDateTime } from '../../components/datetime.js';
import { setActiveSidebarLink } from '../../utils/sidebar-state.js';
import ModalLogout from '../../components/modal/modal-logout.js';
import initModalLogout from '../../utils/modal/init-modal-logout.js';
import RiwayatPresenter from './riwayat-presenter.js';

export default class RiwayatPage {
  constructor() {
    this.presenter = new RiwayatPresenter(this);
  }

  async render() {
    return `
      ${MobileNavbar()}
      ${await Sidebar()}

      ${ModalLogout()}

      <main class="lg:ml-72 p-4 sm:p-6 overflow-y-auto h-screen custom-scrollbar">
        ${DateTime()}
        
        <h3 class="text-2xl font-bold text-emerald-400 mb-4">Riwayat Aktifitas Mencurigakan</h3>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-neutral-700 text-white text-sm sm:text-base">
            <thead>
              <tr class="text-left text-emerald-400">
                <th class="px-4 py-2">Tanggal</th>
                <th class="px-4 py-2">Waktu</th>
                <th class="px-4 py-2">Nama Kamera</th>
                <th class="px-4 py-2">Label</th>
              </tr>
            </thead>
            <tbody id="riwayat-table-body" class="divide-y divide-neutral-700">
              </tbody>
          </table>
        </div>
      </main>
    `;
  }

  async afterRender() {
    initMobileNavbar();
    initDateTime();
    setActiveSidebarLink();
    initModalLogout();

    // Initialize presenter
    await this.presenter.init();
    this.addRowClickListener();
  }

  // Method untuk update tampilan tabel dari presenter
  showRiwayat(data) {
    const tableBody = document.getElementById('riwayat-table-body');
    tableBody.innerHTML = '';

    data.forEach((item) => {
      const waktuObj = new Date(item.created_at);
      const date = new Date(item.created_at);
      const tanggalFormatted = date.toLocaleDateString('id-ID', {
        weekday: 'long', // Senin, Selasa, ...
        year: 'numeric',
        month: 'long', // Januari, Februari, ...
        day: 'numeric',
      });
      const waktuFix = waktuObj.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta',
      });

      const row = `
      <tr class="hover:bg-neutral-800 cursor-pointer"
          data-id="${item.id}"
          data-tanggal="${tanggalFormatted}"
          data-waktu="${waktuFix} WIB"
          data-kamera="${item.camera_name}"
          data-aktivitas="${item.label}"
          data-image="${item.image}"
          data-video="${item.video}">
        <td class="px-4 py-2">${tanggalFormatted}</td>
        <td class="px-4 py-2">${waktuFix} WIB</td>
        <td class="px-4 py-2">${item.camera_name}</td>
        <td class="px-4 py-2">${item.label}</td>
      </tr>
    `;

      tableBody.innerHTML += row;
    });
  }

  // Method untuk menambahkan event listener pada baris tabel
  addRowClickListener() {
    const rows = document.querySelectorAll('#riwayat-table-body tr');
    rows.forEach((row) => {
      row.addEventListener('click', () => {
        const id = row.dataset.id;
        sessionStorage.setItem('selectedActivityId', row.dataset.id);
        window.location.href = '#/detail-riwayat';
      });
    });
  }

  // Method untuk menampilkan loading state
  showLoading() {
    const tableBody = document.getElementById('riwayat-table-body');
    if (tableBody) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="px-4 py-8 text-center text-neutral-400">
            <i class="fa-solid fa-spinner fa-spin text-2xl mt-8 mb-2"></i>
            <p>Memuat data riwayat...</p>
          </td>
        </tr>
      `;
    }
  }

  // Method untuk menampilkan error state
  showError(message) {
    const tableBody = document.getElementById('riwayat-table-body');
    if (tableBody) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="px-4 py-8 text-center text-red-400">
            <i class="mt-8 fa-solid fa-exclamation-triangle text-2xl mb-2"></i>
            <p>${message}</p>
          </td>
        </tr>
      `;
    }
  }

  // Method untuk menampilkan empty state
  showEmpty() {
    const tableBody = document.getElementById('riwayat-table-body');
    if (tableBody) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="mt-4 px-4 py-8 text-center text-neutral-400">
            <i class="fa-solid fa-inbox text-2xl mt-8 mb-2"></i>
            <p>Tidak ada riwayat aktivitas mencurigakan</p>
          </td>
        </tr>
      `;
    }
  }

  // Method untuk cleanup ketika page di-destroy
  destroy() {
    // Remove event listeners if needed
    const tableRows = document.querySelectorAll('#riwayat-table-body tr[data-activity-id]');
    tableRows.forEach((row) => {
      row.removeEventListener('click', () => {});
    });
  }
}
