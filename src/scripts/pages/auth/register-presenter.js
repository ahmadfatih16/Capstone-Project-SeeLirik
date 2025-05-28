import AuthModel from '../../models/auth-model.js';

const RegisterPresenter = {
  async init(container) {
    document.body.classList.add('auth-page');

    container.innerHTML = `
      <div class="container register-mode">
        <div class="form-box register">
          <form id="register-form">
            <h1>Register</h1>

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
            </div>

            <button type="submit" class="btn">Register</button>
            <p id="register-error" class="error-text"></p>
          </form>
        </div>

        <div class="toggle-box">
          <div class="toggle-panel toggle-left">
            <img src="logo.png" alt="Logo" class="logo-image" />
            <h1>Already have an account?</h1>
            <p>Click below to login.</p>
            <button class="btn login-btn">Login</button>
          </div>
        </div>
      </div>
    `;

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

    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        window.location.hash = '#/login';
      });
    }
  },
};

export default RegisterPresenter;
