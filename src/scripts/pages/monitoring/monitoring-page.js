import Sidebar from '../../components/sidebar.js';
import MobileNavbar, { initMobileNavbar } from '../../components/mobile-navbar.js';
import DateTime, { initDateTime } from '../../components/datetime.js';
import { setActiveSidebarLink } from '../../utils/sidebar-state.js';
import { kirimKeModel } from '../../data/api.js';
import { renderKameraList } from './monitoring-presenter.js';
import MonitoringPresenter from './monitoring-presenter.js';
import { postKamera } from '../../data/api.js';


export default class MonitoringPage {
  constructor() {
    this.stream = null;
  }

  async render() {
    return `
      ${MobileNavbar()}
      ${await Sidebar()}

      <main class="lg:ml-72 p-4 sm:p-6">
        ${DateTime()}

        <section class="p-6 bg-neutral-900 text-white rounded-xl shadow-lg max-w-3xl mx-auto mt-6">
          <div class="mb-6">
            <label for="cameraSelect" class="block mb-2 text-sm font-medium text-emerald-400">Pilih Kamera</label>
            <select id="cameraSelect" class="w-full p-3 rounded-lg bg-neutral-800 border border-emerald-400 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"></select>

            <div class="mb-6">
  <label for="namaKamera" class="block mb-2 text-sm font-medium text-emerald-400">Nama Kamera</label>
  <input type="text" id="namaKamera" placeholder="Masukkan nama kamera" class="w-full p-3 rounded-lg bg-neutral-800 border border-emerald-400 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400">
</div>

          </div>

          <div class="flex flex-col sm:flex-row gap-4 mb-6">
            <button id="btnStartPreview" class="flex-1 bg-emerald-400 text-neutral-900 font-semibold px-4 py-3 rounded-lg hover:bg-emerald-300 cursor-pointer transition-colors">
              Preview Kamera
            </button>
            <button id="btnSendToML" class="flex-1 bg-emerald-500 text-neutral-900 font-semibold px-4 py-3 rounded-lg hover:bg-emerald-300 cursor-pointer transition-colors">
              Kirim ke Model Deteksi
            </button>
          </div>

          <div class="mb-6 relative w-fit mx-auto flex justify-center">
            <video id="videoPreview" class="rounded-lg border border-emerald-400 shadow-md" autoplay muted playsinline width="640" height="480"></video>
            <canvas id="canvasOverlay" class="absolute top-0 left-0 z-10 pointer-events-none"></canvas>
          </div>

          <div id="result" class="mt-6 text-emerald-400"></div>
        </section>

        <!-- Daftar Kamera -->
        <section class="mt-6 max-w-6xl mx-auto">
          <h2 class="text-white text-xl font-bold mb-4">Daftar Kamera Tersedia</h2>
          <div id="camera-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
        </section>
      </main>
    `;
  }

  async afterRender() {
    const cameraSelect = document.getElementById('cameraSelect');
    const btnStartPreview = document.getElementById('btnStartPreview');
    const btnSendToML = document.getElementById('btnSendToML');
    const video = document.getElementById('videoPreview');
    const canvasOverlay = document.getElementById('canvasOverlay');
    const result = document.getElementById('result');
  
    // Fetch camera list for preview dropdown
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      videoDevices.forEach(device => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label || `Camera ${cameraSelect.length + 1}`;
        cameraSelect.appendChild(option);
      });
    } catch (err) {
      console.error('Gagal mendapatkan daftar kamera:', err);
    }
  
    btnStartPreview.addEventListener('click', async () => {
      const selectedDeviceId = cameraSelect.value;
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
      }
  
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: selectedDeviceId } },
          audio: false,
        });
        video.srcObject = this.stream;
        video.onloadedmetadata = () => {
          canvasOverlay.width = video.videoWidth;
          canvasOverlay.height = video.videoHeight;
        };
      } catch (err) {
        console.error('Gagal membuka kamera:', err);
      }
    });
    console.log('Selected deviceId:', selectedDeviceId);
    console.log('Video devices:', videoDevices);


  
    btnSendToML.addEventListener('click', async () => {
      if (!this.stream) return;
  
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/jpeg');
  
      const presenter = new MonitoringPresenter();
      await presenter.prosesDeteksiGambar(base64Image, canvasOverlay, result);
      const namaKamera = document.getElementById('namaKamera').value;
const selectedDeviceId = cameraSelect.value;

if (!namaKamera) {
  alert('Nama kamera wajib diisi!');
  return;
}

try {
  await postKamera(namaKamera, selectedDeviceId);
  alert('Kamera berhasil ditambahkan dan worker dimulai!');
} catch (err) {
  console.error(err);
  alert(err.message || 'Terjadi kesalahan saat menambahkan kamera');
}

    });
  
    await renderKameraList();
  }
  
}
