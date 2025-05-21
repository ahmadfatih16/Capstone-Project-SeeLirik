export default function initModalLogout() {
  const keluarLink = document.getElementById('keluar-link');
  const modal = document.getElementById('modal-logout');
  const batalBtn = document.getElementById('batal-keluar');
  const confirmLink = modal?.querySelector('a[href="#/login"]');

  if (!keluarLink || !modal || !confirmLink) return;

  // Tampilkan modal saat klik sidebar logout
  keluarLink.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
  });

  // Batal keluar → tutup modal
  batalBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Saat klik "Keluar", hapus user dari localStorage
  confirmLink?.addEventListener('click', () => {
    localStorage.removeItem('activeUser');
  });
}
