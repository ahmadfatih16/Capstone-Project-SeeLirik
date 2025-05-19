const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".form-box.login form");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah form reload

    // Di sini bisa ditambahkan validasi atau autentikasi jika perlu

    // Arahkan ke halaman dashboard
    window.location.href = "../dashboard/dashboard-page.html";
  });
});
