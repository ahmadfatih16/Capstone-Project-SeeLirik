import '../../../styles/auth-style.css';
import AuthModel from '../../models/auth-model.js';

export default class LoginPage {
  async render() {
    document.body.classList.add('auth-page');

    return `
      <div class="container login-mode">

         <div class="toggle-box">
          <div class="toggle-panel toggle-left">
            <img src="../../../public/images/auth/logo.png" alt="Logo" class="logo-image" />
            <h1>Welcome to SeeLirik!</h1>
            <p>Don't have an account?</p>
            <button class="btn register-btn">Register</button>
          </div>
        </div>

        <div class="form-box login">
          <form id="login-form">
            <h1>Login</h1>
            <div class="input-box">
              <input type="text" id="username" placeholder="Username" required />
              <i class='bx bxs-user'></i>
            </div>
            <div class="input-box">
              <input type="password" id="password" placeholder="Password" required />
              <i class='bx bxs-lock-alt'></i>
            </div>
            
           <button type="submit" id="loginButton" class="btn">
              <span id="loginText">Login</span>
              <span id="loginSpinner" class="loader" style="display: none;"></span>
            </button>

            <p id="login-error" class="error-text"></p>
          </form>
        </div>

       
      </div>
    `;
  }

  async afterRender() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = form.username.value.trim();
      const password = form.password.value.trim();

      const loginButton = document.getElementById('loginButton');
      const loginText = document.getElementById('loginText');
      const loginSpinner = document.getElementById('loginSpinner');

      // Aktifkan spinner
      loginButton.disabled = true;
      loginText.textContent = 'Loading...';
      loginSpinner.style.display = 'inline-block';

      try {
        const data = await AuthModel.login({ email: username, password });

        if (data.token) {
          localStorage.setItem('token', data.token);

          // Fade out form box
          const container = document.querySelector('.form-box.login');
          if (container) {
            container.style.transition = 'opacity 0.3s ease';
            container.style.opacity = '0';
          }

          // Tunggu 300ms sebelum redirect
          await new Promise((resolve) => setTimeout(resolve, 300));

          window.location.hash = '#/monitoring';
        } else {
          throw new Error(data.message || 'Login gagal');
        }
      } catch (err) {
        document.getElementById('login-error').innerText = err.message;
        loginButton.disabled = false;
        loginText.textContent = 'Login';
        loginSpinner.style.display = 'none';
      }
    });

    const registerBtn = document.querySelector('.register-btn');
    if (registerBtn) {
      registerBtn.addEventListener('click', () => {
        const container = document.querySelector('.container');
        if (container) {
          container.classList.add('active'); // aktifkan transisi hijau turun
        }

        // Delay agar transisi sempat muncul
        setTimeout(() => {
          window.location.hash = '#/register';
        }, 700); // waktu disesuaikan dengan CSS transition
      });
    }
  }
}
