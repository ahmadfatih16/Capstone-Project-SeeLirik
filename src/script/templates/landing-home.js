export default function LandingHome() {
  return `
    <section id="home" class="min-h-screen flex items-center justify-center px-6 bg-neutral-900">
      <div class="container mx-auto flex flex-col-reverse md:flex-row items-center md:space-x-6 space-y-6 md:space-y-0">
        <div class="md:w-4/6 text-center md:text-left">
          <h4 class="text-white text-2xl font-bold pt-4">SeeLirik</h4>
          <h3 class="text-white text-5xl font-bold mb-5 py-4">
            Deteksi <span class="text-emerald-400">Shoplifting</span> Otomatis Berbasis AI
          </h3>
          <p class="text-white mb-5 text-xl">
            Lindungi toko Anda dari kerugian akibat pencurian dengan sistem cerdas SeeLirik. Teknologi AI kami
            menganalisis perilaku mencurigakan secara real-time melalui CCTV dan memberikan notifikasi instan
            kepada petugas keamanan.
            Lebih dari sekadar rekaman—SeeLirik adalah keamanan proaktif untuk ritel masa kini.
          </p>
          <a href="#/login" class="bg-emerald-400 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-emerald-600 duration-500">
            Mulai Sekarang
          </a>
        </div>
        <img class="w-4/6 mx-auto mt-10 md:w-2/6 md:mt-0" src="/public/images/ilustrasi-cctv.png" alt="cctv" />
      </div>
    </section>
  `;
}
