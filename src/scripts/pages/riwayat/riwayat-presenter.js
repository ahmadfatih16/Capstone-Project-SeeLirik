export default class RiwayatPresenter {
  constructor(view) {
    this.view = view;
    this.riwayatData = [];
  }

  async init() {
    this.view.showLoading();
    
    try {
      await this.loadRiwayatData();
      
      if (this.riwayatData.length === 0) {
        this.view.showEmpty();
      } else {
        this.view.updateRiwayatTable(this.riwayatData);
      }
    } catch (error) {
      console.error('Error loading riwayat data:', error);
      this.view.showError('Gagal memuat data riwayat');
    }
  }

  async loadRiwayatData() {
    // Simulate API call delay
    await this.delay(800);
    
    // Sample data - in real app this would come from API
    this.riwayatData = [
      {
        id: 1,
        tanggal: 'Jumat, 16 Mei 2025',
        waktu: '08:12:49',
        kamera: 'Kamera Dalam Toko',
        lokasiKamera: 'Rak Indomie',
        aktivitas: 'Pencurian produk Indomie sebanyak 3 bungkus',
        alarm: 'aktif',
        fotoEvidence: '../../../public/images/pencurian.jpeg',
        videoEvidence: '../../../public/video/bukti.mp4',
        confidence: 0.95,
        severity: 'high'
      },
      {
        id: 2,
        tanggal: 'Kamis, 15 Mei 2025',
        waktu: '14:23:12',
        kamera: 'Kamera Belakang',
        lokasiKamera: 'Pintu Belakang',
        aktivitas: 'Aktivitas mencurigakan di area belakang toko',
        alarm: 'aktif',
        fotoEvidence: '../../../public/images/suspicious-activity.jpeg',
        videoEvidence: '../../../public/video/suspicious.mp4',
        confidence: 0.87,
        severity: 'medium'
      },
      {
        id: 3,
        tanggal: 'Rabu, 14 Mei 2025',
        waktu: '19:45:33',
        kamera: 'Kamera Gudang',
        lokasiKamera: 'Gudang Utama',
        aktivitas: 'Pergerakan tidak dikenal di gudang',
        alarm: 'nonaktif',
        fotoEvidence: '../../../public/images/warehouse-activity.jpeg',
        videoEvidence: '../../../public/video/warehouse.mp4',
        confidence: 0.78,
        severity: 'low'
      },
      {
        id: 4,
        tanggal: 'Selasa, 13 Mei 2025',
        waktu: '11:30:05',
        kamera: 'Kamera Utara',
        lokasiKamera: 'Area Kasir',
        aktivitas: 'Upaya pembayaran dengan uang palsu',
        alarm: 'aktif',
        fotoEvidence: '../../../public/images/fake-money.jpeg',
        videoEvidence: '../../../public/video/fake-money.mp4',
        confidence: 0.92,
        severity: 'high'
      },
      {
        id: 5,
        tanggal: 'Senin, 12 Mei 2025',
        waktu: '16:18:27',
        kamera: 'Kamera Barat',
        lokasiKamera: 'Rak Minuman',
        aktivitas: 'Pengambilan produk tanpa pembayaran',
        alarm: 'aktif',
        fotoEvidence: '../../../public/images/shoplifting.jpeg',
        videoEvidence: '../../../public/video/shoplifting.mp4',
        confidence: 0.89,
        severity: 'high'
      }
    ];

    console.log('Riwayat data loaded:', this.riwayatData);
  }

  // Get all riwayat data
  getRiwayatData() {
    return this.riwayatData;
  }

  // Get riwayat data by ID
  getRiwayatById(id) {
    return this.riwayatData.find(item => item.id === parseInt(id));
  }

  // Filter riwayat by date range
  filterByDateRange(startDate, endDate) {
    // This would filter the data based on date range
    // For now, return all data
    return this.riwayatData;
  }

  // Filter riwayat by camera
  filterByCamera(cameraName) {
    return this.riwayatData.filter(item => 
      item.kamera.toLowerCase().includes(cameraName.toLowerCase())
    );
  }

  // Filter riwayat by alarm status
  filterByAlarmStatus(status) {
    return this.riwayatData.filter(item => item.alarm === status);
  }

  // Search riwayat by activity description
  searchByActivity(searchTerm) {
    return this.riwayatData.filter(item =>
      item.aktivitas.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Refresh riwayat data
  async refreshData() {
    this.view.showLoading();
    
    try {
      await this.loadRiwayatData();
      this.view.updateRiwayatTable(this.riwayatData);
    } catch (error) {
      console.error('Error refreshing riwayat data:', error);
      this.view.showError('Gagal memuat ulang data riwayat');
    }
  }

  // Utility delay function
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Simulate API call to get riwayat data
  async fetchRiwayatFromAPI() {
    try {
      // This would be replaced with actual API call
      // const response = await fetch('/api/riwayat');
      // const data = await response.json();
      // return data;
      
      await this.delay(1000);
      return this.riwayatData;
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  // Export riwayat data
  exportRiwayatData(format = 'json') {
    const dataToExport = {
      exportedAt: new Date().toISOString(),
      totalRecords: this.riwayatData.length,
      data: this.riwayatData
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `riwayat-aktivitas-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }

    return dataToExport;
  }

  // Clean up resources
  destroy() {
    this.riwayatData = [];
    console.log('RiwayatPresenter destroyed');
  }
}