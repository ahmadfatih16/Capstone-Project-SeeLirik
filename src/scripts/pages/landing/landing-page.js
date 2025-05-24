import LandingHome from '../../templates/landing-home.js';
import LandingAbout from '../../templates/landing-about.js';
import LandingDemo from '../../templates/landing-demo.js';
import LandingContact from '../../templates/landing-contact.js';

export default class LandingPage {
  async render() {
    return `
        <header>
          <nav class="relative p-5 bg-neutral-800 shadow-lg md:flex md:items-center md:justify-between">
            <div class="flex justify-between items-center">
              <span class="cursor-pointer">
                <img class="h-9 inline" src="/public/images/logotext-seelirik.png" alt="Logo" />
              </span>
              <span id="menu-toggle" class="text-3xl cursor-pointer mx-2 md:hidden block text-white hover:text-emerald-400 transition-colors duration-300">
                <ion-icon name="menu"></ion-icon>
              </span>
            </div>
            
            <!-- Desktop Menu -->
            <ul class="hidden md:static md:z-auto md:flex md:items-center md:justify-center md:w-auto md:opacity-100 md:py-0 md:pl-0 py-4 pl-7 font-semibold transition-all ease-in duration-500">
              <li class="mx-5"><a href="#home" class="text-xl text-white hover:text-emerald-400 duration-500">Beranda</a></li>
              <li class="mx-5"><a href="#about" class="text-xl text-white hover:text-emerald-400 duration-500">Tentang</a></li>
              <li class="mx-5"><a href="#demo" class="text-xl text-white hover:text-emerald-400 duration-500">Demo</a></li>
              <li class="mx-5"><a href="#contact" class="text-xl text-white hover:text-emerald-400 duration-500">Kontak</a></li>
            </ul>

            <!-- Mobile Menu -->
            <ul id="mobile-menu" class="absolute top-[-400px] left-0 w-full opacity-0 z-[-1] bg-neutral-900 backdrop-blur-sm border-t border-neutral-700 md:hidden font-semibold transition-all ease-in-out duration-500 shadow-2xl">
              <div class="px-6 py-4 space-y-1 text-center">
                <li><a href="#home" class="block px-4 py-3 text-lg text-white hover:text-emerald-400 hover:bg-neutral-800 rounded-lg transition-all duration-300 border-l-4 border-transparent hover:border-emerald-400">
                  Beranda
                </a></li>
                <li><a href="#about" class="block px-4 py-3 text-lg text-white hover:text-emerald-400 hover:bg-neutral-800 rounded-lg transition-all duration-300 border-l-4 border-transparent hover:border-emerald-400">
                  Tentang
                </a></li>
                <li><a href="#demo" class="block px-4 py-3 text-lg text-white hover:text-emerald-400 hover:bg-neutral-800 rounded-lg transition-all duration-300 border-l-4 border-transparent hover:border-emerald-400">
                  Demo
                </a></li>
                <li><a href="#contact" class="block px-4 py-3 text-lg text-white hover:text-emerald-400 hover:bg-neutral-800 rounded-lg transition-all duration-300 border-l-4 border-transparent hover:border-emerald-400">
                  Kontak
                </a></li>
                <li class="pt-4 border-t border-neutral-700 mt-4">
                  <a href="#/login" class="block bg-emerald-400 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 duration-500 cursor-pointer text-center">
                    Mulai Sekarang
                  </a>
                </li>
              </div>
            </ul>

            <a href="#/login" class="hidden md:block bg-emerald-400 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 duration-500 cursor-pointer"> 
              Mulai Sekarang 
            </a>
          </nav>
        </header>
  
        <main class="px-10">
          <!-- HOME -->
           ${LandingHome()}
          <!-- ABOUT -->
          ${LandingAbout()}
          <!-- DEMO -->
          ${LandingDemo()}
          <!-- CONTACT -->
          ${LandingContact()}
        </main>
  
        <footer>
          <div class="bg-neutral-800 p-5 mt-10">
            <p class="text-white text-center">&copy; 2025-SeeLirik. Semua hak dilindungi.</p>
          </div>
        </footer>
      `;
  }

  async afterRender() {
    const presenter = (await import('./landing-presenter.js')).default;
    presenter.init();
    
    // Mobile menu toggle functionality
    this.initMobileMenu();
  }
  
  initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        // Toggle menu visibility with improved positioning
        if (mobileMenu.classList.contains('top-[-400px]')) {
          // Show menu
          mobileMenu.classList.remove('top-[-400px]', 'opacity-0', 'z-[-1]');
          mobileMenu.classList.add('top-[80px]', 'opacity-100', 'z-50');
          
          // Change hamburger to close icon
          const icon = menuToggle.querySelector('ion-icon');
          icon.setAttribute('name', 'close');
        } else {
          // Hide menu
          mobileMenu.classList.remove('top-[80px]', 'opacity-100', 'z-50');
          mobileMenu.classList.add('top-[-400px]', 'opacity-0', 'z-[-1]');
          
          // Change close icon back to hamburger
          const icon = menuToggle.querySelector('ion-icon');
          icon.setAttribute('name', 'menu');
        }
      });
      
      // Close menu when clicking on menu links
      const menuLinks = mobileMenu.querySelectorAll('a');
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          // Hide menu after clicking a link
          mobileMenu.classList.remove('top-[80px]', 'opacity-100', 'z-50');
          mobileMenu.classList.add('top-[-400px]', 'opacity-0', 'z-[-1]');
          
          // Change close icon back to hamburger
          const icon = menuToggle.querySelector('ion-icon');
          icon.setAttribute('name', 'menu');
        });
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
          if (mobileMenu.classList.contains('opacity-100')) {
            mobileMenu.classList.remove('top-[80px]', 'opacity-100', 'z-50');
            mobileMenu.classList.add('top-[-400px]', 'opacity-0', 'z-[-1]');
            
            // Change close icon back to hamburger
            const icon = menuToggle.querySelector('ion-icon');
            icon.setAttribute('name', 'menu');
          }
        }
      });
    }
  }
}