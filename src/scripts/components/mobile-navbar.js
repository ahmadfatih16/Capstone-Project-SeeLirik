export default function MobileNavbar() {
  return `
    <div class="lg:hidden flex justify-between items-center bg-neutral-800 p-4 z-50 relative">
      <img src="/public/images/logotext-seelirik.png" class="h-8" alt="Logo SeeLirik" />
      <button id="hamburger" class="text-white text-2xl cursor-pointer">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>

    <div id="overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden lg:hidden"></div>
  `;
}

export function initMobileNavbar() {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  if (!hamburger || !sidebar || !overlay) return;

  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
  });
}
