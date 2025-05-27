import '../../../styles/auth-style.css';
import AuthModel from '../../models/auth-model.js';

export default class RegisterPage {
  async render() {
    document.body.classList.add('auth-page');

    return `
      <div class="container register-mode" style="margin-top: 50px; margin-bottom: 50px;">
        <div class="form-box register" >
          <form id="register-form">
            <h1>Registration</h1>

            <div class="input-box">
              <input type="text" id="username" placeholder="Username" required />
              <i class='bx bxs-user'></i>
            </div>
            <div class="input-box">
              <input type="email" id="email" placeholder="Email" required />
              <i class='bx bxs-envelope'></i>
            </div>
            <div class="input-box">
              <input type="password" id="password" placeholder="Password" required />
              <i class='bx bxs-lock-alt'></i>
            </div>
            <div class="input-box">
              <input type="text" id="storeName" placeholder="Store Name" required />
              <i class='bx bxs-store'></i>
            </div>
            <div class="input-box">
              <input type="text" id="storeLocation" placeholder="Store Location" required />
              <i class='bx bxs-map'></i>
            </div>
            <div class="input-box">
              <textarea id="storeDescription" placeholder="Store Description" required></textarea>
              <i class='bx bxs-comment-detail'></i>
            </div>

            <button type="submit" class="btn">Register</button>
            <p id="register-error" class="error-text"></p>
          </form>
        </div>

        <div class="toggle-box">
          <div class="toggle-panel toggle-right">
            <img src="../../../public/images/auth/logo.png" alt="Logo" class="logo-image" />
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button type="button" id="loginBtn" class="btn login-btn">Login</button>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    setTimeout(() => {
      document.querySelector('.container')?.classList.add('active');
    }, 100);

    const form = document.getElementById('register-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        username: form.username.value.trim(),
        email: form.email.value.trim(),
        password: form.password.value.trim(),
        storeName: form.storeName.value.trim(),
        storeLocation: form.storeLocation.value.trim(),
        storeDescription: form.storeDescription.value.trim(),
      };

      try {
        const message = await AuthModel.register(payload);
        alert(message);
        window.location.hash = '#/login';
      } catch (err) {
        document.getElementById('register-error').innerText = err.message;
      }
    });

    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        const container = document.querySelector('.container');
        container?.classList.remove('active');
        setTimeout(() => {
          window.location.hash = '#/login';
        }, 900);
      });
    }
  }
}
