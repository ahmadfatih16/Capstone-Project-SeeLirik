// A simple "Model" or data source simulation for cameras.
// In a real application, this would be a separate service
// that interacts with an API or more persistent storage.
const CameraService = {
  _cameras: [
    { id: 1, name: 'Kamera Depan', url: '../../../public/video/contoh.mp4' },
    { id: 2, name: 'Kamera Belakang', url: '../../../public/video/contoh.mp4' },
    { id: 3, name: 'Kamera Samping', url: '../../../public/video/contoh.mp4' },
    { id: 4, name: 'Kamera Garasi', url: '../../../public/video/contoh.mp4' },
    { id: 5, name: 'Kamera Taman', url: '../../../public/video/contoh.mp4' },
    { id: 6, name: 'Kamera Ruang Tamu', url: '../../../public/video/contoh.mp4' },
    { id: 7, name: 'Kamera Dalam', url: '../../../public/video/contoh.mp4' },
  ],

  getAllCameras() {
    return Promise.resolve([...this._cameras]); // Return a copy
  },

  getCameraById(id) {
    return Promise.resolve(this._cameras.find(cam => cam.id === id));
  },

  updateCamera(updatedCamera) {
    return new Promise((resolve) => {
      setTimeout(() => { // Simulate API call delay
        const index = this._cameras.findIndex(cam => cam.id === updatedCamera.id);
        if (index !== -1) {
          this._cameras[index] = { ...this._cameras[index], ...updatedCamera };
          console.log('Camera updated in service:', this._cameras[index]);
          resolve(this._cameras[index]);
        } else {
          resolve(null); // Or reject an error
        }
      }, 500);
    });
  },

  deleteCamera(id) {
    return new Promise((resolve) => {
      setTimeout(() => { // Simulate API call delay
        const initialLength = this._cameras.length;
        this._cameras = this._cameras.filter(cam => cam.id !== id);
        console.log('Camera deleted in service:', id);
        resolve(this._cameras.length < initialLength); // True if deleted
      }, 500);
    });
  }
};


export default class PreviewPresenter {
  constructor(view) {
    this.view = view;
    this.cameras = []; // All cameras available
    this.currentCameraIndex = 0; // Index of the currently displayed camera
    this.selectedCameraId = null; // Used for modal operations (edit/disconnect)
  }

  async init() {
    // 1. Load all cameras from the service (Model)
    this.cameras = await CameraService.getAllCameras();
    this.view.updateDateTimeDisplay(); // Initial date/time display

    // 2. Determine the initial camera to display from the URL hash
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.split('?')[1]);
    const initialCameraId = parseInt(params.get('id'));

    let initialCamera = null;
    if (initialCameraId) {
      initialCamera = this.cameras.find(cam => cam.id === initialCameraId);
      this.currentCameraIndex = this.cameras.findIndex(cam => cam.id === initialCameraId);
    }

    // Fallback if ID is not found or not provided, default to the first camera
    if (!initialCamera && this.cameras.length > 0) {
      initialCamera = this.cameras[0];
      this.currentCameraIndex = 0;
    } else if (!initialCamera && this.cameras.length === 0) {
      // Handle case where no cameras are available at all
      this.view.setCurrentCameraDisplay({ name: 'Tidak Ada Kamera Tersedia', url: '' });
      return;
    }

