import MobileNavbar, { initMobileNavbar } from '../../components/mobile-navbar.js';
import Sidebar from '../../components/sidebar.js';
import DateTime, { initDateTime } from '../../components/datetime.js';
import { setActiveSidebarLink } from '../../utils/sidebar-state.js';
import ModalLogout from '../../components/modal/modal-logout.js';
import initModalLogout from '../../utils/modal/init-modal-logout.js';
import AkunPresenter from './akun-presenter.js';
import ModalEditAkun from '../../components/modal/modal-edit-akun.js';

export default class AkunPage {
  constructor() {
    this.presenter = new AkunPresenter();
  }

  async render() {
    document.body.insertAdjacentHTML('beforeend', ModalEditAkun());
    return `
      ${MobileNavbar()}
      ${await Sidebar()}

      ${ModalLogout()}

      <main class="lg:ml-72 p-4 sm:p-6 overflow-y-auto h-screen">
        ${DateTime()}

        <div id="akun-loading" class="text-white text-center py-8">Memuat data akun...</div>

        <!-- Akun Toko -->
        <div id="akun-detail-container" class="hidden w-full max-w-4xl mx-auto bg-neutral-900 p-6 rounded-md">
          <div class="flex flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h3 id="nama-toko-display" class="text-2xl font-bold text-emerald-400">-</h3>
              <p id="deskripsi-toko-display" class="text-sm text-white">-</p>
            </div>
            <button
              id="edit-akun"
              class="cursor-pointer flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded mt-4 sm:mt-0"
            >
              <i class="fa-solid fa-pen-to-square"></i>
              EDIT
            </button>
          </div>

          <hr class="border-neutral-600 mb-6" />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-emerald-400 mb-1">Nama Toko</label>
              <div id="nama-toko-field" class="bg-neutral-800 p-2 rounded text-white">Loading...</div>
            </div>
            <div>
              <label class="block text-emerald-400 mb-1">Username</label>
              <div id="user-field" class="bg-neutral-800 p-2 rounded text-white">Loading...</div>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-emerald-400 mb-1">Alamat</label>
            <div id="alamat-field" class="bg-neutral-800 p-2 rounded text-white">Loading...</div>
          </div>

          <div class="mb-4">
            <label class="block text-emerald-400 mb-1">Email</label>
            <div id="email-field" class="bg-neutral-800 p-2 rounded text-white">Loading...</div>
          </div>

          <div>
            <label class="block text-emerald-400 mb-1">Kata Sandi</label>
            <div id="password-field" class="bg-neutral-800 p-2 rounded text-white">********************</div>
          </div>
        </div>
       
      </main>
    `;
  }

  async afterRender() {
    setActiveSidebarLink('akun');
    initMobileNavbar();
    initDateTime();
    initModalLogout();
    await this.presenter.init();
  }
}
