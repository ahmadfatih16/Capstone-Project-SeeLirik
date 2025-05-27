const AuthModel = {
  async login(payload) {
    const response = await fetch('https://backend-seelirik-production.up.railway.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  },

  async register(payload) {
    const response = await fetch('https://backend-seelirik-production.up.railway.app/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.message;
  },
};

export default AuthModel;
