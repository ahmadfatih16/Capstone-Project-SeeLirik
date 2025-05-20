// src/script/templates/landing-about.js
export default function LandingAbout() {
  return `
    <section id="about" class="container mx-auto min-h-screen bg-neutral-900 text-center pt-16">
      <h1 class="text-white text-5xl font-bold py-15">Kenapa Memilih <span class="text-emerald-400">SeeLirik</span> ?</h1>
      <div class="container mx-auto flex flex-col md:flex-row items-stretch space-y-6 md:space-y-0 md:space-x-6 justify-center py-10">
        <div class="bg-neutral-800 flex-1 rounded-xl p-10 flex flex-col items-center text-center">
          <img src="/public/images/detection.png" alt="detection" class="p-5 w-40 h-40 object-contain" />
          <h5 class="text-white text-xl font-bold my-4">Deteksi Real-Time</h5>
          <p class="text-white">
            Memantau CCTV secara langsung dan mengenali pola mencurigakan untuk mencegah pencurian sebelum terjadi
          </p>
        </div>

        <div class="bg-neutral-800 flex-1 rounded-xl p-10 flex flex-col items-center text-center">
          <img src="/public/images/overview.png" alt="overview" class="p-5 w-40 h-40 object-contain" />
          <h5 class="text-white text-xl font-bold my-4">Overview Data</h5>
          <p class="text-white">
            Lihat rekam jejak insiden, statistik, dan respon langsung dari dashboard yang memudahkan evaluasi keamanan toko Anda
          </p>
        </div>

        <div class="bg-neutral-800 flex-1 rounded-xl p-10 flex flex-col items-center text-center">
          <img src="/public/images/notif.png" alt="notif" class="p-5 w-40 h-40 object-contain" />
          <h5 class="text-white text-xl font-bold my-4">Alarm & Pemberitahuan</h5>
          <p class="text-white">
            Memberi alarm dan notifikasi saat ancaman terdeteksi, memastikan Anda selalu selangkah lebih cepat
          </p>
        </div>
      </div>
    </section>
  `;
}
