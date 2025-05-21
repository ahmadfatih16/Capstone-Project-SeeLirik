import LandingPage from '../pages/landing/landing-page.js';
import LoginPage from '../pages/auth/login-page.js';
import RegisterPage from '../pages/auth/register-page.js';
import MonitoringPage from '../pages/monitoring/monitoring-page.js';
import RiwayatPage from '../pages/riwayat/riwayat-page.js';
import AkunPage from '../pages/akun/akun-page.js';
import DetailRiwayatPage from '../pages/detail-riwayat/detail-riwayat-page.js';

const routes = {
  '/': () => new LandingPage(),
  '/login': () => new LoginPage(),
  '/register': () => new RegisterPage(),
  '/monitoring': () => new MonitoringPage(),
  '/riwayat': () => new RiwayatPage(),
  '/akun': () => new AkunPage(),
  '/detail-riwayat': () => new DetailRiwayatPage(),
};

export default routes;
