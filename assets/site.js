/* Local presentation interactions. No network requests or storage. */
(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };
  menuButton.hidden = false;
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  const mobile = window.matchMedia('(max-width: 900px)');
  mobile.addEventListener('change', closeMenu);

  const cutoffButtons = document.querySelectorAll('[data-cutoff]');
  document.querySelector('.lens-controls').hidden = false;
  cutoffButtons.forEach(button => button.addEventListener('click', () => {
    const late = button.dataset.cutoff === 'late';
    cutoffButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelector('.timeline').dataset.position = late ? 'late' : 'early';
    const status = document.querySelector('#revision-status');
    status.textContent = late ? 'Included' : 'Excluded';
    status.classList.toggle('included', late);
    document.querySelector('#revision-description').textContent = late ? 'Available before this cutoff' : 'Unavailable at this cutoff';
    document.querySelector('#lens-message').textContent = late
      ? 'Later cutoff: the revision is now eligible because it was available before this cutoff.'
      : 'Earlier cutoff: the original observation is eligible; the later revision is excluded.';
  }));
})();
