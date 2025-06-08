import presenter from '../pages/monitoring/monitoring-presenter.js';
import ModalFormKamera from '../components/modal/modal-form-kamera.js';

let previewStream = null;
const STANDARD_RESOLUTION = {
  width: { exact: 1280 },
  height: { exact: 720 },
};

async function openModal() {
  // Trigger izin kamera agar browser menampilkan prompt
  await navigator.mediaDevices.getUserMedia({ video: true }).catch(() => {});

  const modal = document.getElementById('modalWrapper');
  const content = document.getElementById('modalContent');

  content.innerHTML = ModalFormKamera(); // render langsung dari komponen JS
  modal.classList.remove('hidden');

  await updateSelectDevice();
  attachModalEvents();
}

function attachModalEvents() {
  const modal = document.getElementById('modalWrapper');

  // Tombol batal
  document.getElementById('closeModal').onclick = () => {
    stopPreview();
    modal.classList.add('hidden');
  };

  // Tombol simpan
  document.getElementById('formTambah').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('namaKamera').value;
    const deviceId = document.getElementById('selectDevice').value;
    // await presenter.addNewCamera(name, deviceId);
    presenter.handleAddCamera(name, deviceId);
    stopPreview();
    modal.classList.add('hidden');
  });
}

async function updateSelectDevice() {
  const select = document.getElementById('selectDevice');
  const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
    (d) => d.kind === 'videoinput'
  );
  select.innerHTML = '';

  devices.forEach((device) => {
    const option = new Option(device.label || 'Kamera', device.deviceId);
    select.appendChild(option);
  });

  if (devices[0]) previewCamera(devices[0].deviceId);
  select.onchange = () => previewCamera(select.value);
}

async function previewCamera(deviceId) {
  stopPreview();

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        deviceId: { exact: deviceId }, // tetap pakai exact, tapi lebih aman
      },
    });

    const vid = document.getElementById('previewKamera');
    if (vid) {
      vid.srcObject = stream;
      previewStream = stream;
    }

    console.log('✅ Preview kamera berhasil:', deviceId);
  } catch (err) {
    console.error('❌ Preview gagal:', err.name, err.message);

    alert(
      `Gagal menampilkan preview kamera.\n\nKemungkinan penyebab:\n- Kamera sedang digunakan di tempat lain\n- Izin kamera belum diberikan\n- Kamera tidak tersedia\n\nSilakan pilih kamera lain atau muat ulang halaman.`
    );
  }
}

function stopPreview() {
  if (previewStream) {
    previewStream.getTracks().forEach((track) => track.stop());
    previewStream = null;
    const vid = document.getElementById('previewKamera');
    if (vid) vid.srcObject = null;
  }
}

export { openModal };
