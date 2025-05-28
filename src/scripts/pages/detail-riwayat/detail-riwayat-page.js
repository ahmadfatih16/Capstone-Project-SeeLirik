import MobileNavbar, { initMobileNavbar } from '../../components/mobile-navbar.js';
import Sidebar from '../../components/sidebar.js';
import DateTime, { initDateTime } from '../../components/datetime.js';
import { setActiveSidebarLink } from '../../utils/sidebar-state.js';
import ModalLogout from '../../components/modal/modal-logout.js';
import initModalLogout from '../../utils/modal/init-modal-logout.js';
import DetailRiwayatPresenter from './detail-riwayat-presenter.js';

export default class DetailRiwayatPage {
  constructor() {
    this.presenter = new DetailRiwayatPresenter(this);
  }

  async render() {
    const activityData = this.presenter.getActivityData();

    let formattedDate = activityData.date || 'Tidak tersedia';
    let formattedTime = activityData.time || 'Tidak tersedia';
    if (activityData.timestamp) {
      const ts = new Date(activityData.timestamp);
      if (!isNaN(ts)) {
        formattedDate = ts.toLocaleDateString('id-ID', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        });
        formattedTime = ts.toLocaleTimeString('id-ID', {
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
      }
    }

    const safeActivityData = {
      date: formattedDate,
      time: formattedTime,
      camera: activityData.camera || 'Tidak tersedia',
      activity: activityData.activity || 'Tidak ada deskripsi aktivitas',
      photoEvidence: activityData.photoEvidence || '/api/placeholder/400/300',
      videoEvidence: activityData.videoEvidence,
    };

    return `
      ${MobileNavbar()}
      ${await Sidebar()}

      ${ModalLogout()}

      <main class="lg:ml-72 p-4 sm:p-6 overflow-y-auto h-screen">
        ${DateTime()}

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-neutral-800 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2 text-white">Foto Bukti</h3>
            <div class="relative group">
              <img
                id="evidence-photo"
                src="${safeActivityData.photoEvidence}"
                alt="Bukti Foto"
                class="w-full rounded-lg object-cover h-72 cursor-pointer transition-transform hover:scale-105"
                loading="lazy"
              />
              <div id="photo-loading" class="absolute inset-0 bg-neutral-700 rounded-lg flex items-center justify-center">
                <div class="text-center">
                  <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
                  <span class="text-neutral-300 text-sm">Memuat foto...</span>
                </div>
              </div>
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span class="text-white text-sm font-medium">Klik untuk memperbesar</span>
              </div>
            </div>
          </div>

          <div class="bg-neutral-800 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2 text-white">Video Rekaman</h3>
            <div id="video-container">
              ${
                safeActivityData.videoEvidence
                  ? `
                <video id="evidence-video" controls class="w-full aspect-video rounded-lg bg-neutral-900" preload="metadata">
                  <source src="${safeActivityData.videoEvidence}" type="video/mp4" />
                </video>
              `
                  : `
                <div class="w-full aspect-video rounded-lg bg-neutral-700 flex items-center justify-center border-2 border-dashed border-neutral-600">
                  <div class="text-center">
                    <svg class="mx-auto h-12 w-12 text-neutral-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.5-4.5L15 1m0 9l-4.5-4.5L15 1m9 14v6a2 2 0 01-2 2H2a2 2 0 01-2-2v-6m20-5V4a2 2 0 00-2-2H2a2 2 0 00-2 2v6"/>
                    </svg>
                    <span class="text-neutral-400 text-sm">Video tidak tersedia</span>
                  </div>
                </div>
              `
              }
            </div>
          </div>
        </div>

        <div class="bg-neutral-800 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-white mb-4">Detail Aktivitas</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-white">
            <div class="space-y-1">
              <span class="text-neutral-400 text-sm">Tanggal</span>
              <p class="font-semibold text-white">${safeActivityData.date}</p>
            </div>
            <div class="space-y-1">
              <span class="text-neutral-400 text-sm">Waktu</span>
              <p class="font-semibold text-white">${safeActivityData.time}</p>
            </div>
            <div class="space-y-1 sm:col-span-2">
              <span class="text-neutral-400 text-sm">Kamera</span>
              <p class="font-semibold text-white">${safeActivityData.camera}</p>
            </div>
            <div class="space-y-1 sm:col-span-2">
              <span class="text-neutral-400 text-sm">Aktivitas</span>
              <p class="font-semibold text-white leading-relaxed">${safeActivityData.activity}</p>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  async afterRender() {
    initMobileNavbar();
    initDateTime();
    setActiveSidebarLink();
    initModalLogout();
    this.presenter.init();
    this.handleMediaLoading();
  }

  handleMediaLoading() {
    const photo = document.getElementById('evidence-photo');
    const photoLoading = document.getElementById('photo-loading');

    if (photo && photoLoading) {
      photo.addEventListener('load', () => {
        photoLoading.style.display = 'none';
      });
      photo.addEventListener('error', () => {
        photoLoading.innerHTML = `<div class="text-center"><span class="text-neutral-400 text-sm">Foto tidak dapat dimuat</span></div>`;
      });
    }
  }

  updateActivityData(data) {
    console.log('Activity data updated:', data);
  }

  showError(message) {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'bg-red-600 text-white p-4 rounded-lg mb-4';
      errorDiv.textContent = `Error: ${message}`;
      mainContent.insertBefore(errorDiv, mainContent.firstChild);
    }
  }

  showSuccess(message) {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      const successDiv = document.createElement('div');
      successDiv.className = 'bg-green-600 text-white p-4 rounded-lg mb-4';
      successDiv.textContent = message;
      mainContent.insertBefore(successDiv, mainContent.firstChild);
    }
  }
}