    // 3. Update the view with the initial camera
    if (initialCamera) {
      this.view.setCurrentCameraDisplay(initialCamera);
    }
  }

  /**
   * Handles navigating to the previous camera in the list.
   */
  handlePrevCamera() {
    if (this.cameras.length === 0) return;
    this.currentCameraIndex = (this.currentCameraIndex > 0) ? this.currentCameraIndex - 1 : this.cameras.length - 1;
    this.view.setCurrentCameraDisplay(this.cameras[this.currentCameraIndex]);
  }

  /**
   * Handles navigating to the next camera in the list.
   */
  handleNextCamera() {
    if (this.cameras.length === 0) return;
    this.currentCameraIndex = (this.currentCameraIndex < this.cameras.length - 1) ? this.currentCameraIndex + 1 : 0;
    this.view.setCurrentCameraDisplay(this.cameras[this.currentCameraIndex]);
  }

  /**
   * Handles the click event for the 'Edit' button.
   * Shows the edit modal with the current camera's data.
   */
  handleEditCameraClick() {
    if (this.cameras.length === 0) {
      alert('Tidak ada kamera untuk diedit.');
      return;
    }
    const currentCamera = this.cameras[this.currentCameraIndex];
    this.selectedCameraId = currentCamera.id;
    this.view.showEditModal(currentCamera.name, currentCamera.url);
  }

  /**
   * Handles the form submission for editing a camera.
   * @param {string} newName - The new name for the camera.
   * @param {string} newUrl - The new URL for the camera.
   */
  async handleSaveEdit(newName, newUrl) {
    if (this.selectedCameraId === null) return; // Should not happen if modal opened correctly

    const updatedCamera = {
      id: this.selectedCameraId,
      name: newName,
      url: newUrl
    };

    // Simulate API call to update the camera
    const result = await CameraService.updateCamera(updatedCamera);

    if (result) {
      // Update the local cameras array
      const index = this.cameras.findIndex(cam => cam.id === result.id);
      if (index !== -1) {
        this.cameras[index] = result;
      }
      // If the edited camera is currently displayed, update the view immediately
      if (this.cameras[this.currentCameraIndex] && this.cameras[this.currentCameraIndex].id === this.selectedCameraId) {
        this.view.setCurrentCameraDisplay(result);
      }
      alert('Kamera berhasil diperbarui!');
    } else {
      alert('Gagal memperbarui kamera.');
    }
    this.view.hideEditModal();
    this.selectedCameraId = null; // Clear selected ID
  }

  /**
   * Handles canceling the edit operation.
   */
  handleCancelEdit() {
    this.view.hideEditModal();
    this.selectedCameraId = null;
  }

  /**
   * Handles the click event for the 'Disconnect' button.
   * Shows the disconnect confirmation modal.
   */
  handleDisconnectCameraClick() {
    if (this.cameras.length === 0) {
      alert('Tidak ada kamera untuk diputuskan.');
      return;
    }
    const currentCamera = this.cameras[this.currentCameraIndex];
    this.selectedCameraId = currentCamera.id;
    this.view.showDisconnectModal();
  }

  /**
   * Handles confirming the disconnection of a camera.
   */
  async handleConfirmDisconnect() {
    if (this.selectedCameraId === null) return; // Should not happen

    // Simulate API call to delete the camera
    const success = await CameraService.deleteCamera(this.selectedCameraId);

    if (success) {
      // Update the local cameras array by filtering out the disconnected camera
      this.cameras = this.cameras.filter(cam => cam.id !== this.selectedCameraId);

      // Adjust currentCameraIndex if the removed camera was the last one
      if (this.currentCameraIndex >= this.cameras.length && this.cameras.length > 0) {
        this.currentCameraIndex = this.cameras.length - 1;
      } else if (this.cameras.length === 0) {
        this.currentCameraIndex = 0; // No cameras left
      }

      // Update the view to reflect the change
      if (this.cameras.length > 0) {
        this.view.setCurrentCameraDisplay(this.cameras[this.currentCameraIndex]);
      } else {
        this.view.setCurrentCameraDisplay({ name: 'Tidak Ada Kamera Tersedia', url: '' });
      }
      alert(`Kamera telah diputuskan koneksinya.`);
    } else {
      alert('Gagal memutuskan koneksi kamera.');
    }
    this.view.hideDisconnectModal();
    this.selectedCameraId = null;
  }

  /**
   * Handles canceling the disconnect operation.
   */
  handleCancelDisconnect() {
    this.view.hideDisconnectModal();
    this.selectedCameraId = null;
  }
}