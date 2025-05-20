import MobileNavbar, { initMobileNavbar } from '../../components/mobile-navbar.js';
import Sidebar from '../../components/sidebar.js';
import DateTime, { initDateTime } from '../../components/datetime.js';
import { setActiveSidebarLink } from '../../utils/sidebar-state.js';
import ModalLogout from '../../components/modal/modal-logout.js';
import initModalLogout from '../../utils/modal/init-modal-logout.js';

export default class MonitoringPage {
  async render() {
    return `
      ${MobileNavbar()}
      ${Sidebar()}
      ${ModalLogout()}
       
    <main class="lg:ml-72 p-4">
     ${DateTime()}
       <section class="flex items-center justify-center bg-neutral-900 text-white">
          <h1 class="text-4xl font-bold">Ini halaman Monitoring</h1>
            
          
        </section>
    </main>
       
      `;
  }

  async afterRender() {
    initMobileNavbar();
    initDateTime();
    setActiveSidebarLink();
    initModalLogout();
  }
}
