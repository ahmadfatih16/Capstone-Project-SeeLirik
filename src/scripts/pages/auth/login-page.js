export default class LoginPage {
  async render() {
    return `
        <section class="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
          <h1 class="text-4xl font-bold">Ini halaman Login</h1>
        </section>
      `;
  }

  async afterRender() {
    const presenter = (await import('./login-presenter.js')).default;
    presenter.init();
  }
}
