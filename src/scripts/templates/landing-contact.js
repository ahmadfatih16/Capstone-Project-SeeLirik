export default function LandingContact() {
  return `
    <section id="contact" class="min-h-screen flex items-center justify-center px-6 bg-neutral-900">
      <div class="container mx-auto flex flex-col md:flex-row items-center md:space-x-3 space-y-6 md:space-y-0">
        <div class="md:w-3/6 text-center md:text-left">
          <h3 class="text-white text-6xl font-bold mb-5 py-4">Hubungi <span class="text-emerald-400">kami</span></h3>
          <p class="text-white mb-5 text-xl">Hubungi kami untuk mendiskusikan bagaimana SeeLirik dapat membantu bisnis Anda lebih aman.</p>

          <div class="flex flex-col items-center text-center md:flex-row md:items-center md:text-left space-y-2 md:space-y-0 md:space-x-1 my-4">
            <img class="w-11 h-11" src="/public/images/email.png" alt="email" />
            <div class="mx-5">
              <p class="text-white font-bold">Email</p>
              <p class="text-white">seelirik@gmail.com</p>
            </div>
          </div>

          <div class="flex flex-col items-center text-center md:flex-row md:items-center md:text-left space-y-2 md:space-y-0 md:space-x-1 my-4">
            <img class="w-11 h-11" src="/public/images/phone.png" alt="phone" />
            <div class="mx-5">
              <p class="text-white font-bold">No. Telpon</p>
              <p class="text-white">0812-3456-7890</p>
            </div>
          </div>
        </div>

        <div class="w-5/6 mx-auto mt-10 md:w-2/6 md:mt-0">
          <form action="#" method="post" class="max-w-xl mx-auto bg-neutral-800 p-8 rounded-lg shadow-lg">
            <div class="mb-4">
              <label for="name" class="block text-white text-sm font-semibold mb-2">Nama:</label>
              <input type="text" id="name" name="name" required class="w-full px-4 py-2 rounded-md bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 duration-500" />
            </div>
            <div class="mb-4">
              <label for="email" class="block text-white text-sm font-semibold mb-2">Email:</label>
              <input type="email" id="email" name="email" required class="w-full px-4 py-2 rounded-md bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 duration-500" />
            </div>
            <div class="mb-6">
              <label for="message" class="block text-white text-sm font-semibold mb-2">Pesan:</label>
              <textarea id="message" name="message" rows="5" required class="w-full px-4 py-2 rounded-md bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 duration-500"></textarea>
            </div>
            <button type="submit" class="w-full bg-emerald-400 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-md transition duration-500 cursor-pointer">Kirim Pesan</button>
          </form>
        </div>
      </div>
    </section>
  `;
}
