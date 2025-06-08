const ModalTambahKamera = {
  async init({ onKameraAdded }) {
    this.onKameraAdded = onKameraAdded;
    this.modal = document.querySelector('#modalTambahKamera');
    this.form = this.modal.querySelector('form');
    this.namaInput = this.form.querySelector('#namaKamera');
    this.selectDevice = this.form.querySelector('#deviceId');

    await this._populateDevices();

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this._submitForm();
    });
  },

  async _populateDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');

      this.selectDevice.innerHTML = '';
      videoDevices.forEach((device) => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.textContent = device.label || `Kamera ${this.selectDevice.length + 1}`;
        this.selectDevice.appendChild(option);
      });
    } catch (err) {
      console.error('Gagal mendapatkan perangkat kamera:', err);
    }
  },

  async _submitForm() {
    const name = this.namaInput.value.trim();
    const path = this.selectDevice.value;

    if (!name || !path) {
      alert('Nama dan perangkat harus dipilih');
      return;
    }

    const token = localStorage.getItem('token');
    const response = await fetch('https://backend-seelirik-production.up.railway.app/kamera', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, path }),
    });

    const result = await response.json();

    if (result.status === 'success') {
      alert('Kamera berhasil ditambahkan');
      this.modal.close();
      if (this.onKameraAdded) this.onKameraAdded();
    } else {
      alert('Gagal menambahkan kamera');
    }
  },
};

export default ModalTambahKamera;
