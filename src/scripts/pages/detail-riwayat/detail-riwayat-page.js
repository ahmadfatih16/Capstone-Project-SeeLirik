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

    // Validasi data dan fallback
    const safeActivityData = {
      date: activityData.date || 'Tidak tersedia',
      time: activityData.time || 'Tidak tersedia',
      camera: activityData.camera || 'Tidak tersedia',
      cameraLocation: activityData.cameraLocation || 'Tidak tersedia',
      activity: activityData.activity || 'Tidak ada deskripsi aktivitas',
      alarmStatus: activityData.alarmStatus || 'tidak diketahui',
      photoEvidence: activityData.photoEvidence || '/api/placeholder/400/300',
      videoEvidence: activityData.videoEvidence,
    };

    return `
      ${MobileNavbar()}
      ${await Sidebar()}

      ${ModalLogout()}

      <main class="lg:ml-72 p-4 sm:p-6 overflow-y-auto h-screen">
        ${DateTime()}
        
        <!-- Layout 2 Kolom: Foto dan Video -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Foto Bukti -->
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
              <!-- Loading overlay -->
              <div id="photo-loading" class="absolute inset-0 bg-neutral-700 rounded-lg flex items-center justify-center">
                <div class="text-center">
                  <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
                  <span class="text-neutral-300 text-sm">Memuat foto...</span>
                </div>
              </div>
              <!-- Click hint -->
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span class="text-white text-sm font-medium">Klik untuk memperbesar</span>
              </div>
            </div>
          </div>

          <!-- Video Rekaman -->
          <div class="bg-neutral-800 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2 text-white">Video Rekaman</h3>
            <div id="video-container">
              ${
                safeActivityData.videoEvidence
                  ? `
                <video id="evidence-video" controls class="w-full aspect-video rounded-lg bg-neutral-900" preload="metadata">
                  <source src="${safeActivityData.videoEvidence}" type="video/mp4" />
                  <div class="flex items-center justify-center h-full bg-neutral-700 text-neutral-300 rounded-lg">
                    Browser tidak mendukung video atau video tidak ditemukan.
                  </div>
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

        <!-- Tabel Informasi Detail -->
        <div class="bg-neutral-800 p-4 rounded-lg">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-white">Detail Aktivitas</h3>
            <!-- Action buttons -->
            <div class="flex gap-2">
              <button id="export-btn" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                Export
              </button>
              <button id="mark-reviewed-btn" class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors">
                Tandai Ditinjau
              </button>
            </div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-white">
            <div class="space-y-1">
              <span class="text-neutral-400 text-sm">Tanggal</span>
              <p class="font-semibold text-white">${safeActivityData.date}</p>
            </div>
            <div class="space-y-1">
              <span class="text-neutral-400 text-sm">Waktu</span>
              <p class="font-semibold text-white">${safeActivityData.time}</p>
            </div>
            <div class="space-y-1">
              <span class="text-neutral-400 text-sm">Kamera</span>
              <p class="font-semibold text-white">${safeActivityData.camera}</p>
            </div>
            <div class="space-y-1">
              <span class="text-neutral-400 text-sm">Lokasi Kamera</span>
              <p class="font-semibold text-white">${safeActivityData.cameraLocation}</p>
            </div>
            <div class="sm:col-span-2 space-y-1">
              <span class="text-neutral-400 text-sm">Aktivitas</span>
              <p class="font-semibold text-white leading-relaxed">${safeActivityData.activity}</p>
            </div>
            <div class="space-y-1">
              <span class="text-neutral-400 text-sm">Status Alarm</span>
              <p>
                <span class="inline-block px-3 py-1 ${this.getAlarmStatusClass(safeActivityData.alarmStatus)} text-white rounded-full text-xs font-semibold">
                  ${safeActivityData.alarmStatus.charAt(0).toUpperCase() + safeActivityData.alarmStatus.slice(1)}
                </span>
              </p>
            </div>
            ${
              activityData.confidence
                ? `
              <div class="space-y-1">
                <span class="text-neutral-400 text-sm">Confidence Level</span>
                <p class="font-semibold text-white">${Math.round(activityData.confidence * 100)}%</p>
              </div>
            `
                : ''
            }
          </div>
        </div>

        <!-- Additional Info Section -->
        ${
          activityData.severity
            ? `
          <div class="mt-6 bg-neutral-800 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2 text-white">Informasi Tambahan</h3>
            <div class="flex items-center gap-4">
              <div>
                <span class="text-neutral-400 text-sm">Tingkat Kepentingan</span>
                <p>
                  <span class="inline-block px-3 py-1 ${this.getSeverityClass(activityData.severity)} text-white rounded-full text-xs font-semibold">
                    ${this.getSeverityText(activityData.severity)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        `
            : ''
        }
      </main>
    `;
  }

  getAlarmStatusClass(status) {
    if (!status) return 'bg-gray-600';

    switch (status.toLowerCase()) {
      case 'aktif':
        return 'bg-emerald-600 hover:bg-emerald-700';
      case 'nonaktif':
        return 'bg-red-600 hover:bg-red-700';
      case 'pending':
        return 'bg-yellow-600 hover:bg-yellow-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  }

  getSeverityClass(severity) {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'bg-red-600';
      case 'medium':
        return 'bg-yellow-600';
      case 'low':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  }

  getSeverityText(severity) {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'Tinggi';
      case 'medium':
        return 'Sedang';
      case 'low':
        return 'Rendah';
      default:
        return 'Tidak Diketahui';
    }
  }

  async afterRender() {
    initMobileNavbar();
    initDateTime();
    setActiveSidebarLink();
    initModalLogout();

    // Initialize presenter
    this.presenter.init();

    // Setup page-specific event listeners
    this.setupEventListeners();

    // Handle media loading
    this.handleMediaLoading();
  }

  setupEventListeners() {
    // Export button
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const data = this.presenter.exportActivityData();
        this.downloadJSON(data, `activity-${Date.now()}.json`);
      });
    }

    // Mark as reviewed button
    const reviewBtn = document.getElementById('mark-reviewed-btn');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => {
        this.presenter.markAsReviewed();
        reviewBtn.textContent = 'Sudah Ditinjau';
        reviewBtn.disabled = true;
        reviewBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
        reviewBtn.classList.add('bg-gray-600', 'cursor-not-allowed');
      });
    }

    // Back button functionality (optional)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.history.back();
      }
    });
  }

  handleMediaLoading() {
    // Handle photo loading
    const photo = document.getElementById('evidence-photo');
    const photoLoading = document.getElementById('photo-loading');

    if (photo && photoLoading) {
      photo.addEventListener('load', () => {
        photoLoading.style.display = 'none';
      });

      photo.addEventListener('error', () => {
        photoLoading.innerHTML = `
          <div class="text-center">
            <svg class="mx-auto h-8 w-8 text-neutral-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span class="text-neutral-400 text-sm">Foto tidak dapat dimuat</span>
          </div>
        `;
      });
    }

    // Handle video loading
    const video = document.getElementById('evidence-video');
    if (video) {
      video.addEventListener('loadstart', () => {
        console.log('Video loading started');
      });

      video.addEventListener('canplay', () => {
        console.log('Video ready to play');
      });

      video.addEventListener('error', (e) => {
        console.error('Video error:', e);
        const container = document.getElementById('video-container');
        if (container) {
          container.innerHTML = `
            <div class="w-full aspect-video rounded-lg bg-neutral-700 flex items-center justify-center border-2 border-dashed border-neutral-600">
              <div class="text-center">
                <svg class="mx-auto h-12 w-12 text-neutral-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.5-4.5L15 1m0 9l-4.5-4.5L15 1"/>
                </svg>
                <p class="text-neutral-400 text-sm">Video tidak dapat dimuat</p>
                <p class="text-neutral-500 text-xs mt-1">File mungkin tidak tersedia</p>
              </div>
            </div>
          `;
        }
      });
    }
  }

  // Utility method to download JSON
  downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showSuccess('Data berhasil diexport');
  }

  // Methods that can be called by presenter
  updateActivityData(data) {
    console.log('Activity data updated:', data);
    // Could implement partial re-render here if needed
  }

  showLoading() {
    const mainContent = document.querySelector('main .grid');
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="col-span-full text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p class="text-white text-lg">Memuat data aktivitas...</p>
          <p class="text-neutral-400 text-sm mt-2">Mohon tunggu sebentar</p>
        </div>
      `;
    }
  }

  hideLoading() {
    console.log('Loading hidden');
  }

  showError(message) {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      // Remove existing error messages
      const existingError = mainContent.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }

      const errorDiv = document.createElement('div');
      errorDiv.className =
        'error-message bg-red-600 text-white p-4 rounded-lg mb-4 flex items-center justify-between shadow-lg';
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>Error: ${message}</span>
        </div>
        <button onclick="this.parentElement.remove()" class="ml-4 text-white hover:text-red-200 text-xl leading-none">×</button>
      `;
      mainContent.insertBefore(errorDiv, mainContent.firstChild);

      // Auto remove after 8 seconds
      setTimeout(() => {
        if (errorDiv.parentElement) {
          errorDiv.remove();
        }
      }, 8000);
    }
  }

  showSuccess(message) {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      const successDiv = document.createElement('div');
      successDiv.className =
        'success-message bg-green-600 text-white p-4 rounded-lg mb-4 flex items-center justify-between shadow-lg';
      successDiv.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span>${message}</span>
        </div>
        <button onclick="this.parentElement.remove()" class="ml-4 text-white hover:text-green-200 text-xl leading-none">×</button>
      `;
      mainContent.insertBefore(successDiv, mainContent.firstChild);

      // Auto remove after 5 seconds
      setTimeout(() => {
        if (successDiv.parentElement) {
          successDiv.remove();
        }
      }, 5000);
    }
  }
}
