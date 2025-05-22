//monitoring-page.js
import MobileNavbar from '../../components/mobile-navbar.js';
import Sidebar from '../../components/sidebar.js';
import DateTime from '../../components/datetime.js';
import ModalLogout from '../../components/modal/modal-logout.js';

export default class MonitoringPage {
  constructor() {
    this.presenter = null;
  }

  async render() {
    return `
      ${MobileNavbar()}
      ${Sidebar()}
      ${ModalLogout()}
      ${this.renderAddCameraModal()}
      ${this.renderEditCameraModal()}
      ${this.renderDisconnectModal()}
       
      <main class="lg:ml-72 p-4 sm:p-6 overflow-y-auto h-screen">
        ${DateTime()}
        
        <!-- Tombol Tambah Kamera -->
        <div
          id="add-camera-btn"
          class="w-full bg-emerald-600 rounded-md py-2 px-4 text-center mb-6 text-white font-semibold cursor-pointer hover:bg-emerald-800 transition"
        >
          + Tambah Kamera
        </div>

        <!-- Grid Kamera -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8">
          ${this.renderCameraCards()}
        </div>
      </main>
    `;
  }

  renderCameraCards() {
    // Default cameras data jika presenter belum diload
    const cameras = this.presenter ? this.presenter.getCameras() : [
      { id: 1, name: 'Kamera Depan', url: '../../../public/video/contoh.mp4' },
      { id: 2, name: 'Kamera Belakang', url: '../../../public/video/contoh.mp4' },
      { id: 3, name: 'Kamera Samping', url: '../../../public/video/contoh.mp4' },
      { id: 4, name: 'Kamera Garasi', url: '../../../public/video/contoh.mp4' },
      { id: 5, name: 'Kamera Taman', url: '../../../public/video/contoh.mp4' },
      { id: 6, name: 'Kamera Ruang Tamu', url: '../../../public/video/contoh.mp4' }
    ];

    return cameras.map(camera => `
      <div class="bg-neutral-800 rounded-md overflow-hidden">
        <video controls class="w-full aspect-video rounded-sm">
          <source src="${camera.url}" type="video/mp4" />
          Browser tidak mendukung video.
        </video>
        <div class="flex justify-between items-center px-4 py-2">
          <span class="text-sm sm:text-base text-white">${camera.name}</span>
          <div class="flex gap-2 text-white">
            <button class="hover:text-yellow-400 edit-camera-btn" data-camera-id="${camera.id}">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="hover:text-red-500 disconnect-camera-btn" data-camera-id="${camera.id}">
              <i class="fa-solid fa-plug-circle-xmark"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderAddCameraModal() {
    return `
      <!-- Modal Tambah Kamera -->
      <div
        id="modal-kamera"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden"
      >
        <div class="bg-neutral-800 rounded-lg p-6 w-full max-w-md shadow-xl">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-white">Tambah Kamera</h3>
            <button id="close-modal" class="text-white text-xl hover:text-red-500">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <form id="add-camera-form" class="space-y-4">
            <div>
              <label for="nama-kamera" class="block mb-1 text-sm text-white">Nama Kamera</label>
              <input
                type="text"
                id="nama-kamera"
                class="w-full p-2 rounded-md bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label for="url-kamera" class="block mb-1 text-sm text-white">URL Video / Stream</label>
              <input
                type="text"
                id="url-kamera"
                class="w-full p-2 rounded-md bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                id="batal-modal"
                class="px-4 py-2 bg-neutral-600 rounded hover:bg-neutral-700 text-white"
              >
                Batal
              </button>
              <button type="submit" class="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  renderEditCameraModal() {
    return `
      <!-- Modal Edit Kamera -->
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
                placeholder="Kamera Samping"
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
      <!-- Modal Disconnect Kamera -->
      <div
        id="modal-disconnect"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden"
      >
        <div class="bg-neutral-800 rounded-lg p-6 w-full max-w-sm">
          <h3 class="text-lg font-semibold mb-4 text-white">Putuskan Koneksi Kamera</h3>
          <p class="mb-4 text-sm text-white">Apakah Anda yakin ingin memutuskan koneksi kamera ini?</p>
          <div class="flex justify-end gap-3">
            <button
              id="batal-disconnect"
              class="px-4 py-2 bg-neutral-600 hover:bg-neutral-700 rounded text-white"
            >
              Batal
            </button>
            <button id="confirm-disconnect" class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white">
              Putuskan
            </button>
          </div>
        </div>
      </div>
    `;
  }

  initAddCameraModal() {
    const modal = document.getElementById('modal-kamera');
    const openModal = document.getElementById('add-camera-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const cancelModalBtn = document.getElementById('batal-modal');
    const form = document.getElementById('add-camera-form');

    if (!modal || !openModal) return;

    openModal.addEventListener('click', () => modal.classList.remove('hidden'));
    
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }
    
    if (cancelModalBtn) {
      cancelModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });

    // Handle form submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddCamera();
        modal.classList.add('hidden');
      });
    }
  }

  initEditCameraModal() {
    const modalEdit = document.getElementById('modal-edit-kamera');
    const cancelEdit = document.getElementById('cancel-edit-kamera');
    const form = document.getElementById('edit-camera-form');

    if (!modalEdit) return;

    // Add event listeners to all edit buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-pen-to-square') || 
          e.target.closest('.edit-camera-btn')) {
        const cameraId = e.target.closest('.edit-camera-btn')?.dataset.cameraId;
        this.openEditModal(cameraId);
      }
    });

    if (cancelEdit) {
      cancelEdit.addEventListener('click', () => modalEdit.classList.add('hidden'));
    }

    // Close modal when clicking outside
    modalEdit.addEventListener('click', (e) => {
      if (e.target === modalEdit) modalEdit.classList.add('hidden');
    });

    // Handle form submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEditCamera();
        modalEdit.classList.add('hidden');
      });
    }
  }

  initDisconnectModal() {
    const modalDisconnect = document.getElementById('modal-disconnect');
    const cancelDisconnect = document.getElementById('batal-disconnect');
    const confirmDisconnect = document.getElementById('confirm-disconnect');

    if (!modalDisconnect) return;

    // Add event listeners to all disconnect buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-plug-circle-xmark') || 
          e.target.closest('.disconnect-camera-btn')) {
        const cameraId = e.target.closest('.disconnect-camera-btn')?.dataset.cameraId;
        this.openDisconnectModal(cameraId);
      }
    });

    if (cancelDisconnect) {
      cancelDisconnect.addEventListener('click', () => modalDisconnect.classList.add('hidden'));
    }

    if (confirmDisconnect) {
      confirmDisconnect.addEventListener('click', () => {
        this.handleDisconnectCamera();
        modalDisconnect.classList.add('hidden');
      });
    }

    // Close modal when clicking outside
    modalDisconnect.addEventListener('click', (e) => {
      if (e.target === modalDisconnect) modalDisconnect.classList.add('hidden');
    });
  }

  openEditModal(cameraId) {
    const modal = document.getElementById('modal-edit-kamera');
    const nameInput = document.getElementById('edit-nama-kamera');
    const urlInput = document.getElementById('edit-url-kamera');
    
    // Pre-fill form with current camera data (you can implement this based on your data structure)
    if (nameInput) nameInput.value = 'Kamera Samping';
    if (urlInput) urlInput.value = '../../../public/video/contoh.mp4';
    
    modal.classList.remove('hidden');
    modal.dataset.cameraId = cameraId;
  }

  openDisconnectModal(cameraId) {
    const modal = document.getElementById('modal-disconnect');
    modal.classList.remove('hidden');
    modal.dataset.cameraId = cameraId;
  }

  handleAddCamera() {
    const nameInput = document.getElementById('nama-kamera');
    const urlInput = document.getElementById('url-kamera');
    
    const cameraData = {
      name: nameInput?.value || '',
      url: urlInput?.value || ''
    };

    console.log('Adding camera:', cameraData);
    // Implement your add camera logic here
    
    // Clear form
    if (nameInput) nameInput.value = '';
    if (urlInput) urlInput.value = '';
  }

  handleEditCamera() {
    const modal = document.getElementById('modal-edit-kamera');
    const cameraId = modal.dataset.cameraId;
    const nameInput = document.getElementById('edit-nama-kamera');
    const urlInput = document.getElementById('edit-url-kamera');
    
    const cameraData = {
      id: cameraId,
      name: nameInput?.value || '',
      url: urlInput?.value || ''
    };

    console.log('Editing camera:', cameraData);
    // Implement your edit camera logic here
  }

  handleDisconnectCamera() {
    const modal = document.getElementById('modal-disconnect');
    const cameraId = modal.dataset.cameraId;
    
    console.log('Disconnecting camera:', cameraId);
    // Implement your disconnect camera logic here
  }

  async afterRender() {
    try {
      // Dynamic import presenter
      const { default: MonitoringPresenter } = await import('./monitoring-presenter.js');
      this.presenter = MonitoringPresenter;
      
      // Initialize presenter
      this.presenter.init();
      
      // Listen for camera updates
      document.addEventListener('camerasUpdated', (e) => {
        this.refreshCameraGrid();
      });
      
    } catch (error) {
      console.error('Failed to load presenter:', error);
      // Fallback: initialize basic functionality
      this.initBasicFunctionality();
    }
  }

  // Fallback initialization
  initBasicFunctionality() {
    console.log('Using basic functionality without presenter');
    // Initialize basic components
    this.initBasicModal();
  }

  initBasicModal() {
    // Basic modal functionality
    const modal = document.getElementById('modal-kamera');
    const openModal = document.getElementById('add-camera-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const cancelModalBtn = document.getElementById('batal-modal');

    if (openModal && modal) {
      openModal.addEventListener('click', () => modal.classList.remove('hidden'));
    }
    
    if (closeModalBtn && modal) {
      closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }
    
    if (cancelModalBtn && modal) {
      cancelModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }
  }

  // Method untuk refresh camera grid
  refreshCameraGrid() {
    const cameraGrid = document.querySelector('.grid');
    if (cameraGrid) {
      cameraGrid.innerHTML = this.renderCameraCards();
    }
  }
}