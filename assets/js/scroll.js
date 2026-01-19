document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const panels = document.querySelectorAll(".panel");
  const nav = document.querySelector(".top-nav");
  const navHeight = nav ? nav.offsetHeight : 0;

  let index = 0;
  let isMoving = false;
  let wheelDelta = 0;

  const WHEEL_THRESHOLD = 100; // 🔥 감각 핵심 (80~160 조절 가능)
  const MOVE_DURATION = 700;   // 이동 애니메이션 시간

  function moveTo(i) {
    if (i < 0 || i >= panels.length) return;

    isMoving = true;
    index = i;

    const targetY = panels[i].offsetTop;


    container.scrollTo({
      top: targetY,
      behavior: "smooth"
    });
  
    if (window.__HIVEWORKS_UPDATE_NAV__) {
    window.__HIVEWORKS_UPDATE_NAV__(i);
    } 

    setTimeout(() => {
      isMoving = false;
      wheelDelta = 0; // 이동 후 리셋
    }, MOVE_DURATION);
  }

  container.addEventListener(
    "wheel",
    e => {
      e.preventDefault(); // 🔥 네이티브 스크롤 차단
      if (isMoving) return;

      wheelDelta += e.deltaY;

      if (wheelDelta > WHEEL_THRESHOLD) {
        moveTo(index + 1);
      } else if (wheelDelta < -WHEEL_THRESHOLD) {
        moveTo(index - 1);
      }
    },
    { passive: false }
  );

  // 초기 위치 고정
  moveTo(0);

  // nav.js 연동
  window.__HIVEWORKS_MOVE_TO__ = moveTo;
});





// HOME scroll trigger
document.querySelectorAll('.home-scroll').forEach(el => {
  el.addEventListener('click', () => {
    const target = el.dataset.target;
    const section = document.querySelector(target);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

