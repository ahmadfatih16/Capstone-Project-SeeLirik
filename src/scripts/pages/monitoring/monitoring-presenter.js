import {
  getAllCameras,
  addCamera,
  updateCameraName,
  removeCamera,
} from '../../models/camera-model.js';

let view = null;

const presenter = {
  setView(v) {
    view = v;
  },

  async renderAllCameras() {
    if (!view) return;
    try {
      const response = await getAllCameras();
      const cameras = response.cameras;
      view.clearCameraGrid?.();

      for (const cam of cameras) {
        try {
          const constraints = { video: { deviceId: { exact: cam.device_id } } };
          const stream = await navigator.mediaDevices.getUserMedia(constraints);

          const element = view.createCameraCard({
            id: cam.id,
            name: cam.name,
            stream,
            onEdit: async (newName) => {
              await updateCameraName(cam.id, newName);
              this.renderAllCameras();
            },
            onDelete: async () => {
              await removeCamera(cam.id);
              this.renderAllCameras();
            },
            compressQuality: 0.5 // tambahkan opsi ini jika view.createCameraCard menerimanya
          });

          view.showCameraCard(element);
        } catch (err) {
          console.error(`🚫 Tidak bisa buka kamera "${cam.name}" (${cam.device_id}):`, err.message);
        }
      }
    } catch (error) {
      console.error('Gagal mengambil daftar kamera:', error);
    }
  },

  async handleAddCamera(nama, deviceId) {
    if (!view) return;
    try {
      await addCamera({ name: nama, device_id: deviceId });
      this.renderAllCameras();
    } catch (error) {
      console.error('Gagal menambahkan kamera:', error);
    }
  },
};

export default presenter;
