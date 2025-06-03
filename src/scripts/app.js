import UrlParser from './routes/url-parser.js';
import routes from './routes/route.js';

const App = {
  async renderPage() {
    // Cek apakah View Transitions API didukung browser
    if (document.startViewTransition) {
      // Jika didukung, gunakan untuk transisi mulus
      document.startViewTransition(async () => {
        // Jalankan logika render halaman di dalam callback transisi
        await this._performPageRender();
      });
    } else {
      // Fallback jika browser tidak mendukung View Transitions
      await this._performPageRender();
    }
  },

  async _performPageRender() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = (routes[url] || routes['/'])(); // Fallback ke '/' jika URL tidak ditemukan

    const body = document.body;
    // const mainContent = document.getElementById('app');
    const mainContent = document.getElementById('main-content');

    // Atur kelas body untuk halaman otentikasi
    body.classList.remove('auth-page');
    if (url === '/login' || url === '/register') {
      body.classList.add('auth-page');
    }

    // Bersihkan konten yang ada. View Transitions API mengambil snapshot DOM sebelum ini.
    mainContent.innerHTML = '';
    mainContent.style.transition = ''; // Reset gaya transisi sebelumnya
    mainContent.style.opacity = '1';   // Pastikan opacity penuh

    // Render konten halaman baru dan jalankan logika afterRender
    mainContent.innerHTML = await page.render();
    await page.afterRender?.(); // Panggil afterRender jika ada
  }
};

export default App;