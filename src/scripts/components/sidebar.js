import { getAccount } from '../data/api.js';
import { fetchRecentRiwayat } from '../utils/fetch-riwayat-sidebar.js';

export default async function Sidebar() {
  const { user } = await getAccount(); 
  const riwayatList = await fetchRecentRiwayat();

  const renderRiwayatItems =
    riwayatList.length > 0
      ? riwayatList
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((item) => {
            const localDate = new Date(item.created_at);
            const tanggal = localDate.toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
            const waktu = localDate.toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return `
              <a href="#/detail-riwayat" 
                 class="riwayat-link flex flex-col bg-neutral-800 rounded-md p-2 text-white hover:bg-neutral-700 transition mb-2"
                 data-riwayat='${JSON.stringify(item)}'>
                <div class="flex justify-between items-center">
                  <span class="text-xs">${tanggal || '-'}</span>
                  <i class="fa-solid fa-bell text-yellow-400 text-xl"></i>
                </div>
                <div class="text-xs">${waktu?.substring(0, 5) || '-'} WIB <span>| ${item.camera_name || '-'}</span></div>
              </a>
            `;
          })
          .join('')
      : `<p class="text-sm text-center text-neutral-400">Belum ada riwayat</p>`;

  // Event listener setelah elemen render
  setTimeout(() => {
    const links = document.querySelectorAll('.riwayat-link');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        const data = link.dataset.riwayat;
        sessionStorage.setItem('selectedActivityData', data);

        // Jika user sedang di /detail-riwayat, paksa reload agar data tampil ulang
        if (window.location.hash === '#/detail-riwayat') {
          location.reload();
        }
      });
    });
  }, 0);

  return `
    <aside id="sidebar" class="w-full sm:w-72 max-w-full bg-neutral-800 p-4 h-screen fixed overflow-y-auto z-50 transform lg:translate-x-0 -translate-x-full transition-transform duration-300 text-white">
      <div class="logo hidden lg:block">
        <img src="/public/images/logotext-seelirik.png" class="text-xl font-bold mt-2 mb-5 h-10 cursor-pointer"/>
      </div>

      <div class="intro">
        <p class="text-base font-light mb-1">Selamat Datang</p>
        <p class="text-xl font-semibold" id="sidebar-username">${user?.username || 'User'}</p>
      </div>

      <nav class="space-y-2 mt-8">
        <a href="#/monitoring" data-route="/monitoring" class="flex items-center p-3 rounded-md hover:bg-neutral-700 hover:text-emerald-400 transition-colors">
          <img src="/public/images/dashboard/monitoring-icon.png" class="w-6 h-6 object-contain" data-icon />
          <span class="ml-3">Monitoring</span>
        </a>
        <a href="#/riwayat" data-route="/riwayat" class="flex items-center p-3 rounded-md hover:bg-neutral-700 hover:text-emerald-400 transition-colors">
          <img src="/public/images/dashboard/riwayat-icon.png" class="w-6 h-6 object-contain" data-icon />
          <span class="ml-3">Riwayat Aktivitas</span>
        </a>
        <a href="#/akun" data-route="/akun" class="flex items-center p-3 rounded-md hover:bg-neutral-700 hover:text-emerald-400 transition-colors">
          <img src="/public/images/dashboard/akun-icon.png" class="w-6 h-6 object-contain" data-icon />
          <span class="ml-3">Akun</span>
        </a>
        <a href="#/logout" data-route="/logout" class="flex items-center p-3 rounded-md hover:bg-neutral-700 hover:text-emerald-400 transition-colors" id="keluar-link">
          <img src="/public/images/dashboard/keluar-icon.png" class="w-6 h-6 object-contain" data-icon />
          <span class="ml-3">Keluar</span>
        </a>
      </nav>

      <div class="mt-8 w-full h-64 bg-neutral-900 rounded-lg p-4 overflow-y-auto custom-scroll">
        <h3 class="text-sm text-center mb-3 text-white">Riwayat Aktivitas Mencurigakan</h3>
        ${renderRiwayatItems}
      </div>
    </aside>
  `;
}
