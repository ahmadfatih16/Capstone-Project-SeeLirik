export const getUserData = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await fetch('https://backend-seelirik-production.up.railway.app/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Gagal fetch user');

    return result.data;
  } catch (error) {
    console.error('Fetch user gagal:', error.message);
    return null;
  }
};

export const getUserToken = () => {
  return localStorage.getItem('token') || '';
};

