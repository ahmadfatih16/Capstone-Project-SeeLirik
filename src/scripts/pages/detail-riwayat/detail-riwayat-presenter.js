export default class DetailRiwayatPresenter {
  constructor(view) {
    this.view = view;
    this.activityData = this.initializeActivityData();
  }

  // Initialize activity data from sessionStorage or default
  initializeActivityData() {
    const savedActivityData = sessionStorage.getItem('selectedActivityData');
  
    if (savedActivityData) {
      try {
        const parsedData = JSON.parse(savedActivityData);
  
        return {
          date: parsedData.tanggal || 'Tidak tersedia',
          time: parsedData.waktu || 'Tidak tersedia',
          camera: parsedData.kamera || 'Tidak tersedia',
          activity: parsedData.aktivitas || 'Tidak ada deskripsi aktivitas',
          photoEvidence: parsedData.image || null,
          videoEvidence: parsedData.video || null,
          id: parsedData.id,
        };
      } catch (error) {
        console.error('Error parsing saved activity data:', error);
      }
    }
  
    return this.getDefaultActivityData();
  }
  

  getDefaultActivityData() {
    return {
      date: 'Tidak tersedia',
      time: 'Tidak tersedia',
      camera: 'Tidak tersedia',
      activity: 'Tidak tersedia',
      photoEvidence: '/api/placeholder/400/300',
      videoEvidence: null,
    };
  }

  init() {
    this.loadActivityData();
  }

  async loadActivityData() {
    try {
      await this.delay(100);
      console.log('Activity data loaded:', this.activityData);
    } catch (error) {
      console.error('Error loading activity data:', error);
      this.view.showError('Gagal memuat data aktivitas');
    }
  }

  getActivityData() {
    return this.activityData;
  }

  updateActivityData(newData) {
    this.activityData = { ...this.activityData, ...newData };
    this.view.updateActivityData(this.activityData);
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
