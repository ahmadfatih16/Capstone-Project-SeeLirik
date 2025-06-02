import App from './app.js';
import '../styles/output.css';
import swRegister from './utils/sw-register'; // Import swRegister

window.addEventListener('hashchange', () => {
  console.log('[DEBUG] hashchange terdeteksi');
  App.renderPage();
});

window.addEventListener('load', () => {
  App.renderPage();
  swRegister(); // Panggil swRegister saat aplikasi dimuat
});