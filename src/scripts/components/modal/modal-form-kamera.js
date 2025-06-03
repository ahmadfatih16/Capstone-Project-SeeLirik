const ModalFormKamera = () => `
  <form id="formTambah">
    <div class="mb-4">
      <label class="block mb-1 text-white">Nama Kamera:</label>
      <input type="text" id="namaKamera" required class="w-full p-2 rounded bg-neutral-700 text-white" />
    </div>
    <div class="mb-4">
      <label class="block mb-1 text-white">Pilih Kamera:</label>
      <select id="selectDevice" required class="w-full p-2 rounded bg-neutral-700 text-white"></select>
    </div>
    <video id="previewKamera" autoplay muted class="rounded w-full aspect-video bg-black mb-4"></video>
    <div class="flex gap-4">
      <button type="submit" class="bg-emerald-400 px-4 py-2 rounded text-white font-semibold">Simpan</button>
      <button type="button" id="closeModal" class="bg-red-500 px-4 py-2 rounded text-white font-semibold">Batal</button>
    </div>
  </form>
`;

export default ModalFormKamera;
