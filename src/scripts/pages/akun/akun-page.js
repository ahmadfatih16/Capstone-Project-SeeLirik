import MobileNavbar, { initMobileNavbar } from '../../components/mobile-navbar.js';
import Sidebar from '../../components/sidebar.js';
import DateTime, { initDateTime } from '../../components/datetime.js';
import { setActiveSidebarLink } from '../../utils/sidebar-state.js';
import ModalLogout from '../../components/modal/modal-logout.js';
import initModalLogout from '../../utils/modal/init-modal-logout.js';
import AkunPresenter from './akun-presenter.js';

export default class AkunPage {
  constructor() {
    this.presenter = new AkunPresenter();
  }

  async render() {
    return `
      ${MobileNavbar()}
      ${Sidebar()}
      ${ModalLogout()}

      <main class="lg:ml-72 p-4 sm:p-6 overflow-y-auto h-screen">
        ${DateTime()}
        
        <!-- Akun Toko -->
        <div class="w-full max-w-4xl mx-auto bg-neutral-900 p-6 rounded-md">
          <div class="flex flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h3 id="nama-toko-display" class="text-2xl font-bold text-emerald-400">Toko Kemakmuran</h3>
              <p id="alamat-toko-display" class="text-sm text-white">Krapyak, Dongkelan, Yogyakarta</p>
            </div>
            <button
              id="edit-akun"
              class="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded mt-4 sm:mt-0"
            >
              <i class="fa-solid fa-pen-to-square"></i>
              EDIT
            </button>
          </div>
          <hr class="border-neutral-600 mb-6" />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-emerald-400 mb-1">Nama Toko</label>
              <div id="nama-toko-field" class="bg-neutral-800 p-2 rounded text-white">Toko Kemakmuran Bersama</div>
            </div>
            <div>
              <label class="block text-emerald-400 mb-1">Admin</label>
              <div id="admin-field" class="bg-neutral-800 p-2 rounded text-white">Ahmad Fatih Hibatillah</div>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-emerald-400 mb-1">Alamat</label>
            <div id="alamat-field" class="bg-neutral-800 p-2 rounded text-white">Krapyak, Dongkelan, Yogyakarta</div>
          </div>

          <div class="mb-4">
            <label class="block text-emerald-400 mb-1">Email</label>
            <div id="email-field" class="bg-neutral-800 p-2 rounded text-white">kemakmuran@gmail.com</div>
          </div>

          <div>
            <label class="block text-emerald-400 mb-1">Kata Sandi</label>
            <div id="password-field" class="bg-neutral-800 p-2 rounded text-white">********************</div>
          </div>
        </div>

        <!-- Modal Edit Akun -->
        <div
          id="modal-akun"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden"
        >
          <div class="bg-neutral-800 rounded-lg p-6 w-full max-w-lg">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-white">Edit Akun</h3>
              <button id="close-akun" class="text-white text-xl hover:text-red-500">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form id="form-edit-akun" class="space-y-4">
              <div>
                <label class="block text-sm mb-1 text-white">Nama Toko</label>
                <input
                  id="input-nama-toko"
                  type="text"
                  class="w-full p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:ring-2 focus:ring-emerald-500"
                  value="Toko Kemakmuran Bersama"
                />
              </div>
              <div>
                <label class="block text-sm mb-1 text-white">Admin</label>
                <input
                  id="input-admin"
                  type="text"
                  class="w-full p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:ring-2 focus:ring-emerald-500"
                  value="Ahmad Fatih Hibatillah"
                />
              </div>
              <div>
                <label class="block text-sm mb-1 text-white">Alamat</label>
                <input
                  id="input-alamat"
                  type="text"
                  class="w-full p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:ring-2 focus:ring-emerald-500"
                  value="Krapyak, Dongkelan, Yogyakarta"
                />
              </div>
              <div>
                <label class="block text-sm mb-1 text-white">Email</label>
                <input
                  id="input-email"
                  type="email"
                  class="w-full p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:ring-2 focus:ring-emerald-500"
                  value="kemakmuran@gmail.com"
                />
              </div>
              <div>
                <label class="block text-sm mb-1 text-white">Kata Sandi</label>
                <input
                  id="input-password"
                  type="password"
                  class="w-full p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:ring-2 focus:ring-emerald-500"
                  placeholder="Masukkan kata sandi baru"
                />
              </div>
              <div class="flex justify-end gap-3">
                <button
                  type="button"
                  id="batal-akun"
                  class="px-4 py-2 bg-neutral-600 hover:bg-neutral-700 rounded text-white"
                >
                  Batal
                </button>
                <button type="submit" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded text-white">
                  Simpan
                </button>
              </div>
            </form>
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
    
    // Initialize presenter
    await this.presenter.init();
  }
}