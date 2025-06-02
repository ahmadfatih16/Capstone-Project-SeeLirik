import {getRiwayat} from '../../data/api.js';

export default class RiwayatPresenter {
  constructor(view) {
    this.view = view;
  }

  async init() {
    this.view.showLoading();
    await this.getRiwayat();
  }
  
  async getRiwayat() {
    try {
      const response = await getRiwayat();
      const data = response.histories;
      
      console.log('Hasil dari backend:', data);

  
      if (!data || data.length === 0) {
        this.view.showEmpty();
        return;
      }
      
      this.view.showRiwayat(data);
      
  
      this.view.showRiwayat(data);
    } catch (err) {
      console.error('Gagal mendapatkan riwayat:', err);
      this.view.showError('Gagal memuat riwayat.');
    }
  }
  
  


}
