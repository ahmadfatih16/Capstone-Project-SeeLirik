import MobileNavbar from '../../components/mobile-navbar.js';
import Sidebar from '../../components/sidebar.js';
import DateTime from '../../components/datetime.js';
import ModalLogout from '../../components/modal/modal-logout.js';
import PreviewPresenter from './preview-presenter.js'; // Import the new presenter

export default class PreviewPage {
  constructor() {
    this.presenter = new PreviewPresenter(this); // Pass the view instance to the presenter
    // Initial placeholder values; actual data will be set by the presenter
    this.currentCamera = { name: 'Memuat Kamera...', url: '', id: null };
  }

  async render() {
    return `
      ${MobileNavbar()}
      ${Sidebar()}
      ${ModalLogout()}
      ${this.renderEditCameraModal()}
      ${this.renderDisconnectModal()}

      <main class="lg:ml-72 p-4 sm:p-6 overflow-y-auto h-screen flex flex-col">
        <div
          class="flex sm:flex-row justify-between sm:items-center w-full mb-6 text-sm sm:text-base md:text-lg lg:text-2xl font-semibold gap-2 text-white"
        >
          <h2 id="tanggal"></h2>
          <h2 id="judul-kamera">${this.currentCamera.name}</h2>
          <h2 id="waktu"></h2>
        </div>

        <div class="flex-1 flex flex-col justify-center items-center min-h-0">
          <div class="w-full flex justify-center mb-8">
            <div class="w-full max-w-6xl">
              <div class="hidden md:flex items-center justify-center gap-6">
                <button id="prev-camera" class="bg-neutral-800 hover:bg-neutral-700 text-white p-4 rounded-full transition-all flex-shrink-0">
                  <i class="fa-solid fa-chevron-left text-xl"></i>
                </button>
                
                <video controls class="w-full aspect-video rounded-3xl max-w-5xl" id="main-camera-video">
                  <source src="${this.currentCamera.url}" type="video/mp4" />
                  Browser tidak mendukung video.
                </video>
                
                <button id="next-camera" class="bg-neutral-800 hover:bg-neutral-700 text-white p-4 rounded-full transition-all flex-shrink-0">
                  <i class="fa-solid fa-chevron-right text-xl"></i>
                </button>
              </div>

              <div class="md:hidden flex flex-col items-center">
                <video controls class="w-full aspect-video rounded-3xl mb-6 max-w-5xl" id="main-camera-video-mobile">
                  <source src="${this.currentCamera.url}" type="video/mp4" />
                  Browser tidak mendukung video.
                </video>
                
                <div class="flex justify-center gap-4 mb-6">
                  <button id="prev-camera-mobile" class="bg-neutral-800 hover:bg-neutral-700 text-white p-4 rounded-full transition-all">
                    <i class="fa-solid fa-chevron-left text-xl"></i>
                  </button>
                  <button id="next-camera-mobile" class="bg-neutral-800 hover:bg-neutral-700 text-white p-4 rounded-full transition-all">
                    <i class="fa-solid fa-chevron-right text-xl"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-center gap-4">
            <button id="edit-camera" class="flex items-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-600 text-white rounded-lg transition-colors text-lg">
              <i class="fa-solid fa-edit"></i>
              <span>Edit</span>
            </button>
            <button id="disconnect-camera" class="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-lg">
              <i class="fa-solid fa-unlink"></i>
              <span>Disconnect</span>
            </button>
          </div>
        </div>
        <button id="back-to-monitoring" class="mt-6 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded text-white self-center">
          <i class="fa-solid fa-arrow-left mr-2"></i> Kembali ke Monitoring
        </button>
      </main>
    `;
  }

  // Modals (render methods remain the same as they correctly use Tailwind classes)
  renderEditCameraModal() {
    return `
      <div
        id="modal-edit-kamera"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden"
      >
        <div class="bg-neutral-800 rounded-lg p-6 w-full max-w-md">
          <h3 class="text-lg font-semibold mb-4 text-white">Edit Kamera</h3>
          <form id="edit-camera-form" class="space-y-4">
            <div>
              <label class="block text-sm mb-1 text-white">Nama Kamera</label>
              <input
                type="text"
                id="edit-nama-kamera"
                class="w-full p-2 rounded bg-neutral-700 text-white border border-neutral-600"
                placeholder="Nama Kamera"
              />
            </div>
            <div>
              <label class="block text-sm mb-1 text-white">URL Kamera</label>
              <input
                type="text"
                id="edit-url-kamera"
                class="w-full p-2 rounded bg-neutral-700 text-white border border-neutral-600"
                placeholder="http://stream.example.com"
              />
            </div>
            <div class="flex justify-end gap-2">
              <button
                type="button"
                id="cancel-edit-kamera"
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
    `;
  }

