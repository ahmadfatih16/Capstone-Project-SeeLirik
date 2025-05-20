import LandingHome from '../../templates/landing-home.js';
import LandingAbout from '../../templates/landing-about.js';
import LandingDemo from '../../templates/landing-demo.js';
import LandingContact from '../../templates/landing-contact.js';

export default class LandingPage {
    async render() {
      return `
        <header>
          <nav class="p-5 bg-neutral-800 shadow md:flex md:items-center md:justify-between">
            <div class="flex justify-between items-center">
              <span class="cursor-pointer">
                <img class="h-9 inline" src="/public/images/logotext-seelirik.png" alt="Logo" />
              </span>
              <span class="text-3xl cursor-pointer mx-2 md:hidden block fill-white">
                <ion-icon name="menu" style="color: #ffffff"></ion-icon>
              </span>
            </div>
            <ul class="absolute top-[-400px] left-0 w-full opacity-0 z-[-1] custom-color2 md:static md:z-auto md:flex md:items-center md:justify-center md:w-auto md:opacity-100 md:py-0 md:pl-0 py-4 pl-7 font-semibold transition-all ease-in duration-500">
              <li class="mx-5"><a href="#home" class="text-xl text-white hover:text-emerald-400 duration-500">Beranda</a></li>
              <li class="mx-5"><a href="#about" class="text-xl text-white hover:text-emerald-400 duration-500">Tentang</a></li>
              <li class="mx-5"><a href="#demo" class="text-xl text-white hover:text-emerald-400 duration-500">Demo</a></li>
              <li class="mx-5"><a href="#contact" class="text-xl text-white hover:text-emerald-400 duration-500">Kontak</a></li>
            </ul>
            <a href="#/login" class="hidden md:block bg-emerald-400 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 duration-500 cursor-pointer"> Mulai Sekarang </a>
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
    }
  }
  