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
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: cam.device_id } },
          });
  
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
        }
      } catch (error) {
        console.error('Gagal menampilkan kamera:', error);
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
  