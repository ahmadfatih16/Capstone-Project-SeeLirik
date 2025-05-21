import App from './app.js';
import '../styles/output.css';

window.addEventListener('hashchange', () => {
  App.renderPage();
});

window.addEventListener('load', () => {
  App.renderPage();
});
