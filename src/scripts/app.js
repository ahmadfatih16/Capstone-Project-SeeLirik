import UrlParser from './routes/url-parser.js';
import routes from './routes/route.js';
import { io } from 'socket.io-client';
// window.socket = io('http://localhost:4000');
window.socket = io('https://realtime-server-seelirik-production.up.railway.app');

const App = {
  async renderPage() {
  const url = UrlParser.parseActiveUrlWithCombiner();
  const page = (routes[url] || routes['/'])();
  const mainContent = document.getElementById('main-content');

  if (!mainContent) return;

  // 1. Buat clone dari konten lama
  const oldContent = mainContent.cloneNode(true);
  oldContent.id = 'main-content-clone'; // hindari ID ganda
  oldContent.classList.add('page-transition', 'blur-out');

  // 2. Masukkan clone ke DOM, di atas konten asli
  mainContent.parentNode.insertBefore(oldContent, mainContent);

  // 3. Sembunyikan konten asli dulu (agar tidak muncul saat blur-out)
  mainContent.style.visibility = 'hidden';

  // 4. Tunggu transisi blur-out selesai
  await new Promise(resolve => setTimeout(resolve, 300));

  // 5. Render konten baru
  mainContent.innerHTML = await page.render();
  await page.afterRender?.();

  // 6. Tampilkan konten baru dan beri efek blur-in
  mainContent.style.visibility = 'visible';
  mainContent.classList.add('page-transition', 'blur-in');

  // 7. Hapus clone lama
  oldContent.remove();

  // 8. Bersihkan class setelah animasi
  setTimeout(() => {
    mainContent.classList.remove('blur-in');
  }, 400);
}
,


  async _performPageRender(url) {
    const page = (routes[url] || routes['/'])();
    const body = document.body;
    const mainContent = document.getElementById('main-content');

    body.classList.remove('auth-page');
    if (url === '/login' || url === '/register') {
      body.classList.add('auth-page');
    }

    mainContent.innerHTML = '';
    mainContent.style.transition = '';
    mainContent.style.opacity = '1';

    mainContent.innerHTML = await page.render();
    await page.afterRender?.();
  },
};

export default App;
