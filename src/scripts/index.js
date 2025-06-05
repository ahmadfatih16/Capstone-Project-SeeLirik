import App from './app.js';
import '../styles/output.css';
import '../styles/style.css';
import { openModal } from './utils/modal-handler.js';

window.addEventListener('hashchange', () => {
  console.log('[DEBUG] hashchange terdeteksi');
  App.renderPage();
});

window.addEventListener('load', () => {
  App.renderPage();
});

