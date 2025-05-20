import UrlParser from './routes/url-parser.js';
import routes from './routes/route.js';

const App = {
  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = (routes[url] || routes['/'])(); // ✅ fix: panggil fungsinya

    const mainContent = document.getElementById('app');
    mainContent.innerHTML = await page.render();
    await page.afterRender?.();
  },
};

export default App;
