import { getRiwayatDetail } from '../../data/api.js';

export default class DetailRiwayatPresenter {
  constructor(view) {
    this.view = view;
    this.id = sessionStorage.getItem('selectedActivityId');
    this.activityData = {};
  }

  async loadActivityData() {
    try {
      if (!this.id) throw new Error('ID tidak ditemukan di sessionStorage');

      const response = await getRiwayatDetail(this.id);
      const data = response.history;
      

      const fullDateTime = new Date(`${data.detected_date}T${data.detected_time}+07:00`);
      const tanggalFormatted = fullDateTime.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const waktuFormatted = fullDateTime.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }) + ' WIB';

      this.activityData = {
        detected_date: tanggalFormatted,
        detected_time: waktuFormatted,
        camera_name: data.camera_name,
        label: data.label,
        photo: data.photo || '/images/no-image.jpg',
        video_path: data.video_path,
      };

      this.view.updateActivityData(this.activityData);
    } catch (error) {
      console.error('Error loading activity data:', error);
      this.view.showError('Gagal memuat data aktivitas');
    }
  }
}
