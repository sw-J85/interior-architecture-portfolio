document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.top-nav a');
  const panels = document.querySelectorAll('.panel');

  // nav 클릭 → 해당 섹션으로 이동
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;

      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 현재 섹션에 맞는 nav 활성화
  function updateActiveNav() {
    let currentIndex = 0;

    panels.forEach((panel, index) => {
      const rect = panel.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2) {
        currentIndex = index;
      }
    });

    navLinks.forEach(link => link.classList.remove('active'));
    if (navLinks[currentIndex]) {
      navLinks[currentIndex].classList.add('active');
    }
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
});
