// model.js
// Berfungsi sebagai lapisan logika data (mengatur komunikasi antara presenter dan API)

import {
  fetchCameras,
  addCamera as apiAddCamera,
  editCameraName as apiEditCameraName,
  deleteCamera as apiDeleteCamera,
} from '../data/api';

/**
 * Ambil seluruh kamera dari API
 */
async function getAllCameras() {
  return await fetchCameras();
}

/**
 * Tambah kamera baru
 * @param {{ name: string, deviceId: string }} cameraData
 */
async function addCamera(cameraData) {
  return await apiAddCamera(cameraData);
}

/**
 * Ubah hanya nama kamera
 * @param {string} id
 * @param {string} newName
 */
async function updateCameraName(id, newName) {
  return await apiEditCameraName(id, newName);
}

/**
 * Hapus kamera berdasarkan ID
 * @param {string} id
 */
async function removeCamera(id) {
  return await apiDeleteCamera(id);
}

export { getAllCameras, addCamera, updateCameraName, removeCamera };
