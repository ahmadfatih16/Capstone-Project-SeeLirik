import UrlParser from './routes/url-parser.js';
import routes from './routes/route.js';

const App = {
  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = (routes[url] || routes['/'])();

    const body = document.body;
    const mainContent = document.getElementById('app');

    // Atur class body untuk halaman auth
    body.classList.remove('auth-page');
    if (url === '/login' || url === '/register') {
      body.classList.add('auth-page');
    }

    // Bersihkan isi container sebelum render halaman baru
    mainContent.innerHTML = ''; // <--- ini penting untuk mencegah sisa form login tertinggal
    mainContent.style.transition = '';
    mainContent.style.opacity = '1';

    // Render dan afterRender
    mainContent.innerHTML = await page.render();
    await page.afterRender?.();
  },
};

export default App;