  renderDisconnectModal() {
    return `
      <div
        id="modal-disconnect"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden"
      >
        <div class="bg-neutral-800 rounded-lg p-6 w-full max-w-sm">
          <h3 class="text-lg font-semibold mb-4 text-white">Putuskan Koneksi Kamera</h3>
          <p class="mb-4 text-sm text-white">Apakah Anda yakin ingin memutuskan koneksi kamera ini?</p>
          <div class="flex justify-end gap-3">
            <button
              type="button"
              id="batal-disconnect"
              class="px-4 py-2 bg-neutral-600 hover:bg-neutral-700 rounded text-white"
            >
              Batal
            </button>
            <button type="button" id="confirm-disconnect" class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white">
              Putuskan
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // --- Methods to be called by the Presenter to update the View ---

  /**
   * Sets the current camera data to be displayed and updates the UI.
   * @param {Object} camera - The camera object with id, name, and url.
   */
  setCurrentCameraDisplay(camera) {
    this.currentCamera = camera;
    const judulKamera = document.getElementById('judul-kamera');
    const mainVideo = document.getElementById('main-camera-video');
    const mainVideoMobile = document.getElementById('main-camera-video-mobile');

    if (judulKamera) judulKamera.textContent = camera.name;
    if (mainVideo) {
      mainVideo.src = camera.url;
      mainVideo.load(); // Reload video source
    }
    if (mainVideoMobile) {
      mainVideoMobile.src = camera.url;
      mainVideoMobile.load(); // Reload video source
    }
  }

  /**
   * Updates the date and time display.
   */
  updateDateTimeDisplay() {
    const tanggalElement = document.getElementById('tanggal');
    const waktuElement = document.getElementById('waktu');
    const dateTimeParts = DateTime().split('<br>'); // Assuming DateTime returns "Date<br>Time"

    if (tanggalElement) tanggalElement.innerHTML = dateTimeParts[0];
    if (waktuElement) waktuElement.innerHTML = dateTimeParts[1];
  }

  /**
   * Shows the edit camera modal and pre-fills its fields.
   * @param {string} name - The current name of the camera.
   * @param {string} url - The current URL of the camera.
   */
  showEditModal(name, url) {
    const modal = document.getElementById('modal-edit-kamera');
    const nameInput = document.getElementById('edit-nama-kamera');
    const urlInput = document.getElementById('edit-url-kamera');

    if (nameInput) nameInput.value = name;
    if (urlInput) urlInput.value = url;
    if (modal) modal.classList.remove('hidden');
  }

  /**
   * Hides the edit camera modal.
   */
  hideEditModal() {
    const modal = document.getElementById('modal-edit-kamera');
    if (modal) modal.classList.add('hidden');
  }

  /**
   * Shows the disconnect camera modal.
   */
  showDisconnectModal() {
    const modal = document.getElementById('modal-disconnect');
    if (modal) modal.classList.remove('hidden');
  }

  /**
   * Hides the disconnect camera modal.
   */
  hideDisconnectModal() {
    const modal = document.getElementById('modal-disconnect');
    if (modal) modal.classList.add('hidden');
  }

  // --- Lifecycle Methods ---

  async afterRender() {
    await this.presenter.init();
    this._bindUIEvents();
  }

  _bindUIEvents() {
    // Navigation Buttons
    document
      .getElementById('prev-camera')
      ?.addEventListener('click', () => this.presenter.handlePrevCamera());
    document
      .getElementById('next-camera')
      ?.addEventListener('click', () => this.presenter.handleNextCamera());
    document
      .getElementById('prev-camera-mobile')
      ?.addEventListener('click', () => this.presenter.handlePrevCamera());
    document
      .getElementById('next-camera-mobile')
      ?.addEventListener('click', () => this.presenter.handleNextCamera());

    // Action Buttons - Using IDs from your original HTML: "edit-camera" and "disconnect-camera"
    document
      .getElementById('edit-camera')
      ?.addEventListener('click', () => this.presenter.handleEditCameraClick());
    document
      .getElementById('disconnect-camera')
      ?.addEventListener('click', () => this.presenter.handleDisconnectCameraClick());
    document
      .getElementById('back-to-monitoring')
      ?.addEventListener('click', () => (window.location.hash = '#/monitoring'));

    // Modal Edit Camera - Using IDs from your original HTML and consistent input IDs
    document
      .getElementById('cancel-edit-kamera')
      ?.addEventListener('click', () => this.presenter.handleCancelEdit());
    document.getElementById('modal-edit-kamera')?.addEventListener('click', (e) => {
      if (e.target === document.getElementById('modal-edit-kamera')) {
        this.presenter.handleCancelEdit();
      }
    });
    document.getElementById('edit-camera-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = document.getElementById('edit-nama-kamera').value;
      const newUrl = document.getElementById('edit-url-kamera').value;
      this.presenter.handleSaveEdit(newName, newUrl);
    });

    // Modal Disconnect Camera - Using IDs from your original HTML: "batal-disconnect" and "konfirm-disconnect"
    document
      .getElementById('batal-disconnect')
      ?.addEventListener('click', () => this.presenter.handleCancelDisconnect());
    document
      .getElementById('konfirm-disconnect')
      ?.addEventListener('click', () => this.presenter.handleConfirmDisconnect());
    document.getElementById('modal-disconnect')?.addEventListener('click', (e) => {
      if (e.target === document.getElementById('modal-disconnect')) {
        this.presenter.handleCancelDisconnect();
      }
    });
  }
}
