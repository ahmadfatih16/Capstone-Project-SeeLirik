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

      // Ambil daftar perangkat kamera yang tersedia di perangkat saat ini
      const availableDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = availableDevices.filter((d) => d.kind === 'videoinput');
      const availableDeviceIds = videoDevices.map((d) => d.deviceId);

      for (const cam of cameras) {
        try {
          let constraints;

          if (availableDeviceIds.includes(cam.device_id)) {
            // Jika deviceId valid, gunakan
            constraints = { video: { deviceId: { exact: cam.device_id } } };
          } else {
            console.warn(
              `🔁 Kamera "${cam.name}" dengan deviceId "${cam.device_id}" tidak ditemukan. Gunakan kamera default.`
            );
            constraints = { video: true };
          }

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
          });

          view.showCameraCard(element);
        } catch (err) {
          console.error(`🚫 Tidak bisa membuka kamera "${cam.name}":`, err.message);
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
