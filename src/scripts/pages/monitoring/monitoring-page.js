import Sidebar from '../../components/sidebar.js';
import MobileNavbar, { initMobileNavbar } from '../../components/mobile-navbar.js';
import DateTime, { initDateTime } from '../../components/datetime.js';
import { setActiveSidebarLink } from '../../utils/sidebar-state.js';
import initModalLogout from '../../utils/modal/init-modal-logout.js';
import ModalFormKamera from '../../components/modal/modal-form-kamera.js';
import { openModal } from '../../utils/modal-handler.js';
import presenter from './monitoring-presenter.js';
import io from 'socket.io-client';

const activeDetections = new Map();

function drawBoundingBoxWithLabel(ctx, box, confidence) {
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 4;
  ctx.strokeRect(box.x, box.y, box.width, box.height);

  const fontSize = 30;
  ctx.font = `${fontSize}px sans-serif`;
  const text = `${(confidence * 100).toFixed(1)}%`;
  const textWidth = ctx.measureText(text).width;
  const padding = 4;

  const labelX = box.x + box.width - textWidth - padding * 2;
  const labelY = box.y;

  ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
  ctx.fillRect(labelX, labelY, textWidth + padding * 2, fontSize + padding);
  ctx.fillStyle = '#fff';
  ctx.fillText(text, labelX + padding, labelY + fontSize);
}

export default class MonitoringPage {
  constructor() {
    this.stream = null;
  }

  async render() {
    return `
      ${MobileNavbar()}
      ${await Sidebar()}

      <main class="lg:ml-72 p-4 sm:p-6 overflow-y-auto h-screen custom-scrollbar">
        ${DateTime()}
        <button id="openModal" type="button" class="w-full cursor-pointer bg-emerald-400 px-4 py-2 rounded font-semibold text-white mb-6">➕ Tambah Kamera</button>
        <div id="daftarKameraGrid" class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"></div>
      </main>
    `;
  }

  async afterRender() {
    console.log('[DEBUG] afterRender MonitoringPage terpanggil');
    initMobileNavbar();
    initDateTime();
    setActiveSidebarLink();
    initModalLogout();

    const tombol = document.getElementById('openModal');
    if (tombol) {
      tombol.onclick = async () => {
        console.log('[DEBUG] Diklik, listener aktif!');
        const html = ModalFormKamera();
        await openModal(html);
      };
    }

    presenter.setView(this);
    presenter.renderAllCameras();

    const socket = io('https://realtime-server-seelirik-production.up.railway.app');
    socket.on('new_detection', (data) => {
      const { camera_name, bounding_box, label, confidence } = data;
      console.log('📦 Event Diterima:', { camera_name, bounding_box, label, confidence });

      const card = [...document.querySelectorAll('.kamera-preview')].find(
        (el) => el.dataset.cameraName === camera_name
      );

      if (!card) {
        console.warn('❌ Kamera tidak ditemukan:', camera_name);
        return;
      }

      const video = card.querySelector('video');
      const canvas = card.querySelector('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const scaleX = canvas.width / video.videoWidth;
      const scaleY = canvas.height / video.videoHeight;

      const scaledBox = {
        x: bounding_box.x * scaleX,
        y: bounding_box.y * scaleY,
        width: bounding_box.width * scaleX,
        height: bounding_box.height * scaleY,
      };

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBoundingBoxWithLabel(ctx, scaledBox, confidence || 0);

      // Simpan deteksi terakhir di data atribut
      card.dataset.lastDetection = JSON.stringify({ box: scaledBox, confidence });

      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        delete card.dataset.lastDetection;
      }, 3000);
    });
  }

  showCameraCard(cardElement) {
    document.getElementById('daftarKameraGrid')?.appendChild(cardElement);
  }

  clearCameraGrid() {
    document.getElementById('daftarKameraGrid').innerHTML = '';
  }

  createCameraCard({ id, name, stream, onEdit, onDelete }) {
    const card = document.createElement('div');
    card.className = 'bg-neutral-800 p-4 rounded-lg shadow-lg kamera-preview';
    card.dataset.cameraName = name;
    card.style.position = 'relative';

    card.innerHTML = `
      <div class="video-wrapper relative w-full aspect-video bg-black rounded overflow-hidden">
        <video autoplay muted loop class="absolute top-0 left-0 w-full h-full object-contain rounded"></video>
        <canvas class="absolute top-0 left-0 w-full h-full pointer-events-none"></canvas>
      </div>
      <div class="mt-3 text-white flex justify-between items-center">
        <span class="font-medium">${name}</span>
        <div class="flex gap-2 text-xl">
          <button title="Fullscreen" class="hover:text-emerald-400"><i class="fas fa-expand"></i></button>
          <button title="Edit Nama" class="hover:text-emerald-400"><i class="fas fa-pen"></i></button>
          <button title="Disconnect" class="hover:text-emerald-400"><i class="fas fa-power-off"></i></button>
        </div>
      </div>
    `;

    const video = card.querySelector('video');
    const canvas = card.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    video.srcObject = stream;

    card.querySelector('.fa-expand').onclick = () => video.requestFullscreen();
    card.querySelector('.fa-pen').onclick = () => {
      const newName = prompt('Masukkan nama baru:', name);
      if (newName) {
        card.querySelector('span').innerText = newName;
        onEdit?.(newName);
      }
    };

    card.querySelector('.fa-power-off').onclick = () => {
      const intervalId = activeDetections.get(card);
      if (intervalId) clearInterval(intervalId);
      activeDetections.delete(card);
      stream.getTracks().forEach((t) => t.stop());
      card.remove();
      onDelete?.();
    };

    const captureCanvas = document.createElement('canvas');
    const intervalId = setInterval(async () => {
      if (!video.videoWidth) return;

      captureCanvas.width = video.videoWidth;
      captureCanvas.height = video.videoHeight;
      const captureCtx = captureCanvas.getContext('2d');
      captureCtx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);

      const lastDetection = card.dataset.lastDetection;
      if (lastDetection) {
        const parsed = JSON.parse(lastDetection);
        drawBoundingBoxWithLabel(captureCtx, parsed.box, parsed.confidence || 0);
      }

      captureCanvas.toBlob(
        async (blob) => {
          const formData = new FormData();
          formData.append('image', blob, 'snapshot.jpg');
          formData.append('camera_id', id);
          formData.append('camera_name', name);

          const token = localStorage.getItem('token');
          try {
            // await fetch('http://localhost:3000/snapshots', {
            await fetch('https://seelirik-backend-server-production.up.railway.app/snapshots', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            });
          } catch (err) {
            console.error('❌ Gagal kirim snapshot:', err);
          }
        },
        'image/jpeg',
        0.5
      );
    }, 1000);

    activeDetections.set(card, intervalId);

    return card;
  }
}
