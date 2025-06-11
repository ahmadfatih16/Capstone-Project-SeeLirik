export default function LandingDemo() {
  return `
    <section id="demo" class="container mx-auto py-16 md:py-24 bg-neutral-900 text-center
      min-h-screen flex flex-col justify-center items-center">
      <h1 class="text-white text-5xl font-bold mb-8 pb-10">
        <span class="text-emerald-400">Demo</span>nstrasi
      </h1>
      <video controls class="mx-auto w-full max-w-5xl rounded-lg shadow-lg mt-10">
        <source src="/public/video/contoh.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  `;
}