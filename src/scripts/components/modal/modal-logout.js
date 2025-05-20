export default function ModalLogout() {
  return `
      <div id="modal-logout" class="text-white fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div class="bg-neutral-800 rounded-lg p-6 w-full max-w-sm">
           <h3 class="text-lg font-semibold mb-4">Konfirmasi Keluar</h3>
          <p class="mb-6 text-sm">Apakah Anda yakin ingin keluar</p>
          <div class="flex justify-end gap-3">
            <button id="batal-keluar" class="px-4 py-2 bg-neutral-600 hover:bg-neutral-700 rounded cursor-pointer">Batal</button>
            <a href="#/login" class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white">Keluar</a>
          </div>
        </div>
      </div>
    `;
}
