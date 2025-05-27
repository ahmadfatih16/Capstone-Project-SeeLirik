export default function ModalEditAkun() {
  return `
<div id="modal-edit-akun" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
  <div class="bg-neutral-800 text-emerald-400 rounded-lg shadow-lg w-full max-w-md p-6">
    <h2 class="text-xl font-semibold mb-4">Edit Akun</h2>
    <form id="form-edit-akun" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Nama Toko</label>
        <input type="text" id="edit-store-name" class="mt-1 block w-full border border-emerald-500 bg-neutral-900 text-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
      </div>
      <div>
        <label class="block text-sm font-medium">Alamat Toko</label>
        <input type="text" id="edit-store-location" class="mt-1 block w-full border border-emerald-500 bg-neutral-900 text-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
      </div>
      <div>
        <label class="block text-sm font-medium">Deskripsi Toko</label>
        <textarea id="edit-store-description" class="mt-1 block w-full border border-emerald-500 bg-neutral-900 text-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" required></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium">Username</label>
        <input type="text" id="edit-username" class="mt-1 block w-full border border-emerald-500 bg-neutral-900 text-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
      </div>
      <div class="flex justify-end mt-4 gap-3">
        <button type="button" id="cancel-edit-akun" class="cursor-pointer bg-neutral-600 text-emerald-300 px-4 py-2 rounded hover:bg-neutral-700 mr-4">Batal</button>
        <button type="submit" class="cursor-pointer bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600">Simpan</button>
      </div>
    </form>
  </div>
</div>

    `;
}
