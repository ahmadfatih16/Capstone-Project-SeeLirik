// export const BASE_URL_BACKEND = 'http://localhost:3000';
export const BASE_URL_BACKEND = 'https://backend-capstone-seelirik-production.up.railway.app';

export async function getRiwayat() {
  const response = await fetch(`${BASE_URL_BACKEND}/histories`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) throw new Error('Gagal fetch riwayat');
  return await response.json();
}

export async function getAccount() {
  const res = await fetch(`${BASE_URL_BACKEND}/account`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return await res.json();
}

export async function updateAccount(data) {
  const response = await fetch(`${BASE_URL_BACKEND}/account`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Gagal update akun');
  }

  return await response.json();
}

export async function getRiwayatDetail(id) {
  const response = await fetch(`${BASE_URL_BACKEND}/histories/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) throw new Error('Gagal fetch detail riwayat');
  return await response.json();
}

export async function postKamera(name, deviceId) {
  const response = await fetch(`${BASE_URL_BACKEND}/cameras`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ name, deviceId }), // ✅ perbaikan di sini
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Gagal menambahkan kamera');
  }

  return await response.json();
}


