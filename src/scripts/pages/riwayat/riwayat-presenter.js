//riwayat-presenter.js

export default class RiwayatPresenter {
  constructor(view) {
    this.view = view;
    this.riwayatData = [];
  }

  async init() {
    try {
      await this.loadRiwayatData();
    } catch (error) {
      console.error('Error initializing riwayat presenter:', error);
      this.view.showError('Gagal memuat data riwayat');
    }
  }

  async loadRiwayatData() {
    // Show loading state
    this.view.showLoading();

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data - replace with actual API call
      this.riwayatData = await this.fetchRiwayatFromAPI();

      if (this.riwayatData.length === 0) {
        this.view.showEmpty();
      } else {
        this.view.updateRiwayatTable(this.riwayatData);
      }
    } catch (error) {
      console.error('Error loading riwayat data:', error);
      this.view.showError('Gagal memuat data riwayat. Silakan coba lagi.');
    }
  }

  async fetchRiwayatFromAPI() {
    // Mock API call - replace with actual API endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            tanggal: 'Jumat, 16 Mei 2025',
            waktu: '08:12:49',
            kamera: 'Kamera Dalam Toko',
            aktivitas: 'Pencurian Indomie',
            alarm: 'aktif'
          },
          {
            id: 2,
            tanggal: 'Jumat, 16 Mei 2025',
            waktu: '10:25:33',
            kamera: 'Kamera Belakang',
            aktivitas: 'Aktivitas Mencurigakan',
            alarm: 'aktif'
          },
          {
            id: 3,
            tanggal: 'Kamis, 15 Mei 2025',
            waktu: '15:45:22',
            kamera: 'Kamera Gudang',
            aktivitas: 'Pencurian Barang',
            alarm: 'tidak aktif'
          },
          {
            id: 4,
            tanggal: 'Kamis, 15 Mei 2025',
            waktu: '20:15:10',
            kamera: 'Kamera Utara',
            aktivitas: 'Orang Tidak Dikenal',
            alarm: 'aktif'
          },
          {
            id: 5,
            tanggal: 'Rabu, 14 Mei 2025',
            waktu: '12:30:45',
            kamera: 'Kamera Selatan',
            aktivitas: 'Aktivitas Mencurigakan',
            alarm: 'aktif'
          }
        ]);
      }, 500);
    });
  }

  // Method untuk refresh data
  async refreshData() {
    await this.loadRiwayatData();
  }

  // Method untuk filter data berdasarkan tanggal
  filterByDate(startDate, endDate) {
    const filteredData = this.riwayatData.filter(item => {
      const itemDate = new Date(this.parseIndonesianDate(item.tanggal));
      const start = new Date(startDate);
      const end = new Date(endDate);
      return itemDate >= start && itemDate <= end;
    });

    if (filteredData.length === 0) {
      this.view.showEmpty();
    } else {
      this.view.updateRiwayatTable(filteredData);
    }
  }

  // Method untuk filter data berdasarkan kamera
  filterByCamera(cameraName) {
    if (!cameraName || cameraName === 'semua') {
      this.view.updateRiwayatTable(this.riwayatData);
      return;
    }

    const filteredData = this.riwayatData.filter(item => 
      item.kamera.toLowerCase().includes(cameraName.toLowerCase())
    );

    if (filteredData.length === 0) {
      this.view.showEmpty();
    } else {
      this.view.updateRiwayatTable(filteredData);
    }
  }

  // Method untuk filter data berdasarkan status alarm
  filterByAlarmStatus(status) {
    if (!status || status === 'semua') {
      this.view.updateRiwayatTable(this.riwayatData);
      return;
    }

    const filteredData = this.riwayatData.filter(item => item.alarm === status);

    if (filteredData.length === 0) {
      this.view.showEmpty();
    } else {
      this.view.updateRiwayatTable(filteredData);
    }
  }

  // Method untuk search data
  searchData(query) {
    if (!query.trim()) {
      this.view.updateRiwayatTable(this.riwayatData);
      return;
    }

    const filteredData = this.riwayatData.filter(item => 
      item.aktivitas.toLowerCase().includes(query.toLowerCase()) ||
      item.kamera.toLowerCase().includes(query.toLowerCase()) ||
      item.tanggal.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredData.length === 0) {
      this.view.showEmpty();
    } else {
      this.view.updateRiwayatTable(filteredData);
    }
  }

  // Helper method untuk parsing tanggal Indonesia
  parseIndonesianDate(dateString) {
    const months = {
      'januari': 0, 'februari': 1, 'maret': 2, 'april': 3,
      'mei': 4, 'juni': 5, 'juli': 6, 'agustus': 7,
      'september': 8, 'oktober': 9, 'november': 10, 'desember': 11
    };

    const parts = dateString.toLowerCase().split(' ');
    if (parts.length >= 3) {
      const day = parseInt(parts[1].replace(',', ''));
      const month = months[parts[2]];
      const year = parseInt(parts[3]);
      return new Date(year, month, day);
    }
    return new Date();
  }

  // Method untuk get detail riwayat berdasarkan ID
  getRiwayatDetail(id) {
    return this.riwayatData.find(item => item.id === parseInt(id));
  }

  // Method untuk update status alarm
  async updateAlarmStatus(id, status) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const index = this.riwayatData.findIndex(item => item.id === parseInt(id));
      if (index !== -1) {
        this.riwayatData[index].alarm = status;
        this.view.updateRiwayatTable(this.riwayatData);
        return { success: true, message: 'Status alarm berhasil diupdate' };
      } else {
        throw new Error('Data tidak ditemukan');
      }
    } catch (error) {
      console.error('Error updating alarm status:', error);
      return { success: false, message: 'Gagal mengupdate status alarm' };
    }
  }

  // Method untuk menghapus riwayat
  async deleteRiwayat(id) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const index = this.riwayatData.findIndex(item => item.id === parseInt(id));
      if (index !== -1) {
        this.riwayatData.splice(index, 1);
        
        if (this.riwayatData.length === 0) {
          this.view.showEmpty();
        } else {
          this.view.updateRiwayatTable(this.riwayatData);
        }
        return { success: true, message: 'Riwayat berhasil dihapus' };
      } else {
        throw new Error('Data tidak ditemukan');
      }
    } catch (error) {
      console.error('Error deleting riwayat:', error);
      return { success: false, message: 'Gagal menghapus riwayat' };
    }
  }

  // Method untuk export data
  exportToCSV() {
    if (this.riwayatData.length === 0) {
      return { success: false, message: 'Tidak ada data untuk diekspor' };
    }

    try {
      const headers = ['Tanggal', 'Waktu', 'Kamera', 'Aktivitas', 'Alarm'];
      const csvContent = [
        headers.join(','),
        ...this.riwayatData.map(item => [
          `"${item.tanggal}"`,
          `"${item.waktu}"`,
          `"${item.kamera}"`,
          `"${item.aktivitas}"`,
          `"${item.alarm}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `riwayat_aktivitas_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return { success: true, message: 'Data berhasil diekspor' };
    } catch (error) {
      console.error('Error exporting data:', error);
      return { success: false, message: 'Gagal mengekspor data' };
    }
  }
}