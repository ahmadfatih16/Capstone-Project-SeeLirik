import { BASE_URL_BACKEND } from '../../data/api.js';

export default class AkunPresenter {
  constructor() {
    this.elements = {};
    this.akunData = null;
  }

  async init() {
    this.bindElements();
    this.bindEvents();
    await this.fetchAkunData();
  }

  bindElements() {
    this.elements.namaTokoDisplay = document.getElementById('nama-toko-display');
    this.elements.deskripsiTokoDisplay = document.getElementById('deskripsi-toko-display');
    this.elements.namaTokoField = document.getElementById('nama-toko-field');
    this.elements.userField = document.getElementById('user-field');
    this.elements.alamatField = document.getElementById('alamat-field');
    this.elements.emailField = document.getElementById('email-field');
    this.elements.passwordField = document.getElementById('password-field');
    this.elements.editButton = document.getElementById('edit-akun');
    this.elements.loadingText = document.getElementById('akun-loading');
    this.elements.detailContainer = document.getElementById('akun-detail-container');
  }

  bindEvents() {
    this.elements.editButton?.addEventListener('click', () => {
      const modal = document.getElementById('modal-edit-akun');
      modal?.classList.remove('hidden');

      document.getElementById('edit-store-name').value = this.akunData?.store_name || '';
      document.getElementById('edit-store-location').value = this.akunData?.address || '';
      document.getElementById('edit-store-description').value =
        this.akunData?.store_description || '';
      document.getElementById('edit-username').value = this.akunData?.username || '';
    });

    document.getElementById('cancel-edit-akun')?.addEventListener('click', () => {
      document.getElementById('modal-edit-akun').classList.add('hidden');
    });

    document.getElementById('form-edit-akun')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.updateAkunData();
    });
  }

  async fetchAkunData() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Harap login terlebih dahulu!');
      window.location.hash = '#/login';
      return;
    }

    try {
      const response = await fetch(`${BASE_URL_BACKEND}/account`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Gagal mengambil akun');

      const user = result.user;
      this.akunData = user;

      this.elements.namaTokoDisplay.innerText = user.store_name || '-';
      this.elements.deskripsiTokoDisplay.innerText = user.store_description || '-';
      this.elements.namaTokoField.innerText = user.store_name || '-';
      this.elements.userField.innerText = user.username || '-';
      this.elements.alamatField.innerText = user.address || '-';
      this.elements.emailField.innerText = user.email || '-';

      this.elements.loadingText.classList.add('hidden');
      this.elements.detailContainer.classList.remove('hidden');
    } catch (error) {
      alert(`Gagal memuat data akun: ${error.message}`);
    }
  }

  async updateAkunData() {
    const token = localStorage.getItem('token');
    const body = {
      store_name: document.getElementById('edit-store-name').value,
      address: document.getElementById('edit-store-location').value,
      store_description: document.getElementById('edit-store-description').value,
      username: document.getElementById('edit-username').value,
    };

    try {
      const response = await fetch(`${BASE_URL_BACKEND}/account`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Gagal update akun');

      document.getElementById('modal-edit-akun').classList.add('hidden');
      await this.fetchAkunData();

      const sidebarUsername = document.getElementById('sidebar-username');
      if (sidebarUsername) {
        sidebarUsername.innerText = body.username;
      }
    } catch (error) {
      alert(`Gagal update akun: ${error.message}`);
    }
  }
}
