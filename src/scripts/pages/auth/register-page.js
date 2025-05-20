export default class RegisterPage {
  async render() {
    return `
        <section class="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
          <h1 class="text-4xl font-bold">Ini halaman Register</h1>
        </section>
      `;
  }

  async afterRender() {
    const presenter = (await import('./register-presenter.js')).default;
    presenter.init();
  }
}
