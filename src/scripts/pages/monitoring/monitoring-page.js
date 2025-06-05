import Sidebar from '../../components/sidebar.js';
import MobileNavbar, { initMobileNavbar } from '../../components/mobile-navbar.js';
import DateTime, { initDateTime } from '../../components/datetime.js';
import { setActiveSidebarLink } from '../../utils/sidebar-state.js';
import initModalLogout from '../../utils/modal/init-modal-logout.js';
import ModalFormKamera from '../../components/modal/modal-form-kamera.js';
import { openModal } from '../../utils/modal-handler.js';
import presenter from './monitoring-presenter.js';
import io from 'socket.io-client';

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

    // SOCKET.IO: Dengarkan bounding box dari WebSocket server
    // const socket = io('http://localhost:4000');
    const socket = io('https://realtime-server-seelirik-production.up.railway.app');


    socket.on('new_detection', (data) => {
      const { camera_name, bounding_box, label } = data;
      console.log('📦 Event Diterima:', { camera_name, bounding_box, label });
    
      const card = [...document.querySelectorAll('.kamera-preview')]
        .find(el => el.dataset.cameraName === camera_name);
    
      if (!card) {
        console.warn('❌ Kamera tidak ditemukan:', camera_name);
        return;
      }
    
      const video = card.querySelector('video');
      console.log('🎥 Video ditemukan:', video);
    
      const wrapper = video.closest('.relative');
      if (!wrapper) {
        console.warn('❌ Tidak menemukan elemen .relative untuk video');
        return;
      }
    
      // Debug ukuran video
      console.log('📏 video.videoWidth:', video.videoWidth);
      console.log('📏 video.offsetWidth:', video.offsetWidth);
      console.log('📏 video.videoHeight:', video.videoHeight);
      console.log('📏 video.offsetHeight:', video.offsetHeight);
    
      const scaleX = video.offsetWidth / video.videoWidth;
      const scaleY = video.offsetHeight / video.videoHeight;
      console.log('🔍 scaleX:', scaleX, 'scaleY:', scaleY);
    
      const scaled = {
        left: bounding_box.x * scaleX,
        top: bounding_box.y * scaleY,
        width: bounding_box.width * scaleX,
        height: bounding_box.height * scaleY,
      };
      console.log('📦 Bounding Box Scaled:', scaled);
    
      const box = document.createElement('div');
      box.className = 'absolute border-2 border-red-600 bg-red-600/20 rounded z-50 pointer-events-none box-border';
      box.style.left = `${scaled.left}px`;
      box.style.top = `${scaled.top}px`;
      box.style.width = `${scaled.width}px`;
      box.style.height = `${scaled.height}px`;
    
      const labelBox = document.createElement('span');
      labelBox.className = 'absolute -top-4 left-0 bg-red-600 text-white text-xs px-1 rounded';
      labelBox.textContent = label || 'Terdeteksi';
      box.appendChild(labelBox);
    
      wrapper.appendChild(box);
    
      console.log('✅ Bounding Box ditambahkan ke:', wrapper);
    
      setTimeout(() => {
        box.remove();
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
      <div class="relative">
        <video autoplay muted loop class="rounded w-full aspect-video bg-black"></video>
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
    video.srcObject = stream;

    card.querySelector('.fa-expand').onclick = () => video.requestFullscreen();
    card.querySelector('.fa-pen').onclick = () => {
      const newName = prompt("Masukkan nama baru:", name);
      if (newName) {
        card.querySelector('span').innerText = newName;
        onEdit?.(newName);
      }
    };

    card.querySelector('.fa-power-off').onclick = () => {
      stream.getTracks().forEach(t => t.stop());
      card.remove();
      onDelete?.();
    };

    return card;
  }
}