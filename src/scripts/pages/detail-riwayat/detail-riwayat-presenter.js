export default class DetailRiwayatPresenter {
  constructor(view) {
    this.view = view;
    this.id = sessionStorage.getItem('selectedActivityId'); // Ambil dari session
    this.activityData = {};
  }

  async loadActivityData() {
    try {
      const savedData = sessionStorage.getItem('selectedActivityData');
      if (!savedData) {
        throw new Error('Data tidak ditemukan di sessionStorage');
      }

      const data = JSON.parse(savedData);

      // Gabungkan tanggal dan waktu ke dalam objek Date
      const fullDateTime = new Date(`${data.detected_date}T${data.detected_time}+07:00`);

      const tanggalFormatted = fullDateTime.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const waktuFormatted =
        fullDateTime.toLocaleTimeString('id-ID', {
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

  getActivityData() {
    return this.activityData;
  }
}
