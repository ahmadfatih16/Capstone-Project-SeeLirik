import AuthModel from '../../models/auth-model.js';

export default class LoginPage {
  async render() {
    return `
      <div id="authContainer" class="auth-wrapper transition-opacity duration-300 ease-in-out">
        <h1>Login</h1>
        <form id="login-form">
          <input type="email" id="email" placeholder="Email" required />
          <input type="password" id="password" placeholder="Password" required />
          <button type="submit" id="loginButton" class="btn flex justify-center items-center gap-2">
            <span id="loginText">Login</span>
            <svg id="loginSpinner" class="animate-spin h-5 w-5 text-white hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </button>
        </form>
        <p id="login-error" class="text-red-500 mt-2"></p>
      </div>
    `;
  }

  async afterRender() {
    document.body.classList.add('auth-page');

    const form = document.getElementById('login-form');
    const loginButton = document.getElementById('loginButton');
    const loginText = document.getElementById('loginText');
    const loginSpinner = document.getElementById('loginSpinner');
    const container = document.getElementById('authContainer');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value.trim(); // Pastikan variabelnya 'email' sesuai dengan ID input
      const password = form.password.value.trim();

      loginButton.disabled = true;
      loginText.textContent = 'Loading';
      loginSpinner.classList.remove('hidden');

      try {
        const data = await AuthModel.login({ email, password });

        if (data.token) {
          localStorage.setItem('token', data.token);

          // Fade out login form
          const container = document.querySelector('.auth-wrapper');
          if (container) {
            container.style.opacity = '0';
            container.style.transition = 'opacity 0.3s ease';
          }

          await new Promise((resolve) => setTimeout(resolve, 300));

          const appElement = document.getElementById('app');
          appElement.innerHTML = '';

          window.location.hash = '#/monitoring';
        } else {
          throw new Error(data.message || 'Login gagal');
        }
      } catch (err) {
        document.getElementById('login-error').innerText = err.message;
        loginButton.disabled = false;
        loginText.textContent = 'Login';
        loginSpinner.classList.add('hidden');
      }
    });
  }
}
