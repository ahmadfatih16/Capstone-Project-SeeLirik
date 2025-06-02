import { BASE_URL_BACKEND } from '../data/api.js';

const AuthModel = {
  async login({ email, password }) {
    const res = await fetch(`${BASE_URL_BACKEND}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login gagal');

    return data; // { token: '...' }
  },

  async register({ username, email, password, storeName, storeLocation, storeDescription }) {
    const res = await fetch(`${BASE_URL_BACKEND}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        store_name: storeName,
        store_location: storeLocation,
        store_description: storeDescription,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Register gagal');

    return data.message || 'Register berhasil';
  },
};

export default AuthModel;
