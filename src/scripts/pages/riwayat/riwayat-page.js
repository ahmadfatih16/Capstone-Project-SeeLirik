//riwayat-page.js

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
      ${Sidebar()}
      ${ModalLogout()}

      <main class="lg:ml-72 p-4 sm:p-6 overflow-y-auto h-screen">
        ${DateTime()}
        
        <!-- Judul -->
        <h3 class="text-2xl font-bold text-emerald-400 mb-4">Riwayat Aktifitas Mencurigakan</h3>

        <!-- Tabel Responsif Riwayat -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-neutral-700 text-white text-sm sm:text-base">
            <thead>
              <tr class="text-left text-emerald-400">
                <th class="px-4 py-2">Tanggal</th>
                <th class="px-4 py-2">Waktu</th>
                <th class="px-4 py-2">Kamera</th>
                <th class="px-4 py-2">Aktifitas</th>
                <th class="px-4 py-2">Alarm</th>
              </tr>
            </thead>
            <tbody id="riwayat-table-body" class="divide-y divide-neutral-700">
              <!-- Data akan diisi oleh presenter -->
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
  }

  // Method untuk update tampilan tabel dari presenter
  updateRiwayatTable(data) {
    const tableBody = document.getElementById('riwayat-table-body');
    if (tableBody) {
      tableBody.innerHTML = data.map(item => `
        <tr class="hover:bg-neutral-800 transition cursor-pointer" onclick="location.href='detail-riwayat-page.html'">
          <td class="px-4 py-3">${item.tanggal}</td>
          <td class="px-4 py-3">${item.waktu}</td>
          <td class="px-4 py-3">${item.kamera}</td>
          <td class="px-4 py-3">${item.aktivitas}</td>
          <td class="px-4 py-3">
            <span class="inline-block px-3 py-1 ${item.alarm === 'aktif' ? 'bg-emerald-600' : 'bg-red-600'} text-white rounded-full text-xs">
              ${item.alarm}
            </span>
          </td>
        </tr>
      `).join('');
    }
  }

  // Method untuk menampilkan loading state
  showLoading() {
    const tableBody = document.getElementById('riwayat-table-body');
    if (tableBody) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="px-4 py-8 text-center text-neutral-400">
            <i class="fa-solid fa-spinner fa-spin text-2xl mb-2"></i>
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
            <i class="fa-solid fa-exclamation-triangle text-2xl mb-2"></i>
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
          <td colspan="5" class="px-4 py-8 text-center text-neutral-400">
            <i class="fa-solid fa-inbox text-2xl mb-2"></i>
            <p>Tidak ada riwayat aktivitas mencurigakan</p>
          </td>
        </tr>
      `;
    }
  }
}