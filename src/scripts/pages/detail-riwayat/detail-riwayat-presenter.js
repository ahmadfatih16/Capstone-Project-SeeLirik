export default class DetailRiwayatPresenter {
  constructor(view) {
    this.view = view;
    this.activityData = this.initializeActivityData();
  }

  // Initialize activity data from sessionStorage or default
  initializeActivityData() {
    // Try to get data from sessionStorage first
    const savedActivityData = sessionStorage.getItem('selectedActivityData');

    if (savedActivityData) {
      try {
        const parsedData = JSON.parse(savedActivityData);
        // Map the data structure from riwayat to detail format
        return {
          date: parsedData.tanggal || 'Jumat, 16 Mei 2025',
          time: parsedData.waktu || '08:12:49',
          camera: parsedData.kamera || 'Kamera Dalam Toko',
          cameraLocation: parsedData.lokasiKamera || 'Rak Produk',
          activity: parsedData.aktivitas || 'Aktivitas terdeteksi pada area monitoring.',
          alarmStatus: parsedData.alarm || 'aktif',
          // Perbaikan path - gunakan file yang ada di direktori
          photoEvidence: parsedData.fotoEvidence || './public/images/pencurian.jpeg',
          videoEvidence: parsedData.videoEvidence || './public/video/contoh.mp4',
          id: parsedData.id,
          confidence: parsedData.confidence || 0.95,
          severity: parsedData.severity || 'high',
        };
      } catch (error) {
        console.error('Error parsing saved activity data:', error);
      }
    }

    // Return default data with correct paths
    return this.getDefaultActivityData();
  }

  // Default activity data with correct file paths
  getDefaultActivityData() {
    return {
      date: 'Jumat, 16 Mei 2025',
      time: '08:12:49',
      camera: 'Kamera Dalam Toko',
      cameraLocation: 'Area Monitoring',
      activity: 'Aktivitas terdeteksi pada area monitoring CCTV.',
      alarmStatus: 'aktif',
      // Gunakan file yang benar-benar ada
      photoEvidence: this.getAvailableImage(),
      videoEvidence: this.getAvailableVideo(),
    };
  }

  // Get available image from your directory
  getAvailableImage() {
    // Daftar gambar yang tersedia berdasarkan direktori Anda
    const availableImages = [
      './public/images/pencurian.jpeg', // Jika file ini ada
      './public/images/detection.png',
      './public/images/overview.png',
      './public/images/ilustrasi-cctv.png',
      '/api/placeholder/400/300', // Fallback placeholder
    ];

    // Return first available image, atau bisa di-customize sesuai kebutuhan
    return availableImages[0];
  }

  // Get available video from your directory
  getAvailableVideo() {
    // Gunakan video yang ada di direktori
    const availableVideos = [
      './public/video/contoh.mp4', // Video yang ada di direktori Anda
      null, // No video fallback
    ];

    return availableVideos[0];
  }

  // Initialize presenter after view is rendered
  init() {
    this.setupEventListeners();
    this.loadActivityData();
    this.checkMediaAvailability();

    // Clear sessionStorage after loading data to prevent stale data
    setTimeout(() => {
      sessionStorage.removeItem('selectedActivityData');
      sessionStorage.removeItem('selectedActivityId');
    }, 1000);
  }

  // Check if media files are available
  async checkMediaAvailability() {
    // Check photo availability
    if (
      this.activityData.photoEvidence &&
      !this.activityData.photoEvidence.includes('placeholder')
    ) {
      this.checkImageExists(this.activityData.photoEvidence).then((exists) => {
        if (!exists) {
          console.warn('Photo not found, using placeholder');
          this.activityData.photoEvidence = '/api/placeholder/400/300';
          this.updatePhotoInView();
        }
      });
    }

    // Check video availability
    if (this.activityData.videoEvidence) {
      this.checkVideoExists(this.activityData.videoEvidence).then((exists) => {
        if (!exists) {
          console.warn('Video not found');
          this.handleVideoError();
        }
      });
    }
  }

  // Check if image exists
  checkImageExists(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  // Check if video exists
  checkVideoExists(url) {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.onloadedmetadata = () => resolve(true);
      video.onerror = () => resolve(false);
      video.src = url;
    });
  }

  // Update photo in view
  updatePhotoInView() {
    const photoElement = document.querySelector('img[alt="Bukti Foto"]');
    if (photoElement) {
      photoElement.src = this.activityData.photoEvidence;
    }
  }

  // Setup event listeners for user interactions
  setupEventListeners() {
    // Add event listeners for any interactive elements
    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.addEventListener('loadstart', () => {
        console.log('Video loading started');
      });

      videoElement.addEventListener('canplay', () => {
        console.log('Video can play');
      });

      videoElement.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
        this.handleVideoError();
      });
    }

    const photoElement = document.querySelector('img[alt="Bukti Foto"]');
    if (photoElement) {
      photoElement.addEventListener('load', () => {
        console.log('Photo loaded successfully');
      });

      photoElement.addEventListener('error', () => {
        console.error('Photo loading error');
        this.handlePhotoError();
      });

      photoElement.addEventListener('click', () => {
        this.handlePhotoClick();
      });
    }
  }

  // Load activity data (could be from API in the future)
  async loadActivityData() {
    try {
      // For now, we'll use the initialized data
      // In the future, this could fetch from an API
      // const data = await this.fetchActivityFromAPI();
      // this.activityData = data;

      // Simulate API call delay
      await this.delay(100);

      console.log('Activity data loaded:', this.activityData);
    } catch (error) {
      console.error('Error loading activity data:', error);
      this.view.showError('Failed to load activity data');
    }
  }

  // Get activity data for the view
  getActivityData() {
    return this.activityData;
  }

  // Update activity data
  updateActivityData(newData) {
    this.activityData = { ...this.activityData, ...newData };
    this.view.updateActivityData(this.activityData);
  }

  // Handle photo click (e.g., open in modal)
  handlePhotoClick() {
    console.log('Photo clicked - opening modal');
    this.openPhotoModal();
  }

  // Handle video error with better fallback
  handleVideoError() {
    console.error('Video failed to load');
    const videoContainer = document.querySelector('video')?.parentElement;
    if (videoContainer) {
      videoContainer.innerHTML = `
        <div class="w-full aspect-video rounded-lg bg-neutral-700 flex items-center justify-center border-2 border-dashed border-neutral-600">
          <div class="text-center">
            <svg class="mx-auto h-12 w-12 text-neutral-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.5-4.5L15 1m0 9l-4.5-4.5L15 1m9 14v6a2 2 0 01-2 2H2a2 2 0 01-2-2v-6m20-5V4a2 2 0 00-2-2H2a2 2 0 00-2 2v6"/>
            </svg>
            <p class="text-neutral-400 text-sm">Video tidak dapat dimuat</p>
            <p class="text-neutral-500 text-xs mt-1">File mungkin tidak tersedia atau format tidak didukung</p>
          </div>
        </div>
      `;
    }
  }

  // Handle photo error with better fallback
  handlePhotoError() {
    console.error('Photo failed to load');
    const photoElement = document.querySelector('img[alt="Bukti Foto"]');
    if (photoElement) {
      // Try alternative images first
      const alternatives = [
        './public/images/detection.png',
        './public/images/overview.png',
        '/api/placeholder/400/320',
      ];

      this.tryAlternativeImages(photoElement, alternatives, 0);
    }
  }

  // Try alternative images recursively
  tryAlternativeImages(imgElement, alternatives, index) {
    if (index >= alternatives.length) {
      // All alternatives failed, use final placeholder
      imgElement.src = '/api/placeholder/400/320';
      imgElement.alt = 'Placeholder - Foto tidak dapat dimuat';
      return;
    }

    const altImg = new Image();
    altImg.onload = () => {
      imgElement.src = alternatives[index];
      imgElement.alt = 'Gambar alternatif';
    };
    altImg.onerror = () => {
      this.tryAlternativeImages(imgElement, alternatives, index + 1);
    };
    altImg.src = alternatives[index];
  }

  // Open photo in modal with better error handling
  openPhotoModal() {
    const imgSrc = this.activityData.photoEvidence || '/api/placeholder/400/320';

    const modalHTML = `
      <div id="photo-modal" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
        <div class="relative max-w-6xl max-h-full">
          <button id="close-photo-modal" class="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 z-10">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <img id="modal-image" src="${imgSrc}" alt="Bukti Foto Besar" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl">
          <div id="image-loading" class="absolute inset-0 flex items-center justify-center bg-neutral-800 rounded-lg">
            <div class="text-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p class="text-white text-sm">Memuat gambar...</p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('photo-modal');
    const closeBtn = document.getElementById('close-photo-modal');
    const modalImage = document.getElementById('modal-image');
    const loadingDiv = document.getElementById('image-loading');

    // Handle image loading
    modalImage.addEventListener('load', () => {
      loadingDiv.style.display = 'none';
    });

    modalImage.addEventListener('error', () => {
      loadingDiv.innerHTML = `
        <div class="text-center">
          <p class="text-white text-sm">Gagal memuat gambar</p>
          <p class="text-neutral-400 text-xs mt-1">Gambar mungkin tidak tersedia</p>
        </div>
      `;
    });

    // Close modal events
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    // Close with Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  // Utility method for delay
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Method to export activity data (e.g., for reports)
  exportActivityData() {
    const dataToExport = {
      ...this.activityData,
      exportedAt: new Date().toISOString(),
    };

    console.log('Exporting activity data:', dataToExport);

    // Could implement actual export functionality here
    // For example, download as JSON or PDF
    return dataToExport;
  }

  // Method to mark activity as reviewed
  markAsReviewed() {
    this.updateActivityData({
      reviewed: true,
      reviewedAt: new Date().toISOString(),
    });

    console.log('Activity marked as reviewed');
  }

  // Method to change alarm status
  changeAlarmStatus(newStatus) {
    const validStatuses = ['aktif', 'nonaktif', 'pending'];

    if (!validStatuses.includes(newStatus.toLowerCase())) {
      console.error('Invalid alarm status:', newStatus);
      return false;
    }

    this.updateActivityData({
      alarmStatus: newStatus,
      statusChangedAt: new Date().toISOString(),
    });

    console.log('Alarm status changed to:', newStatus);
    return true;
  }

  // Simulate API call to fetch activity data
  async fetchActivityFromAPI(activityId) {
    // This would be replaced with actual API call
    try {
      // Simulate API delay
      await this.delay(1000);

      // Simulate API response with correct paths
      return {
        id: activityId || 1,
        date: 'Jumat, 16 Mei 2025',
        time: '08:12:49',
        camera: 'Kamera Dalam Toko',
        cameraLocation: 'Area Monitoring',
        activity: 'Aktivitas terdeteksi pada area monitoring CCTV.',
        alarmStatus: 'aktif',
        photoEvidence: this.getAvailableImage(),
        videoEvidence: this.getAvailableVideo(),
        confidence: 0.95,
        severity: 'high',
      };
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  // Clean up resources when page is destroyed
  destroy() {
    // Remove event listeners and clean up resources
    const modal = document.getElementById('photo-modal');
    if (modal) {
      modal.remove();
    }
    console.log('DetailRiwayatPresenter destroyed');
  }
}
