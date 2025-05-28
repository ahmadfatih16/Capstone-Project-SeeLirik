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
    this.elements.adminField = document.getElementById('admin-field');
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

      // Auto-isi form dari data akun yang sudah di-fetch
      document.getElementById('edit-store-name').value = this.akunData?.storeName || '';
      document.getElementById('edit-store-location').value = this.akunData?.storeLocation || '';
      document.getElementById('edit-store-description').value =
        this.akunData?.storeDescription || '';
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
      const response = await fetch('https://backend-seelirik-production.up.railway.app/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Login gagal');

      const user = result.data;
      this.akunData = user; // simpan untuk auto-isi modal

      this.elements.namaTokoDisplay.innerText = user.storeName;
      this.elements.deskripsiTokoDisplay.innerText = user.storeDescription;
      this.elements.namaTokoField.innerText = user.storeName;
      this.elements.adminField.innerText = user.username;
      this.elements.alamatField.innerText = user.storeLocation;
      this.elements.emailField.innerText = user.email;
      this.elements.passwordField.innerText = '********************';

      this.elements.loadingText.classList.add('hidden');
      this.elements.detailContainer.classList.remove('hidden');
    } catch (error) {
      alert(`Error: ${error.message}`);
      localStorage.removeItem('token');
      window.location.hash = '#/login';
    }
  }

  async updateAkunData() {
    const token = localStorage.getItem('token');
    const body = {
      storeName: document.getElementById('edit-store-name').value,
      storeLocation: document.getElementById('edit-store-location').value,
      storeDescription: document.getElementById('edit-store-description').value,
      username: document.getElementById('edit-username').value,
    };

    try {
      const response = await fetch('https://backend-seelirik-production.up.railway.app/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Gagal update');

      // alert('Akun berhasil diperbarui!');
      document.getElementById('modal-edit-akun').classList.add('hidden');
      await this.fetchAkunData();

      // ✅ Update isi sidebar secara langsung
      const sidebarUsername = document.getElementById('sidebar-username');
      if (sidebarUsername) {
        sidebarUsername.innerText = body.username;
      }
    } catch (error) {
      alert(`Gagal update: ${error.message}`);
    }
  }
}
