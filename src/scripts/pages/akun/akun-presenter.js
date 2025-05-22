export default class AkunPresenter {
  constructor() {
    this.akunData = {
      namaToko: 'Toko Kemakmuran Bersama',
      admin: 'Ahmad Fatih Hibatillah',
      alamat: 'Krapyak, Dongkelan, Yogyakarta',
      email: 'kemakmuran@gmail.com',
      password: ''
    };
    
    // DOM elements
    this.elements = {};
  }

  async init() {
    this.bindElements();
    this.bindEvents();
    this.loadAkunData();
  }

  bindElements() {
    // Display elements
    this.elements.namaTokoDisplay = document.getElementById('nama-toko-display');
    this.elements.alamatTokoDisplay = document.getElementById('alamat-toko-display');
    this.elements.namaTokoField = document.getElementById('nama-toko-field');
    this.elements.adminField = document.getElementById('admin-field');
    this.elements.alamatField = document.getElementById('alamat-field');
    this.elements.emailField = document.getElementById('email-field');
    this.elements.passwordField = document.getElementById('password-field');

    // Modal elements
    this.elements.modal = document.getElementById('modal-akun');
    this.elements.editButton = document.getElementById('edit-akun');
    this.elements.closeButton = document.getElementById('close-akun');
    this.elements.cancelButton = document.getElementById('batal-akun');
    this.elements.form = document.getElementById('form-edit-akun');

    // Input elements
    this.elements.inputNamaToko = document.getElementById('input-nama-toko');
    this.elements.inputAdmin = document.getElementById('input-admin');
    this.elements.inputAlamat = document.getElementById('input-alamat');
    this.elements.inputEmail = document.getElementById('input-email');
    this.elements.inputPassword = document.getElementById('input-password');
  }

  bindEvents() {
    // Modal events
    this.elements.editButton.addEventListener('click', () => this.openEditModal());
    this.elements.closeButton.addEventListener('click', () => this.closeEditModal());
    this.elements.cancelButton.addEventListener('click', () => this.closeEditModal());
    
    // Form submit event
    this.elements.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    
    // Click outside modal to close
    this.elements.modal.addEventListener('click', (e) => {
      if (e.target === this.elements.modal) {
        this.closeEditModal();
      }
    });
  }

  loadAkunData() {
    // Load data from localStorage or API
    const savedData = this.getAkunDataFromStorage();
    if (savedData) {
      this.akunData = { ...this.akunData, ...savedData };
    }
    
    this.updateDisplayElements();
  }

  updateDisplayElements() {
    // Update display elements with current data
    this.elements.namaTokoDisplay.textContent = this.akunData.namaToko;
    this.elements.alamatTokoDisplay.textContent = this.akunData.alamat;
    this.elements.namaTokoField.textContent = this.akunData.namaToko;
    this.elements.adminField.textContent = this.akunData.admin;
    this.elements.alamatField.textContent = this.akunData.alamat;
    this.elements.emailField.textContent = this.akunData.email;
    this.elements.passwordField.textContent = this.akunData.password ? '********************' : '********************';
  }

  openEditModal() {
    // Populate form with current data
    this.elements.inputNamaToko.value = this.akunData.namaToko;
    this.elements.inputAdmin.value = this.akunData.admin;
    this.elements.inputAlamat.value = this.akunData.alamat;
    this.elements.inputEmail.value = this.akunData.email;
    this.elements.inputPassword.value = '';
    
    // Show modal
    this.elements.modal.classList.remove('hidden');
  }

  closeEditModal() {
    this.elements.modal.classList.add('hidden');
    this.resetForm();
  }

  resetForm() {
    this.elements.form.reset();
    this.elements.inputPassword.value = '';
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    
    try {
      // Get form data
      const formData = {
        namaToko: this.elements.inputNamaToko.value.trim(),
        admin: this.elements.inputAdmin.value.trim(),
        alamat: this.elements.inputAlamat.value.trim(),
        email: this.elements.inputEmail.value.trim(),
        password: this.elements.inputPassword.value
      };

      // Validate form data
      if (!this.validateFormData(formData)) {
        return;
      }

      // Show loading state
      this.setLoadingState(true);

      // Update akun data
      await this.updateAkunData(formData);
      
      // Update display
      this.updateDisplayElements();
      
      // Close modal
      this.closeEditModal();
      
      // Show success message
      this.showSuccessMessage('Data akun berhasil diperbarui!');
      
    } catch (error) {
      console.error('Error updating akun:', error);
      this.showErrorMessage('Gagal memperbarui data akun. Silakan coba lagi.');
    } finally {
      this.setLoadingState(false);
    }
  }

  validateFormData(data) {
    // Basic validation
    if (!data.namaToko) {
      this.showErrorMessage('Nama toko harus diisi');
      return false;
    }
    
    if (!data.admin) {
      this.showErrorMessage('Nama admin harus diisi');
      return false;
    }
    
    if (!data.alamat) {
      this.showErrorMessage('Alamat harus diisi');
      return false;
    }
    
    if (!data.email) {
      this.showErrorMessage('Email harus diisi');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      this.showErrorMessage('Format email tidak valid');
      return false;
    }
    
    return true;
  }

  async updateAkunData(newData) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Update local data
        this.akunData = {
          ...this.akunData,
          ...newData,
          // Don't store password in plain text
          password: newData.password ? '********************' : this.akunData.password
        };
        
        // Save to localStorage
        this.saveAkunDataToStorage(this.akunData);
        
        resolve();
      }, 1000);
    });
  }

  setLoadingState(isLoading) {
    const submitButton = this.elements.form.querySelector('button[type="submit"]');
    const inputs = this.elements.form.querySelectorAll('input');
    
    if (isLoading) {
      submitButton.disabled = true;
      submitButton.textContent = 'Menyimpan...';
      inputs.forEach(input => input.disabled = true);
    } else {
      submitButton.disabled = false;
      submitButton.textContent = 'Simpan';
      inputs.forEach(input => input.disabled = false);
    }
  }

  showSuccessMessage(message) {
    // Create and show success notification
    this.showNotification(message, 'success');
  }

  showErrorMessage(message) {
    // Create and show error notification
    this.showNotification(message, 'error');
  }

  showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-md text-white z-50 ${
      type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
    }`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  getAkunDataFromStorage() {
    try {
      const data = localStorage.getItem('akunData');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading akun data from storage:', error);
      return null;
    }
  }

  saveAkunDataToStorage(data) {
    try {
      localStorage.setItem('akunData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving akun data to storage:', error);
    }
  }

  // Public methods for external access
  getAkunData() {
    return { ...this.akunData };
  }

  async refreshAkunData() {
    // Simulate fetching fresh data from API
    return new Promise((resolve) => {
      setTimeout(() => {
        this.loadAkunData();
        resolve(this.akunData);
      }, 500);
    });
  }
}