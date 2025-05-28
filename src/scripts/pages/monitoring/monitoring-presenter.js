// monitoring-presenter.js
import { setActiveSidebarLink } from '../../utils/sidebar-state.js';
import { initMobileNavbar } from '../../components/mobile-navbar.js';
import { initDateTime } from '../../components/datetime.js';
import initModalLogout from '../../utils/modal/init-modal-logout.js';

const MonitoringPresenter = {
  // Data cameras (bisa diganti dengan API call)
  cameras: [
    { id: 1, name: 'Kamera Depan', url: '../../../public/video/contoh.mp4', status: 'connected' },
    {
      id: 2,
      name: 'Kamera Belakang',
      url: '../../../public/video/contoh.mp4',
      status: 'connected',
    },
    { id: 3, name: 'Kamera Samping', url: '../../../public/video/contoh.mp4', status: 'connected' },
    { id: 4, name: 'Kamera Garasi', url: '../../../public/video/contoh.mp4', status: 'connected' },
    { id: 5, name: 'Kamera Taman', url: '../../../public/video/contoh.mp4', status: 'connected' },
    {
      id: 6,
      name: 'Kamera Ruang Tamu',
      url: '../../../public/video/contoh.mp4',
      status: 'connected',
    },
  ],

  selectedCameraId: null,

  init() {
    console.log('MonitoringPresenter aktif');
    this.initializeComponents();
    this.initializeCameraEvents();
  },

  // Initialize komponen dasar
  initializeComponents() {
    initMobileNavbar();
    initDateTime();
    setActiveSidebarLink();
    initModalLogout();
  },

  // Initialize event handlers untuk kamera
  initializeCameraEvents() {
    this.initAddCameraModal();
    this.initEditCameraModal();
    this.initDisconnectModal();
  },

  // Get all cameras data
  getCameras() {
    return this.cameras;
  },

  // Get camera by ID
  getCameraById(id) {
    return this.cameras.find((camera) => camera.id === parseInt(id));
  },

  // Add new camera
  addCamera(cameraData) {
    const newCamera = {
      id: this.cameras.length + 1,
      name: cameraData.name || 'Kamera Baru',
      url: cameraData.url || '',
      status: 'connected',
    };

    this.cameras.push(newCamera);
    console.log('Camera added:', newCamera);

    // Refresh view (bisa trigger re-render)
    this.refreshCameraGrid();
    return newCamera;
  },

  // Update existing camera
  updateCamera(id, cameraData) {
    const cameraIndex = this.cameras.findIndex((camera) => camera.id === parseInt(id));

    if (cameraIndex !== -1) {
      this.cameras[cameraIndex] = {
        ...this.cameras[cameraIndex],
        name: cameraData.name || this.cameras[cameraIndex].name,
        url: cameraData.url || this.cameras[cameraIndex].url,
      };

      console.log('Camera updated:', this.cameras[cameraIndex]);
      this.refreshCameraGrid();
      return this.cameras[cameraIndex];
    }

    return null;
  },

  // Disconnect/Remove camera
  disconnectCamera(id) {
    const cameraIndex = this.cameras.findIndex((camera) => camera.id === parseInt(id));

    if (cameraIndex !== -1) {
      const disconnectedCamera = this.cameras.splice(cameraIndex, 1)[0];
      console.log('Camera disconnected:', disconnectedCamera);
      this.refreshCameraGrid();
      return disconnectedCamera;
    }

    return null;
  },

  // Modal handlers
  initAddCameraModal() {
    const modal = document.getElementById('modal-kamera');
    const openModal = document.getElementById('add-camera-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const cancelModalBtn = document.getElementById('batal-modal');
    const form = document.getElementById('add-camera-form');

    if (!modal || !openModal) return;

    openModal.addEventListener('click', () => {
      this.openAddCameraModal();
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        this.closeModal('modal-kamera');
      });
    }

    if (cancelModalBtn) {
      cancelModalBtn.addEventListener('click', () => {
        this.closeModal('modal-kamera');
      });
    }

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal('modal-kamera');
      }
    });

    // Handle form submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddCameraSubmit();
      });
    }
  },

  initEditCameraModal() {
    const modalEdit = document.getElementById('modal-edit-kamera');
    const cancelEdit = document.getElementById('cancel-edit-kamera');
    const form = document.getElementById('edit-camera-form');

    if (!modalEdit) return;

    // Event delegation untuk edit buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-pen-to-square') || e.target.closest('.edit-camera-btn')) {
        const cameraId = e.target.closest('.edit-camera-btn')?.dataset.cameraId;
        this.openEditCameraModal(cameraId);
      }
    });

    if (cancelEdit) {
      cancelEdit.addEventListener('click', () => {
        this.closeModal('modal-edit-kamera');
      });
    }

    // Close modal when clicking outside
    modalEdit.addEventListener('click', (e) => {
      if (e.target === modalEdit) {
        this.closeModal('modal-edit-kamera');
      }
    });

    // Handle form submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEditCameraSubmit();
      });
    }
  },

  initDisconnectModal() {
    const modalDisconnect = document.getElementById('modal-disconnect');
    const cancelDisconnect = document.getElementById('batal-disconnect');
    const confirmDisconnect = document.getElementById('confirm-disconnect');

    if (!modalDisconnect) return;

    // Event delegation untuk disconnect buttons
    document.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('fa-plug-circle-xmark') ||
        e.target.closest('.disconnect-camera-btn')
      ) {
        const cameraId = e.target.closest('.disconnect-camera-btn')?.dataset.cameraId;
        this.openDisconnectModal(cameraId);
      }
    });

    if (cancelDisconnect) {
      cancelDisconnect.addEventListener('click', () => {
        this.closeModal('modal-disconnect');
      });
    }

    if (confirmDisconnect) {
      confirmDisconnect.addEventListener('click', () => {
        this.handleDisconnectCamera();
      });
    }

    // Close modal when clicking outside
    modalDisconnect.addEventListener('click', (e) => {
      if (e.target === modalDisconnect) {
        this.closeModal('modal-disconnect');
      }
    });
  },

  // Modal operations
  openAddCameraModal() {
    const modal = document.getElementById('modal-kamera');
    // Reset form
    const form = document.getElementById('add-camera-form');
    if (form) form.reset();

    modal.classList.remove('hidden');
  },

  openEditCameraModal(cameraId) {
    const modal = document.getElementById('modal-edit-kamera');
    const camera = this.getCameraById(cameraId);

    if (!camera) return;

    // Pre-fill form dengan data kamera
    const nameInput = document.getElementById('edit-nama-kamera');
    const urlInput = document.getElementById('edit-url-kamera');

    if (nameInput) nameInput.value = camera.name;
    if (urlInput) urlInput.value = camera.url;

    // Set selected camera ID
    this.selectedCameraId = cameraId;
    modal.classList.remove('hidden');
  },

  openDisconnectModal(cameraId) {
    const modal = document.getElementById('modal-disconnect');
    this.selectedCameraId = cameraId;
    modal.classList.remove('hidden');
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      this.selectedCameraId = null;
    }
  },

  // Form handlers
  handleAddCameraSubmit() {
    const nameInput = document.getElementById('nama-kamera');
    const urlInput = document.getElementById('url-kamera');

    const cameraData = {
      name: nameInput?.value?.trim() || '',
      url: urlInput?.value?.trim() || '',
    };

    // Validasi
    if (!cameraData.name) {
      alert('Nama kamera harus diisi!');
      return;
    }

    if (!cameraData.url) {
      alert('URL kamera harus diisi!');
      return;
    }

    // Add camera
    this.addCamera(cameraData);
    this.closeModal('modal-kamera');

    // Show success message
    this.showNotification('Kamera berhasil ditambahkan!', 'success');
  },

  handleEditCameraSubmit() {
    if (!this.selectedCameraId) return;

    const nameInput = document.getElementById('edit-nama-kamera');
    const urlInput = document.getElementById('edit-url-kamera');

    const cameraData = {
      name: nameInput?.value?.trim() || '',
      url: urlInput?.value?.trim() || '',
    };

    // Validasi
    if (!cameraData.name) {
      alert('Nama kamera harus diisi!');
      return;
    }

    if (!cameraData.url) {
      alert('URL kamera harus diisi!');
      return;
    }

    // Update camera
    this.updateCamera(this.selectedCameraId, cameraData);
    this.closeModal('modal-edit-kamera');

    // Show success message
    this.showNotification('Kamera berhasil diupdate!', 'success');
  },

  handleDisconnectCamera() {
    if (!this.selectedCameraId) return;

    // Disconnect camera
    const disconnectedCamera = this.disconnectCamera(this.selectedCameraId);
    this.closeModal('modal-disconnect');

    if (disconnectedCamera) {
      this.showNotification(`${disconnectedCamera.name} berhasil diputuskan!`, 'info');
    }
  },

  // Helper methods
  refreshCameraGrid() {
    // Trigger re-render camera grid
    // Bisa mengirim event atau memanggil method view untuk update
    const event = new CustomEvent('camerasUpdated', {
      detail: { cameras: this.cameras },
    });
    document.dispatchEvent(event);
  },

  showNotification(message, type = 'info') {
    // Simple notification system
    console.log(`[${type.toUpperCase()}] ${message}`);

    // Bisa diganti dengan toast notification yang lebih bagus
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white ${
      type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  },

  // API methods (untuk koneksi ke backend nanti)
  async loadCamerasFromAPI() {
    try {
      // const response = await fetch('/api/cameras');
      // const cameras = await response.json();
      // this.cameras = cameras;
      console.log('Loading cameras from API...');
    } catch (error) {
      console.error('Failed to load cameras:', error);
    }
  },

  async saveCameraToAPI(cameraData) {
    try {
      // const response = await fetch('/api/cameras', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(cameraData)
      // });
      // return await response.json();
      console.log('Saving camera to API:', cameraData);
    } catch (error) {
      console.error('Failed to save camera:', error);
    }
  },
};

export default MonitoringPresenter;
