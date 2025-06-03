import Sidebar from '../../components/sidebar.js';
import MobileNavbar, { initMobileNavbar } from '../../components/mobile-navbar.js';
import DateTime, { initDateTime } from '../../components/datetime.js';
import { setActiveSidebarLink } from '../../utils/sidebar-state.js';
import initModalLogout from '../../utils/modal/init-modal-logout.js';
import ModalFormKamera from '../../components/modal/modal-form-kamera.js';
import { openModal } from '../../utils/modal-handler.js';
import presenter from './monitoring-presenter.js';

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
  }

  showCameraCard(cardElement) {
    document.getElementById('daftarKameraGrid')?.appendChild(cardElement);
  }

  clearCameraGrid() {
    document.getElementById('daftarKameraGrid').innerHTML = '';
  }

  createCameraCard({ id, name, stream, onEdit, onDelete }) {
    const card = document.createElement('div');
    card.className = 'bg-neutral-800 p-4 rounded-lg shadow-lg';
    card.innerHTML = `
      <video autoplay muted loop class="rounded w-full aspect-video bg-black"></video>
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