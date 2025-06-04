export default function ModalEditAkun() {
  return `
  <div id="modal-edit-akun" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
    <div class="bg-neutral-900 text-white rounded-lg shadow-2xl w-full max-w-md p-6">
      <h2 class="text-2xl font-bold mb-4 text-emerald-400">Edit Akun</h2>
      <form id="form-edit-akun" class="space-y-4">
        <div>
          <label class="block text-emerald-400 text-sm font-medium mb-1">Nama Toko</label>
          <input
            type="text"
            id="edit-store-name"
            placeholder="Masukkan nama toko"
            class="block w-full bg-neutral-800 border border-neutral-600 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>
        <div>
          <label class="block text-emerald-400 text-sm font-medium mb-1">Alamat Toko</label>
          <input
            type="text"
            id="edit-store-location"
            placeholder="Masukkan alamat toko"
            class="block w-full bg-neutral-800 border border-neutral-600 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>
        <div>
          <label class="block text-emerald-400 text-sm font-medium mb-1">Deskripsi Toko</label>
          <textarea
            id="edit-store-description"
            placeholder="Masukkan deskripsi toko"
            class="block w-full bg-neutral-800 border border-neutral-600 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          ></textarea>
        </div>
        <div>
          <label class="block text-emerald-400 text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            id="edit-username"
            placeholder="Masukkan username"
            class="block w-full bg-neutral-800 border border-neutral-600 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>
        <div class="flex justify-end mt-4 gap-3">
          <button
            type="button"
            id="cancel-edit-akun"
            class="cursor-pointer bg-neutral-700 text-white px-4 py-2 rounded hover:bg-neutral-800 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            class="cursor-pointer bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition shadow-md hover:shadow-lg"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
  `;
}
