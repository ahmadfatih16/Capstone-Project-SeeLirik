export function setActiveSidebarLink() {
  const currentHash = window.location.hash.slice(1);
  const links = document.querySelectorAll('[data-route]');

  links.forEach((link) => {
    const route = link.getAttribute('data-route');
    const icon = link.querySelector('[data-icon]');

    if (`/${route}` === currentHash || route === currentHash) {
      link.classList.add('bg-neutral-900', 'text-emerald-400');
      icon?.setAttribute('src', icon.src.replace('.png', '-green.png'));
    } else {
      link.classList.remove('bg-neutral-900', 'text-emerald-400');
      icon?.setAttribute('src', icon.src.replace('-green.png', '.png'));
    }
  });
}
