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
  registerServiceWorker();
});

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((registration) => {
        console.log('[PWA] Service Worker registered successfully:', registration);
      })
      .catch((error) => {
        console.error('[PWA] Service Worker registration failed:', error);
      });
  } else {
    console.warn('[PWA] Service Worker is not supported in this browser.');
  }
}
